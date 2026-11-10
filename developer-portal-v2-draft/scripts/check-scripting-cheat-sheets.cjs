const { withScriptLifecycle } = require('./example-runtime-fixture.cjs');
const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const docs = path.resolve(process.argv[2] || path.join(__dirname,'../docs'));
const base = path.join(docs,'composition-scripting/composition-scripting/cheat-sheets');
function walk(dir) {return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
function blocks(rel) {return [...fs.readFileSync(path.join(base,rel),'utf8').matchAll(/```javascript\s*\n([\s\S]*?)```/g)].map(m=>m[1]);}
let parsed=0,links=0,fixtures=0;
const pages=walk(base).filter(f=>f.endsWith('.md'));
for(const file of pages) {
 const text=fs.readFileSync(file,'utf8');
 assert.equal((text.match(/^```/gm)||[]).length%2,0,'Unclosed fence: '+file);
 for(const m of text.matchAll(/```javascript\s*\n([\s\S]*?)```/g)) {new vm.Script(m[1],{filename:file});assert(!/\?\.|\?\?/.test(m[1]));parsed++;}
 const prose=text.replace(/^```[^\n]*\n[\s\S]*?^```/gm,'').replace(/`[^`\n]+`/g,'');
 for(const m of prose.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
  if(/^(?:https?:|mailto:)/.test(m[1]))continue;
  const [url,anchor]=m[1].split('#');
  let dest=url?path.resolve(path.dirname(file),decodeURIComponent(url)):file;
  if(fs.existsSync(dest)&&fs.statSync(dest).isDirectory())dest=path.join(dest,'README.md');
  assert(fs.existsSync(dest),'Missing link '+m[1]+' in '+file);
  if(anchor) {
   const headings=[...fs.readFileSync(dest,'utf8').matchAll(/^#+\s+(.+)$/gm)].map(h=>h[1].toLowerCase().replace(/[^\p{L}\p{N}_\- ]/gu,'').replace(/ /g,'-'));
   assert(headings.includes(anchor),'Missing anchor '+m[1]+' in '+file);
  }
  links++;
 }
}
const summary=fs.readFileSync(path.join(docs,'SUMMARY.md'),'utf8');
const nav=[...summary.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].filter(m=>m[2].includes('/cheat-sheets/'));
assert.equal(nav.length,pages.length,'Every new page must appear once in navigation');
assert.equal(new Set(nav.map(m=>m[2])).size,nav.length,'Duplicate navigation path');
for(const m of nav) {const file=path.join(docs,m[2]);assert(fs.existsSync(file),'Navigation target missing');assert.equal(fs.readFileSync(file,'utf8').split('\n')[0],'# '+m[1]);}
function widget(id,initial={}) {return {id,payload:{...initial},getPayload(){return {...this.payload};},setPayload(p){Object.assign(this.payload,p);}};}
function composition(widgets,payload={}) {return {id:'local',payload,handlers:{},removed:[],findWidget(n){return widgets[n]?[widgets[n]]:[];},getPayload2(){return {...this.payload};},addListener(e,cb){this.handlers[e]=cb;},removeListener(e){this.removed.push(e);delete this.handlers[e];},emit(e,m){if(this.handlers[e])this.handlers[e](e,m,{stopPropagation(){throw new Error('Unexpected stop');}});}};}
function load(file,globals={}) {return withScriptLifecycle(vm.runInNewContext(blocks(file)[0],globals));}
function check(name,fn){fn();fixtures++;console.log('PASS '+name);}
check('bounds listener precedes synchronous activation; filters source; uninstall clears local handlers',()=>{
 const label=widget('label');const c=composition({Label:label});const output=[];
 function message(patch={}) {return {event:'custom',params:{type:'widget',id:'label',compId:'local',data:{event:'bounds',widthPx:42},...patch}};}
 const original=label.setPayload;label.setPayload=function(p){original.call(this,p);c.emit('message',message());};
 const s=load('widget-messages.md',{console:{log(...args){output.push(args);}}});s.init(c);assert(output.length>=1);
 const count=output.length;c.emit('message',message({id:'wrong'}));c.emit('message',message({compId:'other'}));c.emit('message',message({type:'controlNode'}));assert.equal(output.length,count);
 s.close();c.emit('message',message());assert.equal(output.length,count);assert(!c.handlers['message']);
});
check('reactive example preserves zero/false/empty and repairs effective content; cleanup',()=>{
 const output=widget('output');const c=composition({'Title Output':output},{Title:'Initial'});const s=load('react-to-changes.md');s.init(c);assert.equal(output.payload.text,'Initial');
 for(const [input,expected] of [[0,'0'],[false,'false'],['','']]) {c.payload.Title=input;c.emit('payload_changed',{compositionId:'different'});assert.equal(output.payload.text,expected);}
 c.payload.Title='Current';output.payload.text='External replacement';c.emit('payload_changed',{});assert.equal(output.payload.text,'Current');
 s.close();c.payload.Title='Late';c.emit('payload_changed',{});assert.equal(output.payload.text,'Current');assert(!c.handlers['payload_changed']);
});
check('HTML snippet escapes dynamic characters without erasing font data',()=>{
 const title=widget('title',{font:{required:'preserve'}});const c=composition({Title:title});vm.runInNewContext(blocks('html-text.md')[0],{compCurrent:c});assert.equal(title.payload.text,'<html>Hello <b>Ada &amp; team</b></html>');assert.equal(title.payload.font.required,'preserve');
});
check('button example filters source and handles repeated presses and closure',()=>{
 const output=widget('readout');const c=composition({Readout:output});
 // First block is the Selection fragment; the complete script is second.
 const script=withScriptLifecycle(vm.runInNewContext(blocks('controls/selection-and-buttons.md')[1]));script.init(c);
 c.emit('button_clicked',{buttonId:'Toggle',compId:'other'});assert.equal(output.payload.text,'Disabled');
 c.emit('button_clicked',{buttonId:'Toggle',compId:'local'});assert.equal(output.payload.text,'Enabled');
 c.emit('button_clicked',{buttonId:'Toggle',compId:'local'});assert.equal(output.payload.text,'Disabled');script.close();assert(!c.handlers['button_clicked']);
});
console.log(JSON.stringify({pages:pages.length,navigationEntries:nav.length,javascriptBlocks:parsed,relativeLinks:links,behaviorFixtures:fixtures,scope:'Static checks and mocked composition logic; not live Player acceptance'},null,2));
