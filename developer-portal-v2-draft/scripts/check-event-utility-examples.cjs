const { withScriptLifecycle } = require('./example-runtime-fixture.cjs');
const fs=require('fs');const path=require('path');const vm=require('vm');const assert=require('assert/strict');
const docs=path.resolve(process.argv[2]||path.join(__dirname,'../docs'));
const base=path.join(docs,'composition-scripting/composition-scripting/api-reference');
const pages=['event-listeners.md','context-and-utilities.md'];const snippets=new Map();let syntax=0,links=0,fixtures=0;
for(const file of pages){
 const text=fs.readFileSync(path.join(base,file),'utf8');
 assert.equal((text.match(/^```/gm)||[]).length%2,0,'Unclosed code fence');
 for(const m of text.matchAll(/```javascript\s*\n([\s\S]*?)```/g)){
  new vm.Script(m[1],{filename:file});assert(!/\?\.|\?\?/.test(m[1]));syntax++;
  const name=m[1].match(/^\/\/ Example: ([\w-]+)/);if(name)snippets.set(name[1],m[1]);
 }
 const prose=text.replace(/^```[^\n]*\n[\s\S]*?^```/gm,'').replace(/`[^`\n]+`/g,'');
 for(const m of prose.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)){
  if(/^https?:/.test(m[1]))continue;const [rel,anchor]=m[1].split('#');const dest=path.resolve(base,rel||file);assert(fs.existsSync(dest),'Missing link '+m[1]);
  if(anchor){const headings=[...fs.readFileSync(dest,'utf8').matchAll(/^#+\s+(.+)$/gm)].map(h=>h[1].toLowerCase().replace(/[^\p{L}\p{N}_\- ]/gu,'').replace(/ /g,'-'));assert(headings.includes(anchor),'Missing anchor '+m[1]);}links++;
 }
}
function widget(id,initial={}){return{id,payload:{...initial},writes:[],getPayload(){return{...this.payload};},setPayload(p){this.writes.push(p);Object.assign(this.payload,p);}};}
function composition(widgets={},payload={},id='local',groups={},children={}){return{id,name:id,payload,handlers:{},removed:[],findWidget(n){return widgets[n]?[widgets[n]]:[];},findGroup(n){return groups[n]?[groups[n]]:[];},find(n){return children[n]?[children[n]]:[];},getPayload2(){return{...this.payload};},getState(){return'Out';},addListener(e,cb){this.handlers[e]=cb;},removeListener(e){this.removed.push(e);delete this.handlers[e];},emit(e,msg,propagation={stopPropagation(){throw new Error('Unexpected stop');}}){if(this.handlers[e])this.handlers[e](e,msg,propagation);}};}
function run(name,globals={},replacement){const source=snippets.get(name);assert(source,'Missing example '+name);return withScriptLifecycle(vm.runInNewContext(replacement?replacement(source):source,globals));}
function check(name,fn){fn();fixtures++;console.log('PASS '+name);}
check('input initialization, second update, clearing, false/zero and cleanup',()=>{
 const wi=widget('name'),comp=composition({'Full Name':wi},{Firstname:'Ada',Lastname:'Lovelace'});const script=run('local-inputs');script.init(comp);assert.equal(wi.payload.text,'Ada Lovelace');
 comp.payload={Firstname:0,Lastname:false};comp.emit('payload_changed',{compositionId:'editor-different'});assert.equal(wi.payload.text,'0 false');comp.payload={Firstname:'',Lastname:''};comp.emit('payload_changed',{});assert.equal(wi.payload.text,'');
 script.close();comp.payload.Firstname='Late';comp.emit('payload_changed',{});assert.equal(wi.payload.text,'');assert(!comp.handlers['payload_changed']);
});
check('timeline and settled state have separate outputs; child events ignored; cleanup',()=>{
 const wiStatus=widget('status'),wiState=widget('state');const comp=composition({'Animation Status':wiStatus,'Settled State':wiState});const script=run('animation-events');script.init(comp);assert.equal(wiState.payload.text,'Out');
 comp.emit('timeline_event',{compositionId:'child',message:{event:'start',targetState:'In'}});assert.equal(wiStatus.payload.text,'Waiting for a timeline action');
 for(const action of ['start','stop','jump']){comp.emit('timeline_event',{compositionId:'local',message:{event:action,targetState:'In'}});assert.equal(wiStatus.payload.text,action+': In');}
 comp.emit('state_changed',{compositionId:'local',state:'Out1'});assert.equal(wiState.payload.text,'Out1');assert.equal(wiStatus.payload.text,'jump: In');script.close();assert(!comp.handlers['timeline_event'] && !comp.handlers['state_changed']);
});
check('child action propagates or is consumed; root handler does not replace child',()=>{
 for(const consume of [false,true]){
  const gr={visible:true,getVisibility(){return this.visible;},setVisibility(v){this.visible=v;}};const child=composition({}, {},'child',{Details:gr});const root=composition({}, {},'root',{}, {'Lower Third':child});const observed=[];
  const childScript=run('child-button',{},s=>s.replace('const consumeLocally = false','const consumeLocally = '+consume));const rootScript=run('root-button-route',{console:{log(...a){observed.push(a);}}});childScript.init(child);rootScript.init(root);
  let stopped=false;const msg={compId:'child',buttonId:'Toggle Details'};child.emit('button_clicked',msg,{stopPropagation(){stopped=true;}});if(!stopped)root.emit('button_clicked',msg);assert.equal(gr.visible,false);assert.equal(observed.length,consume?0:1);
  child.emit('button_clicked',{compId:'other',buttonId:'Toggle Details'});assert.equal(gr.visible,false);childScript.close();rootScript.close();assert(!root.handlers['button_clicked']);assert(!child.handlers['button_clicked']);
 }
});
check('single widget router catches synchronous bounds and rejects other identities',()=>{
 const wiLabel=widget('label'),wiClock=widget('clock');const comp=composition({Label:wiLabel,Clock:wiClock});const output=[];const original=wiLabel.setPayload;
 const msg=(id,data,compId='local')=>({event:'custom',params:{type:'widget',compId,id,data}});
 wiLabel.setPayload=function(p){original.call(this,p);comp.emit('message',msg('label',{event:'bounds',widthPx:80}));};
 const script=run('widget-message-router',{console:{log(...a){output.push(a);}}});script.init(comp);assert(output.length>0);
 comp.emit('message',msg('clock',{type:'timeChanged',time:2.5}));assert.equal(output.at(-1)[1],2.5);const count=output.length;
 comp.emit('message',msg('other',{event:'bounds',widthPx:1}));comp.emit('message',msg('label',{event:'bounds',widthPx:1},'other'));assert.equal(output.length,count);
 script.close();comp.emit('message',msg('clock',{type:'timeChanged',time:3}));assert.equal(output.length,count);assert(!comp.handlers['message']);
});
check('global helper preserves unrelated namespace and formats consumer inputs',()=>{
 const context={global:{unrelated:42}};run('global-formatters').init(context);assert.equal(context.global.unrelated,42);const wi=widget('full');const comp=composition({'Full Name':wi},{Firstname:' Ada ',Lastname:''});run('use-global-formatters',{compCurrent:comp,context});assert.equal(wi.payload.text,'Ada');
});
check('date fragment enforces milliseconds number and explicitly chooses UTC',()=>{
 const wi=widget('start');const comp=composition({'Start Time':wi},{'Start Timestamp':1893456000000});let utcCalled=false;
 const context={utils:{createMoment(ms){assert.equal(ms,1893456000000);return{isValid(){return true;},utc(){utcCalled=true;return this;},format(pattern){assert.equal(pattern,'YYYY-MM-DD HH:mm:ss [UTC]');return'2030-01-01 00:00:00 UTC';}};}}};
 run('format-start-time',{compCurrent:comp,context});assert(utcCalled);assert.equal(wi.payload.text,'2030-01-01 00:00:00 UTC');comp.payload['Start Timestamp']='1893456000000';run('format-start-time',{compCurrent:comp,context});assert.equal(wi.payload.text,'Invalid start time');
});
function tinyColor(value){const valid=value&&typeof value==='object'&&typeof value.r==='number';return{isValid(){return Boolean(valid);},toRgb(){return value;}};}
check('color equality includes alpha; invalid preserves prior fill; adaptation fallback is explicit',()=>{
 const initial={r:18,g:52,b:86,a:0.5};const wi=widget('background',{fillGradient:initial});const comp=composition({Background:wi},{'Brand Color':{...initial,a:1}});const context={utils:{createTinyColor:tinyColor}};run('apply-brand-color',{compCurrent:comp,context});assert.equal(wi.payload.fillGradient.a,1);const count=wi.writes.length;run('apply-brand-color',{compCurrent:comp,context});assert.equal(wi.writes.length,count);comp.payload['Brand Color']='invalid';run('apply-brand-color',{compCurrent:comp,context});assert.equal(wi.writes.length,count);
 const accent=widget('accent');const accentComp=composition({Accent:accent});context.utils.getAdaptationGlobals=()=>({});run('adaptation-accent',{compCurrent:accentComp,context});assert.equal(accent.payload.fillGradient.r,18);context.utils.getAdaptationGlobals=()=>({accentColor:{r:9,g:8,b:7,a:0.5}});run('adaptation-accent',{compCurrent:accentComp,context});assert.equal(accent.payload.fillGradient.r,9);
});
check('stream status is independent; invalid/error preserves content; empty clears; uninstall clears local handlers',()=>{
 const wi=widget('text'),status=widget('status');const comp=composition({'Stream Text':wi,'Connection Status':status});let callback,closed=0;
 const context={utils:{createDataStream(token,cb){callback=cb;return{close(){closed++;}};}}};const script=run('stream-with-status');script.init(comp,context);callback('open');assert.equal(wi.payload.text,'Waiting for data');callback('message',{payload:{text:'First'}});callback('message',{payload:{text:'Second'}});assert.equal(wi.payload.text,'Second');callback('message',{text:'wrong envelope'});callback('error');assert.equal(wi.payload.text,'Second');callback('message',{payload:{text:''}});assert.equal(wi.payload.text,'');script.close();script.close();callback('message',{payload:{text:'Late'}});assert.equal(wi.payload.text,'');assert.equal(closed,1);
});
check('runtime diagnostics allowlist and display-variant fallback/copy read',()=>{
 const output=[];const context={utils:{getSingularWindow(){return'app_output';},getDisplayVariant(){return undefined;}}};const comp=composition({'Variant Info':widget('variant')});run('runtime-diagnostics',{compCurrent:comp,context,console:{log(...a){output.push(a);}}});assert.equal(output.length,0);context.utils.getSingularWindow=()=> 'script_editor';run('runtime-diagnostics',{compCurrent:comp,context,console:{log(...a){output.push(a);}}});assert.equal(output.length,1);
 run('display-variant',{compCurrent:comp,context});assert.equal(comp.findWidget('Variant Info')[0].payload.text,'No variant | nominal resolution: not configured');context.utils.getDisplayVariant=()=>({name:'Portrait',resolution:{width:1080,height:1920}});run('display-variant',{compCurrent:comp,context});assert(comp.findWidget('Variant Info')[0].payload.text.startsWith('Portrait | nominal resolution:'));
});
check('reportOnce uses styled console.log, deduplicates stable keys, and supports disabling',()=>{
 const text=fs.readFileSync(path.join(base,'../examples/report-once.md'),'utf8');
 const source=[...text.matchAll(/```javascript\s*\n([\s\S]*?)```/g)][0][1];
 const entries=[];const logger={log(...args){entries.push(args);}};
 const script=vm.runInNewContext(source,{console:logger});const wi=widget('title');script.init(composition({Title:wi}));
 assert.equal(wi.payload.text,'Ready');assert.equal(entries.length,1);assert(entries[0][0].startsWith('%c'));assert.equal(entries[0][1],'color: #c62828');
 const warning=vm.runInNewContext(source,{console:logger});warning.init(composition());assert.equal(entries.length,2);assert.equal(entries[1][1],'color: #b36b00');
 const disabled=vm.runInNewContext(source.replace('const diagnosticsEnabled = true','const diagnosticsEnabled = false'),{console:logger});disabled.init(composition());assert.equal(entries.length,2);
});
console.log(JSON.stringify({javascriptBlocks:syntax,relativeLinks:links,behaviorFixtures:fixtures,scope:'Syntax, links, and mocked control flow; not live Player or third-party library acceptance'},null,2));
