'use strict';
// Syntax/link checks and isolated UI behavior checks. No SDK network calls.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const cp = require('node:child_process');
const docs = process.argv[2] || path.resolve(__dirname, '../docs');
const assets = path.join(docs, '.gitbook/assets');
function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e =>
    e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
}
function scripts(html) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(m => !/\bsrc\s*=/.test(m[1])).map(m => m[2]);
}
const allMarkdown = walk(docs).filter(p => p.endsWith('.md'));
const summary = fs.readFileSync(path.join(docs,'SUMMARY.md'),'utf8');
const nav = [...summary.matchAll(/\]\(([^)]+\.md)\)/g)].map(m=>m[1]);
assert.equal(new Set(nav).size,nav.length,'Duplicate navigation paths');
const published = 'api-and-sdk-reference/api-and-sdk-reference/app-sdk/';
const sdkNav = nav.filter(href => href.startsWith(published));
for (const file of allMarkdown.filter(file => file.startsWith(path.join(docs, published)))) {
  const relative = path.relative(docs,file).split(path.sep).join('/');
  assert(sdkNav.includes(relative), `App SDK page absent from SUMMARY: ${relative}`);
}
for (const href of sdkNav) assert(fs.existsSync(path.join(docs, href)), `Missing navigation target: ${href}`);
cp.execFileSync(process.execPath, [path.join(__dirname, 'sync-app-sdk.cjs'), '--check'], {stdio:'inherit'});
let links=0, snippets=0;
const changedDocs = allMarkdown.filter(f => /(?:^|\/)app-sdk(?:\/|\.md$)/.test(path.relative(docs,f).replaceAll('\\','/')));
for (const file of changedDocs) {
  const text=fs.readFileSync(file,'utf8');
  const targets=[...text.matchAll(/\]\(([^)]+)\)/g)].map(m=>m[1])
    .concat([...text.matchAll(/\{% file src="([^"]+)" %\}/g)].map(m=>m[1]));
  for (const href of targets) {
    if (/^(https?:|#)/.test(href)) continue;
    const target = decodeURIComponent(href.split('#')[0]);
    const resolved = path.resolve(path.dirname(file),target);
    assert(fs.existsSync(resolved),`${file}: missing ${href}`);
    if (href.includes('#') && resolved.endsWith('.md')) {
      const slug = decodeURIComponent(href.split('#')[1]);
      const body = fs.readFileSync(resolved, 'utf8').replace(/```[\s\S]*?```/g,'');
      const headings = [...body.matchAll(/^#{1,6}\s+(.+)$/gm)].map(m=>m[1].trim().toLowerCase().replace(/[`*]/g,'').replace(/[^\p{L}\p{N}\s_-]/gu,'').replace(/\s/g,'-'));
      assert(headings.includes(slug) || body.includes(`id="${slug}"`), `${file}: missing anchor ${href}`);
    }
    links++;
  }
  assert.equal((text.match(/\{% file /g)||[]).length,(text.match(/\{% endfile %\}/g)||[]).length);
  const blocks=[];
  for (const match of text.replace(/```[\s\S]*?```/g,'').matchAll(/\{%\s*(\w+)\b[^%]*%\}/g)) {
    const tag=match[1];
    if (tag.startsWith('end')) assert.equal(blocks.pop(),tag.slice(3),`Unbalanced GitBook block in ${file}`);
    else if (['stepper','step','tabs','tab','hint','file','code'].includes(tag)) blocks.push(tag);
  }
  assert.equal(blocks.length,0,`Unclosed GitBook blocks in ${file}`);
  for (const block of text.matchAll(/```(javascript|json)\r?\n([\s\S]*?)```/g)) {
    if (block[1]==='json') JSON.parse(block[2]); else new vm.Script('(function () {\n'+block[2]+'\n})',{filename:file});
    snippets++;
  }
  for (const block of text.matchAll(/```html\r?\n([\s\S]*?)```/g)) {
    for (const script of scripts(block[1])) new vm.Script(script,{filename:file});
  }
}
for(const [page,asset] of [['lower-third-app.md','app-sdk-lower-third.html'],['subcomposition-fill-in-form.md','app-sdk-native-form.html']]) {
  const text=fs.readFileSync(path.join(docs,'api-and-sdk-reference/app-sdk/examples',page),'utf8');
  const complete=[...text.matchAll(/```html\r?\n([\s\S]*?)```/g)].at(-1)[1].trim();
  assert.equal(complete,fs.readFileSync(path.join(assets,asset),'utf8').trim(),`Inline/download source mismatch: ${page}`);
}
let htmlScripts=0;
for (const file of fs.readdirSync(assets).filter(f=>f.endsWith('.html'))) {
  for (const source of scripts(fs.readFileSync(path.join(assets,file),'utf8'))) {
    new vm.Script(source,{filename:file}); htmlScripts++;
  }
}
class Element {
  constructor() {this.disabled=false;this.value='';this.children=[];this.textContent='';}
  appendChild(el) {this.children.push(el);if(this.children.length===1)this.value=el.value;}
  replaceChildren() {this.children=[];this.value='';}
}
function runtime(file) {
  const elements=new Map();
  const document={getElementById(id){if(!elements.has(id))elements.set(id,new Element());return elements.get(id);},createElement(){return new Element();}};
  const events={};
  const context=vm.createContext({document,console,window:{addEventListener(event,cb){events[event]=cb;}}});
  for(const source of scripts(fs.readFileSync(path.join(assets,file),'utf8')))vm.runInContext(source,context);
  return {context,el:id=>document.getElementById(id),events};
}
const writes=[];
function child(id) {
  return {id,name:id,getModel(){return [{id:'Name',type:'text'}];},getPayload2(){return {Name:'Current'};},
    getControlNode(){return {model:{fields:{Name:{id:'Name',type:'text'}}},payload:{Name:'Current'}};},
    setPayload(payload){writes.push({id,payload:JSON.parse(JSON.stringify(payload))});},
    playTo(state){writes.push({id,state});}};
}
const a=child('A'), b=child('B'), empty={id:'empty',name:'empty',getControlNode(){return undefined;}};
const main={...child('root'),getSubcompositionByName(){return a;},listSubcompositions(){return [a,b,empty].map(({id,name})=>({id,name}));},getSubcompositionById(id){return {A:a,B:b,empty}[id];},getRefId(){return 'REF';}};
const forms=[];
const app={getOutputByName(name){assert.equal(name,'Default');return {getComposition(){return main;}};},
  createSingularForm(win,dom,node,callback,options){const f={callback,destroyed:false,destroy(){this.destroyed=true;}};assert.equal(options.refId,'REF');forms.push(f);return f;}};
const lower=runtime('app-sdk-lower-third.html');
lower.context.singularAppInit(app);
assert.equal(writes.length,0,'Initialization must not write');
assert.equal(lower.el('name').value,'Current');
lower.el('name').value='New name';
assert.equal(writes.length,0,'Editing must not write');
lower.el('apply').onclick();
assert.deepEqual(writes.pop(),{id:'A',payload:{Name:'New name'}});
lower.el('in').onclick();assert.deepEqual(writes.pop(),{id:'A',state:'In'});
lower.el('out').onclick();assert.deepEqual(writes.pop(),{id:'A',state:'Out'});
lower.context.singularAppInit({getOutputByName(){return undefined;}});
assert(lower.el('apply').disabled);assert.equal(lower.el('apply').onclick,null);
lower.context.singularAppInit({getOutputByName(){return {getComposition(){return {getSubcompositionByName(){return {...a,getModel(){return [];}};}};}};}});
assert(lower.el('apply').disabled);
console.log('PASS lower third: no init/edit writes, payload and animation commands, missing target/field');
const native=runtime('app-sdk-native-form.html');
native.context.singularAppInit(app);
function choose(id){native.el('target').value=id;native.el('target').onchange();return forms.at(-1);}
const formA=choose('A');
formA.callback({event:'load'});assert(native.el('apply').disabled);
formA.callback({event:'change',payload:{Name:'Draft A'}});assert(!native.el('apply').disabled);
const formB=choose('B');assert(formA.destroyed);assert(native.el('apply').disabled);
formA.callback({event:'change',payload:{Name:'Late A'}});assert(native.el('apply').disabled);
native.el('apply').onclick();assert.equal(writes.length,0,'Old draft must not reach B');
formB.callback({event:'button_clicked',buttonId:'button'});assert(native.el('apply').disabled);
formB.callback({event:'change',payload:{Name:'Draft B'}});native.el('apply').onclick();
assert.deepEqual(writes.pop(),{id:'B',payload:{Name:'Draft B'}});assert(native.el('apply').disabled);
choose('empty');assert(formB.destroyed);assert(native.el('apply').disabled);
native.context.singularAppInit(app);const last=forms.at(-1);
native.events.beforeunload();assert(last.destroyed);
last.callback({event:'change',payload:{Name:'After disposal'}});assert(native.el('apply').disabled);
console.log('PASS native form: draft isolation, stale callback rejection, missing node, reinit and disposal');
function loadReferenceFunction(file, name) {
  const text=fs.readFileSync(path.join(docs,'api-and-sdk-reference/app-sdk/reference',file),'utf8');
  const block=[...text.matchAll(/```javascript\r?\n([\s\S]*?)```/g)].find(m=>m[1].includes(`function ${name}`));
  const context=vm.createContext({});
  vm.runInContext(block[1],context);
  return context[name];
}
const watch=loadReferenceFunction('storage.md','watchDraft');
let listener,removed=false,rendered;
const stopWatch=watch({storage:{on(key,cb){assert.equal(key,'lowerThirdDraft');listener=cb;},off(key,cb){assert.equal(key,'lowerThirdDraft');assert.equal(cb,listener);removed=true;}}},value=>{rendered=JSON.parse(JSON.stringify(value));});
listener(null);assert.deepEqual(rendered,{Name:''});
listener({Name:'Saved'});assert.deepEqual(rendered,{Name:'Saved'});stopWatch();assert(removed);
const observe=loadReferenceFunction('composition.md','observeChild');
let eventCallback,offEvent;
const stopObserve=observe({on(event,cb){assert.equal(event,'payload_changed');eventCallback=cb;},off(event){offEvent=event;}},a,value=>{rendered=JSON.parse(JSON.stringify(value));});
assert.deepEqual(rendered,{Name:'Current'});
eventCallback({compId:'B',payload:{Name:'Wrong'}});assert.deepEqual(rendered,{Name:'Current'});
eventCallback({compId:'A',payload:{Name:'Live'}});assert.deepEqual(rendered,{Name:'Live'});
stopObserve();assert.equal(offEvent,'payload_changed');
console.log('PASS reference logic: storage null/default and callback identity, initial child payload, ID filtering and event cleanup');
const sharedText=fs.readFileSync(path.join(docs,'api-and-sdk-reference/app-sdk/shared-data-and-events.md'),'utf8');
const sharedCode=[...sharedText.matchAll(/```javascript\r?\n([\s\S]*?)```/g)].find(m=>m[1].includes('function connectSharedDraft'))[1];
const draftElements=new Map();
const draftDocument={getElementById(id){if(!draftElements.has(id))draftElements.set(id,new Element());return draftElements.get(id);}};
const draftContext=vm.createContext({document:draftDocument});
vm.runInContext(sharedCode,draftContext);
let sharedListener,stored,saveDone,detached=false;
const draftApp={storage:{on(key,callback){sharedListener=callback;},off(key,callback){assert.equal(callback,sharedListener);detached=true;},set(key,value,callback){stored=JSON.parse(JSON.stringify(value));saveDone=callback;}}};
const stopDraft=draftContext.connectSharedDraft(draftApp,a);
const input=draftDocument.getElementById('name');
const save=draftDocument.getElementById('save-draft');
const draftApply=draftDocument.getElementById('apply');
sharedListener({Name:'Saved elsewhere'});assert.equal(input.value,'Saved elsewhere');assert.equal(writes.length,0);
input.value='Local unsaved';input.oninput();sharedListener({Name:'Incoming conflict'});assert.equal(input.value,'Local unsaved');
save.onclick();assert.deepEqual(stored,{Name:'Local unsaved'});assert.equal(writes.length,0);
input.value='New edit during save';input.oninput();saveDone();sharedListener({Name:'Another edit'});assert.equal(input.value,'New edit during save');
save.onclick();saveDone();sharedListener({Name:'Updated shared draft'});assert.equal(input.value,'Updated shared draft');
draftApply.onclick();assert.deepEqual(writes.pop(),{id:'A',payload:{Name:'Updated shared draft'}});
stopDraft();assert(detached);assert(save.disabled);assert.equal(input.oninput,null);assert.equal(draftApply.onclick,null);
sharedListener({Name:'Late notification'});assert.equal(input.value,'Updated shared draft');
console.log('PASS shared-draft recipe: separate save/apply, unsaved-edit preservation, edits during save, cleanup and late notifications');
console.log(JSON.stringify({navigationPages:nav.length,localLinks:links,codeBlocks:snippets,htmlScripts,scope:'Static and mock checks; no live service acceptance'},null,2));
