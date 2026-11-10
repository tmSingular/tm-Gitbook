const fs=require('fs');const path=require('path');const vm=require('vm');const assert=require('assert/strict');const crypto=require('crypto');
const docs=path.resolve(process.argv[2]||path.join(__dirname,'../docs'));
const assets=path.join(docs,'.gitbook/assets/graphics-sdk');
let pages=0,links=0,jsBlocks=0,jsonBlocks=0,fixtures=0;
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
function inlineScripts(html){return[...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);}
function check(name,fn){fn();fixtures++;console.log('PASS '+name);}
for(const root of ['api-and-sdk-reference/api-and-sdk-reference/graphics-sdk','api-and-sdk-reference/graphics-sdk'])for(const file of walk(path.join(docs,root)).filter(f=>f.endsWith('.md'))){
 const text=fs.readFileSync(file,'utf8');pages++;assert.equal((text.match(/^```/gm)||[]).length%2,0,'Unclosed fence '+file);assert(!text.includes('{{example:'));
 for(const match of text.matchAll(/```(javascript|json|html)\s*\n([\s\S]*?)```/g)){
  if(match[1]==='json'){JSON.parse(match[2]);jsonBlocks++;}
  else for(const code of match[1]==='html'?inlineScripts(match[2]):[match[2]]){new vm.Script(code,{filename:file});assert(!/\bvar\s|console\.(?:warn|error)\s*\(|\bthrow\s|\?\.|\?\?/.test(code),'Authored example convention '+file);jsBlocks++;}
 }
 const prose=text.replace(/^```[^\n]*\n[\s\S]*?^```/gm,'').replace(/`[^`\n]+`/g,'');assert(!/\{%.*(?:embed|iframe-embed)/.test(prose),'External embed '+file);
 for(const match of prose.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)){
  assert(!/^https?:/.test(match[1]),'External documentation link '+file);const[rel,anchor]=match[1].split('#');let target=path.resolve(path.dirname(file),rel||path.basename(file));if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'README.md');assert(fs.existsSync(target),'Missing '+match[1]+' in '+file);
  if(anchor){const headings=[...fs.readFileSync(target,'utf8').matchAll(/^#+\s+(.+)$/gm)].map(m=>m[1].toLowerCase().replace(/[^\p{L}\p{N}_\- ]/gu,'').replace(/ /g,'-'));assert(headings.includes(anchor),'Missing anchor '+match[1]);}links++;
 }
}
for(const file of walk(assets)){
 const source=fs.readFileSync(file,'utf8');for(const code of file.endsWith('.html')?inlineScripts(source):[source])new vm.Script(code,{filename:file});
 if(file.endsWith('.html'))for(const m of source.matchAll(/<script[^>]*\bsrc="([^"]+)"/g))if(!/^https?:/.test(m[1]))assert(fs.existsSync(path.join(path.dirname(file),m[1])),'Missing local runtime file '+m[1]);
}
const nav=[...fs.readFileSync(path.join(docs,'SUMMARY.md'),'utf8').matchAll(/\[([^\]]+)\]\((api-and-sdk-reference\/api-and-sdk-reference\/graphics-sdk\/[^)]+)\)/g)];assert.equal(nav.length,18);assert.equal(new Set(nav.map(m=>m[2])).size,18);for(const m of nav)assert.equal(fs.readFileSync(path.join(docs,m[2]),'utf8').split('\n')[0],'# '+m[1]);
const fields=require(path.join(assets,'preview-fields.js'));
check('field conversion preserves zero, false, typed/empty IDs, alpha and date units',()=>{
 assert.equal(fields.read({type:'number'},'0').value,0);assert.equal(fields.read({type:'checkbox'},false).value,false);
 for(const input of ['', ' ', 'NaN','Infinity','0x10','4px'])assert.equal(fields.read({type:'number'},input).valid,false);
 assert.equal(fields.read({type:'counter'},'1.5').valid,false);assert.equal(fields.read({type:'number',min:5,max:10},'4').valid,false);
 const normalized={type:'normalizednumber',low:100,high:400};assert.deepEqual(fields.limits(normalized),{min:0,max:100});assert.equal(fields.read(normalized,'25').value,25);assert.equal(fields.read(normalized,'101').valid,false);
 const selection={type:'selection',selections:[{id:420,title:'Number'},{id:'',title:'None'},{id:'0420',title:'String'}]};assert.strictEqual(fields.read(selection,'0').value,420);assert.strictEqual(fields.read(selection,'1').value,'');assert.strictEqual(fields.read(selection,'2').value,'0420');
 assert.equal(fields.display({type:'color'},{r:18,g:52,b:86,a:0.5}),'rgba(18, 52, 86, 0.5)');assert.equal(fields.read({type:'color'},'rgba(18,52,86,0.5)',()=>true).value,'rgba(18,52,86,0.5)');
 assert.equal(fields.read({type:'datetime'},'1893456000000').value,1893456000000);assert.equal(fields.read({type:'datetime'},'').valid,false);
 for(const type of ['json','table','timer','timecontrol','metricfont','button','location'])assert.equal(fields.editable({type},{}),false);
 assert.equal(fields.editable({type:'text',hidden:true},'x'),false);assert.equal(fields.editable({type:'selection',sourceUrl:'sample'},''),false);
});

const sdkFile=path.resolve(__dirname,'fixtures/singulargraphics-1.0.0.js');const sdkSource=fs.readFileSync(sdkFile,'utf8');
const sdkHash=crypto.createHash('sha256').update(sdkSource).digest('hex');assert(fs.readFileSync(path.join(docs,'api-and-sdk-reference/api-and-sdk-reference/graphics-sdk/compatibility.md'),'utf8').includes(sdkHash));
function sdkHarness(){
 const outgoing=[];let receive;
 const frame={id:'SingularOverlay',getAttribute(){return'https://app.singular.live/singularplayer/client';},contentWindow:{postMessage(text){outgoing.push(JSON.parse(text));}}};
 const sandbox={console:{log(){},warn(){}},document:{getElementById(id){return id===frame.id?frame:null;}},location:{href:'https://host.test/demo'}};
 sandbox.window=sandbox;sandbox.addEventListener=(name,callback)=>{if(name==='message')receive=callback;};
 vm.createContext(sandbox);vm.runInContext(sdkSource,sandbox);const graphics=sandbox.SingularGraphics('SingularOverlay');
 function message(event,params){receive({origin:'https://app.singular.live',source:frame.contentWindow,data:{event,params}});}
 const info={compositionId:'root',idToName:{root:'Root',lower:'Lower Third',badge:'Badge'},compositionStates:{root:'Out1',lower:'Out1',badge:'Out1'},subcompositionNames:{root:{lower:'Lower Third'},lower:{badge:'Badge'},badge:{}},adaptationGlobals:{layout:'landscape'},compositionProps:{logicLayers:{}},dataSources:{}};
 for(const id of ['root','lower','badge'])info.dataSources[id]={composition:{controlNode:{model:{fields:{title:{id:'Title',title:'Title',type:'text'}}},payload:{Title:'Initial'}},dataNodes:{}}};
 return{graphics,sandbox,outgoing,message,info};
}
check('inspected SDK signatures, callback objects, lookup/model shapes and local payload commands',()=>{
 const h=sdkHarness();assert.equal(h.graphics.loadComposition.length,2);assert.equal(h.graphics.renderComposition.length,2);assert.equal(h.graphics.renderAppOutput.length,3);assert.equal(h.graphics.id,'SingularOverlay');
 let result;h.graphics.loadComposition('sample-reference',value=>{result=value;});assert.equal(h.outgoing.length,0);h.message('_singular_ready',{});assert.equal(h.outgoing.at(-1).event,'_singular_loadComposition');h.message('_singular_composition_ready',h.info);assert.equal(result.success,true);
 const comp=h.graphics.getMainComposition();assert.equal(comp.id,'root');assert.equal(comp.find('Lower Third')[0].id,'lower');assert.equal(comp.find('Lower Third','Badge')[0].id,'badge');assert.equal(comp.getCompositionById('badge').id,'badge');assert.equal(comp.getModel()[0].id,'Title');assert.equal(comp.getPayload()[0].key,'Title');
 comp.setPayload({Title:'Updated'});assert.equal(h.outgoing.at(-1).params.payload.Title,'Updated');assert.equal(comp.getPayload2().Title,'Updated');assert.equal(typeof comp.findWidget,'undefined');
 h.graphics.loadComposition('another',value=>{result=value;});h.message('_singular_composition_load_fail',{});assert.equal(result.success,false);
});
check('inspected host listeners are additive, use two callback args, and remove an exact callback',()=>{
 const h=sdkHarness();h.message('_singular_ready',{});h.graphics.loadComposition('sample',()=>{});h.message('_singular_composition_ready',h.info);const counts=[0,0];
 function first(event,data){assert.equal(arguments.length,2);assert.equal(event,'state_changed');assert.equal(data.compositionId,'lower');counts[0]++;}
 function second(){counts[1]++;}
 h.graphics.addListener('state_changed',first);h.graphics.addListener('state_changed',second);h.message('_singular_composition_state_changed',{compositionId:'lower',state:'In'});assert.deepEqual(counts,[1,1]);h.graphics.removeListener('state_changed',first);h.message('_singular_composition_state_changed',{compositionId:'lower',state:'Out1'});assert.deepEqual(counts,[1,2]);
 assert.throws(()=>h.graphics.addListener('timeline_event',()=>{}),/not supported/);
 let errorArgs;h.graphics.addListener('error',function(...args){errorArgs=args;});h.message('_singular_error',{desc:'sample'});assert.equal(errorArgs[0],'error');assert.equal(errorArgs[1].desc,'sample');
});
check('inspected sequencer forwards seek seconds but does not forward play(time)',()=>{
 const h=sdkHarness();h.message('_singular_ready',{});h.graphics.loadComposition('sample',()=>{});h.message('_singular_composition_ready',h.info);const seq=h.graphics.getSequencer();seq.seek(12.5);assert.equal(h.outgoing.at(-1).params.params.time,12.5);seq.play(12.5);assert.deepEqual(h.outgoing.at(-1).params.params,{});
});

class Element {
 constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.listeners={};this.value='';this.type='';this.textContent='';this.disabled=false;this.checked=false;}
 addEventListener(name,callback){if(!this.listeners[name])this.listeners[name]=[];this.listeners[name].push(callback);}
 removeEventListener(name,callback){this.listeners[name]=(this.listeners[name]||[]).filter(cb=>cb!==callback);}
 emit(name){for(const callback of (this.listeners[name]||[]).slice())callback({target:this});}
 appendChild(child){this.children.push(child);return child;}
 replaceChildren(...children){this.children=children;}
 setAttribute(name,value){this[name]=value;}
}
function browserHarness(ids,graphics){const elements={};for(const id of ids)elements[id]=new Element(id==='composition'?'select':'div');const root=new Element('window');const sandbox={console,Map,AbortController,CSS:{supports(){return true;}},document:{getElementById(id){assert(elements[id],'Missing element '+id);return elements[id];},createElement(tag){return new Element(tag);}},SingularGraphics(){return graphics;},addEventListener:root.addEventListener.bind(root),removeEventListener:root.removeEventListener.bind(root)};sandbox.window=sandbox;vm.createContext(sandbox);return{elements,sandbox,root};}
function compNode(id,name,fields,payload,children=[]){return{id,name,writes:[],getModel(){return fields;},getPayload2(){return{...payload};},listSubcompositions(){return children.map(c=>({id:c.id,name:c.name}));},getCompositionById(childId){return children.find(c=>c.id===childId);},setPayload(patch){this.writes.push(JSON.parse(JSON.stringify(patch)));Object.assign(payload,patch);},playTo(state){this.state=state;}};}
check('dynamic preview recursively selects nodes, preserves dirty drafts and sends only valid changed fields',()=>{
 const model=[{id:'Title',title:'Title',type:'text'},{id:'Scale',title:'Scale',type:'normalizednumber',low:0,high:200},{id:'Enabled',title:'Enabled',type:'checkbox'},{id:'Rows',type:'table'}];const payload={Title:'Initial',Scale:25,Enabled:true,Rows:'[]'};
 const deep=compNode('deep','Deep',[],{});const child=compNode('child','Child',[],{},[deep]);const comp=compNode('root','Root',model,payload,[child]);let loadingCallback;const registrations={};let loads=0;
 const graphics={loadComposition(url,callback){loads++;loadingCallback=callback;},getMainComposition(){return comp;},addListener(event,callback){registrations[event]=callback;},removeListener(event,callback){assert.equal(registrations[event],callback);delete registrations[event];}};
 const h=browserHarness(['composition','fields','status','loadUrl','loadApp','send','refresh','in','out','compositionUrl','apiOrigin','appToken'],graphics);vm.runInContext(fs.readFileSync(path.join(assets,'preview-fields.js'),'utf8'),h.sandbox);vm.runInContext(fs.readFileSync(path.join(assets,'dynamic-preview.js'),'utf8'),h.sandbox);
 h.elements.compositionUrl.value='sample-url';h.elements.loadUrl.emit('click');h.elements.loadUrl.emit('click');assert.equal(loads,1);loadingCallback({success:true});assert.equal(h.elements.composition.children.length,3);
 function input(label){const el=h.elements.fields.children.find(n=>n.textContent.startsWith(label+' ('));return el.children[0];}
 input('Title').value='Draft';input('Title').emit('input');payload.Title='Incoming';payload.Enabled=false;registrations.payload_changed('payload_changed',{compId:'root'});assert.equal(input('Title').value,'Draft');assert.equal(input('Enabled').checked,false);
 h.elements.composition.value='child';h.elements.composition.emit('change');h.elements.composition.value='root';h.elements.composition.emit('change');assert.equal(input('Title').value,'Draft');h.elements.send.emit('click');assert.deepEqual(comp.writes.at(-1),{Title:'Draft'});
 input('Title').value='Another';input('Title').emit('input');input('Scale').value='101';input('Scale').emit('input');const count=comp.writes.length;h.elements.send.emit('click');assert.equal(comp.writes.length,count);input('Scale').value='50';input('Scale').emit('input');h.elements.send.emit('click');assert.deepEqual(comp.writes.at(-1),{Title:'Another',Scale:50});
 assert.equal(input('Rows').tagName,'PRE');h.root.emit('pagehide');assert.equal(registrations.payload_changed,undefined);
});
check('quick-start host checks result.success and exposes local Title/In/Out controls after loading',()=>{
 const comp=compNode('lower','Lower Third',[],{});let loaded;const graphics={loadComposition(url,cb){loaded=cb;},getMainComposition(){return{find(name){assert.equal(name,'Lower Third');return[comp];}};}};
 const h=browserHarness(['load','send','in','out','status','compositionUrl','title'],graphics);h.elements.title.value='Host text';vm.runInContext(inlineScripts(fs.readFileSync(path.join(assets,'quick-start.html'),'utf8'))[0],h.sandbox);h.elements.load.emit('click');loaded({success:false});assert.equal(h.elements.send.disabled,true);h.elements.load.emit('click');loaded({success:true});h.elements.send.emit('click');assert.deepEqual(comp.writes[0],{Title:'Host text'});h.elements.in.emit('click');assert.equal(comp.state,'In');h.elements.out.emit('click');assert.equal(comp.state,'Out');
});
check('VOD sample maps video events to explicit seek/play/stop and releases its listeners',()=>{
 const commands=[];const sequencer={setDuration(t){commands.push(['duration',t]);},setPayload(p){commands.push(['payload',p]);},seek(t){commands.push(['seek',t]);},play(...args){commands.push(['play',...args]);},stop(){commands.push(['stop']);}};let loaded;
 const graphics={loadComposition(url,cb){loaded=cb;},getMainComposition(){return{find(){return[{id:'lower'}];}};},getSequencer(){return sequencer;}};
 const h=browserHarness(['video','load','status','videoUrl','compositionUrl'],graphics);const video=h.elements.video;video.currentTime=3;video.duration=120;video.paused=true;video.playbackRate=1;video.pause=function(){this.paused=true;};
 vm.runInContext(inlineScripts(fs.readFileSync(path.join(assets,'sequencer-vod.html'),'utf8'))[0],h.sandbox);h.elements.load.emit('click');loaded({success:true});assert.equal(commands.find(c=>c[0]==='payload')[1].lower[0].beginTime,2);
 video.paused=false;video.emit('playing');assert.deepEqual(commands.slice(-2),[['seek',3],['play']]);video.currentTime=8;video.emit('waiting');assert.deepEqual(commands.slice(-2),[['stop'],['seek',8]]);video.emit('seeked');assert.deepEqual(commands.slice(-2),[['seek',8],['play']]);video.playbackRate=2;video.emit('ratechange');assert.deepEqual(commands.slice(-2),[['seek',8],['stop']]);h.root.emit('pagehide');assert.equal(video.listeners.playing.length,0);assert.deepEqual(commands.at(-1),['stop']);
});
console.log(JSON.stringify({pagesChecked:pages,navigationEntries:nav.length,relativeLinks:links,javascriptBlocks:jsBlocks,jsonBlocks,behaviorFixtures:fixtures,sdkSourceSha256:sdkHash,scope:'Static source, inspected SDK in a synthetic iframe fixture, and mocked DOM/media; no live Player/app acceptance'},null,2));
