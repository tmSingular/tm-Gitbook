'use strict';
// Syntax/link checks and isolated UI behavior checks. No SDK network calls.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
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
for (const file of allMarkdown) {
  const relative = path.relative(docs,file).split(path.sep).join('/');
  if (relative !== 'SUMMARY.md') assert(nav.includes(relative), `Page absent from SUMMARY: ${relative}`);
}
let links=0, snippets=0;
const changedDocs = allMarkdown.filter(f => /app-sdk|graphics-sdk/.test(f));
for (const file of changedDocs) {
  const text=fs.readFileSync(file,'utf8');
  const targets=[...text.matchAll(/\]\(([^)]+)\)/g)].map(m=>m[1])
    .concat([...text.matchAll(/\{% file src="([^"]+)" %\}/g)].map(m=>m[1]));
  for (const href of targets) {
    if (/^(https?:|#)/.test(href)) continue;
    const target = decodeURIComponent(href.split('#')[0]);
    assert(fs.existsSync(path.resolve(path.dirname(file),target)),`${file}: missing ${href}`);
    links++;
  }
  assert.equal((text.match(/\{% file /g)||[]).length,(text.match(/\{% endfile %\}/g)||[]).length);
  for (const block of text.matchAll(/```(javascript|json)\r?\n([\s\S]*?)```/g)) {
    if (block[1]==='json') JSON.parse(block[2]); else new vm.Script(block[2],{filename:file});
    snippets++;
  }
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
console.log(JSON.stringify({navigationPages:nav.length,localLinks:links,codeBlocks:snippets,htmlScripts,scope:'Static and mock checks; no live service acceptance'},null,2));
