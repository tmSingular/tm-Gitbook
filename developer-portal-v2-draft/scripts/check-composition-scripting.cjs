const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = process.argv[2] || path.resolve(__dirname, '../docs/composition-scripting');
const blocks = name => [...fs.readFileSync(path.join(root,name),'utf8').matchAll(/```javascript\s*\n([\s\S]*?)```/g)].map(m=>m[1]);
const silent = {log(){},warn(){},error(){}};
let parsed=0, checks=0;
function walk(dir) { return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]); }
for(const file of walk(root).filter(f=>f.endsWith('.md'))) {
  for(const m of fs.readFileSync(file,'utf8').matchAll(/```javascript\s*\n([\s\S]*?)```/g)) {
    new vm.Script(m[1],{filename:file});parsed++;
    assert(!/\?\.|\?\?/.test(m[1]),'Post-ES2017 syntax in '+file);
  }
}
function widget(id,initial={}) {
  return {id,payload:{...initial},writes:[],getPayload(){return {...this.payload};},setPayload(p){this.writes.push(JSON.parse(JSON.stringify(p)));Object.assign(this.payload,p);},setVisibility(value){this.visible=value;}};
}
function comp(widgets={},payload={},id='local',groups={},children={}) {
  return {id,widgets,payload,handlers:{},removed:[],
    getPayload2(){return {...this.payload};},
    findWidget(name){return widgets[name]?[widgets[name]]:[];},
    findGroup(name){return groups[name]?[groups[name]]:[];},
    find(name){return children[name]?[children[name]]:[];},
    addListener(event,handler){this.handlers[event]=handler;},
    removeListener(...args){assert.equal(args.length,1,'Removal must use the event slot only');this.removed.push(args[0]);delete this.handlers[args[0]];},
    emit(event,message={}){if(this.handlers[event])this.handlers[event](event,message,{stopPropagation(){throw new Error('Unexpected propagation suppression');}});}
  };
}
function load(file,index=0,globals={}) {return vm.runInNewContext(blocks(file)[index],{console:silent,...globals});}
function check(name,fn) {fn();checks++;console.log('PASS '+name);}

check('reactive input: initial, live, empty, effective-state repair, late and failed-init cleanup',()=>{
 const output=widget('output'),c=comp({Output:output},{'Public Value':'Initial'});
 const s=load('how-to-guides/react-to-control-node-changes.md');s.init(c,{});assert.equal(output.payload.text,'Initial');
 c.payload['Public Value']=0;c.emit('payload_changed',{compositionId:'different-editor-envelope'});assert.equal(output.payload.text,'0');
 output.payload.text='Reapplied model';c.emit('payload_changed');assert.equal(output.payload.text,'0');
 c.payload['Public Value']='';c.emit('payload_changed');assert.equal(output.payload.text,'');
 const old=c.handlers.payload_changed;s.close();old();assert.equal(output.payload.text,'');assert.deepEqual(c.removed,['payload_changed']);
 const bad=comp();bad.handlers.payload_changed=()=>{};const oldHandler=bad.handlers.payload_changed;
 const failure=load('how-to-guides/react-to-control-node-changes.md');assert.throws(()=>failure.init(bad,{}),/Output/);failure.close();assert.equal(bad.handlers.payload_changed,oldHandler);
});
check('stream message envelope, invalid input, second update and late callback',()=>{
 const output=widget('stream'),c=comp({'Stream Text':output});let callback,closed=0;
 const s=load('how-to-guides/connect-to-a-data-stream.md');s.init(c,{utils:{createDataStream(token,cb){callback=cb;return{close(){closed++;}};}}});
 assert.equal(output.payload.text,'Waiting for data');callback('message',{payload:{text:'First'}});callback('message',{payload:{text:'Second'}});assert.equal(output.payload.text,'Second');
 callback('message',{text:'Wrong envelope'});callback('message',null);callback('error',{});assert.equal(output.payload.text,'Second');
 s.close();callback('message',{payload:{text:'Late'}});s.close();assert.equal(closed,1);assert.equal(output.payload.text,'Second');
});
check('score feed retains valid zero and rejects invalid scores',()=>{
 const home=widget('home'),away=widget('away'),c=comp({'Home score':home,'Away score':away});let callback,closed=0;
 const s=load('examples/score-bug-reacting-to-live-data.md');s.init(c,{utils:{createDataStream(t,cb){callback=cb;return{close(){closed++;}};}}});
 callback('message',{payload:{home:0,away:0}});assert.equal(home.payload.text,'0');assert.equal(away.payload.text,'0');
 callback('message',{payload:{home:2,away:1}});assert.equal(home.payload.text,'2');
 for(const homeValue of ['3',-1,1.5,Infinity,null])callback('message',{payload:{home:homeValue,away:1}});
 assert.equal(home.payload.text,'2');s.close();callback('message',{payload:{home:4,away:4}});assert.equal(home.payload.text,'2');assert.equal(closed,1);
});
check('HTML escaping, empty state and payload updates',()=>{
 const output=widget('name'),c=comp({'Full name':output},{Firstname:'A&B',Lastname:'<Test>"\''});const s=load('examples/lower-third-with-dynamic-html-text.md');s.init(c,{});
 assert.equal(output.payload.text,'<html>A&amp;B <b>&lt;Test&gt;&quot;&#39;</b></html>');
 c.payload={Firstname:'',Lastname:''};c.emit('payload_changed');assert.equal(output.payload.text,'');s.close();assert.deepEqual(c.removed,['payload_changed']);
});
check('background toggles, empty input, valid color mapping and invalid-color preservation',()=>{
 const output=widget('name'),background=widget('rect'),c=comp({'Full name':output,Background:background},{Firstname:'Ada',Lastname:'Lovelace','Show Background':true,'Background Color':{r:1,g:2,b:3,a:0.4}});
 const s=load('examples/lower-third-with-conditional-background.md');s.init(c,{utils:{createTinyColor(value){return{isValid(){return value&&typeof value.r==='number';},toRgb(){return value;}};}}});
 assert.equal(output.payload.text,'Ada Lovelace');assert.equal(background.visible,true);assert.equal(background.payload.fillGradient.solidColor.a,0.4);
 c.payload['Show Background']=false;c.emit('payload_changed');assert.equal(background.visible,false);
 c.payload.Firstname='';c.payload.Lastname='';c.payload['Show Background']=true;c.payload['Background Color']=null;c.emit('payload_changed');assert.equal(background.visible,false);assert.equal(background.payload.fillGradient.solidColor.a,0.4);s.close();
});
check('Timer formatted initialization, source/key filters, overtime and cleanup',()=>{
 const output=widget('readout'),c=comp({'Timer Readout':output},{'Game Clock':'02:15.3'});const s=load('how-to-guides/react-to-timer-events.md');s.init(c,{});assert.equal(output.payload.text,'02:15.3');
 const message={event:'custom',params:{type:'controlNode',id:'replace-with-stable-timer-key',compId:c.id,data:{type:'timerChanged',value:'-00:01.2',overtime:true}}};
 c.emit('message',{...message,params:{...message.params,compId:'other'}});assert.equal(output.payload.text,'02:15.3');
 c.emit('message',{...message,params:{...message.params,id:'other'}});assert.equal(output.payload.text,'02:15.3');
 c.emit('message',message);assert.equal(output.payload.text,'-00:01.2 OT');const callback=c.handlers.message;s.close();callback('message',message);assert.equal(output.payload.text,'-00:01.2 OT');
});
check('bounds route by tile ID and explicitly clear dependent text',()=>{
 const label=widget('label',{text:'Old'}),output=widget('readout'),c=comp({Label:label,'Width Readout':output},{Label:'New'});const s=load('how-to-guides/react-to-widget-bounds.md');s.init(c,{});
 assert.equal(label.payload.emitEvents,true);assert.equal(label.payload.text,'New');
 c.emit('message',{params:{id:'other',data:{event:'bounds',widthPx:100}}});assert.equal(output.payload.text,undefined);
 c.emit('message',{params:{id:'label',data:{event:'bounds',widthPx:123.45}}});assert.equal(output.payload.text,'123.5');
 c.payload.Label='';c.emit('payload_changed');assert.equal(output.payload.text,'');
 c.emit('message',{params:{id:'label',data:{event:'bounds',widthPx:900}}});assert.equal(output.payload.text,'');s.close();
});
check('button public ID and source filtering; repeated toggles',()=>{
 const output=widget('readout'),c=comp({Readout:output});const s=load('examples/interactive-overlay-with-button-events.md');s.init(c,{});assert.equal(output.payload.text,'Disabled');
 c.emit('button_clicked',{buttonId:'Other',compId:c.id});c.emit('button_clicked',{buttonId:'Toggle',compId:'other'});assert.equal(output.payload.text,'Disabled');
 c.emit('button_clicked',{buttonId:'Toggle',compId:c.id});assert.equal(output.payload.text,'Enabled');
 c.emit('button_clicked',{buttonId:'Toggle',compositionId:c.id});assert.equal(output.payload.text,'Disabled');s.close();
});
check('communication: child init before root, initial and live forwarding, owned function cleanup',()=>{
 const output=widget('title'),child=comp({Title:output},{},'child');const childScript=load('how-to-guides/communicate-between-sub-compositions.md',0);childScript.init(child,{});
 const c=comp({}, {Title:'Initial'},'root',{}, {Lower:child});const rootScript=load('how-to-guides/communicate-between-sub-compositions.md',1);rootScript.init(c,{});assert.equal(output.payload.text,'Initial');
 c.payload.Title='Changed';c.emit('payload_changed');assert.equal(output.payload.text,'Changed');rootScript.close();childScript.close();assert.equal(child.updateContent,undefined);
});
check('normalized values use current metadata and reject nondecimal/invalid values',()=>{
 const source=blocks('api-reference/normalized-numbers.md')[0]+'\nmapped;';
 const field={id:'Scale',type:'normalizednumber',low:0,high:200};const c={getModel(){return[field];},getPayload2(){return{Scale:25};}};
 assert.equal(vm.runInNewContext(source,{comp:c}),50);field.high=400;assert.equal(vm.runInNewContext(source,{comp:c}),100);
 for(const value of ['25.0',' 2.5e1 ',25]){c.getPayload2=()=>({Scale:value});assert.equal(vm.runInNewContext(source,{comp:c}),100);}
 for(const value of ['0x10','25px','',null,true,[],Infinity,-1,101]){c.getPayload2=()=>({Scale:value});assert.throws(()=>vm.runInNewContext(source,{comp:c}),/Invalid/);}
});
check('legacy ticker initial/update text, own In filtering, speed request and cleanup',()=>{
 const ticker=widget('ticker',{speed:20}),c=comp({'Text Ticker':ticker},{Messages:'First'});const s=load('examples/text-ticker-that-restarts-on-the-in-animation.md');s.init(c,{});assert.equal(ticker.payload.text,'First');
 c.payload.Messages='Second';c.emit('payload_changed',{compositionId:'editor-other'});assert.equal(ticker.payload.text,'Second');
 const before=ticker.writes.length;c.emit('timeline_event',{compositionId:'child',message:{event:'start',targetState:'In'}});assert.equal(ticker.writes.length,before);
 c.emit('timeline_event',{compositionId:c.id,message:{event:'start',targetState:'In'}});assert.equal(ticker.writes.at(-2).speed,0);assert.equal(ticker.writes.at(-1).speed,20);s.close();
});
check('clock scheduling and late callback do not resume after close',()=>{
 let id=0;const pending=new Map();const clock=widget('clock'),c=comp({Clock:clock});
 const s=load('examples/clock-with-cleanup.md',0,{setTimeout(fn){pending.set(++id,fn);return id;},clearTimeout(handle){pending.delete(handle);}});s.init(c,{});assert.equal(pending.size,1);assert.equal(typeof clock.payload.text,'string');
 const callback=[...pending.values()][0];s.close();const writes=clock.writes.length;callback();assert.equal(pending.size,0);assert.equal(clock.writes.length,writes);
});
check('fade timestamp interpolation, interruption, stale callback, zero duration and closure',()=>{
 let id=0;const pending=new Map();const writes=[];const group={opacity:100,getOpacity(){return this.opacity;},setOpacity(value){this.opacity=value;writes.push(value);}};
 const c=comp({}, {Opacity:0,'Fade duration':100},'local',{Content:group});
 const s=load('examples/interrupted-opacity-fade.md',0,{requestAnimationFrame(fn){pending.set(++id,fn);return id;},cancelAnimationFrame(handle){pending.delete(handle);}});
 function tick(time){const [handle,fn]=[...pending.entries()][0];pending.delete(handle);fn(time);return fn;}
 s.init(c,{});tick(0);tick(50);assert.equal(group.opacity,50);
 const stale=[...pending.values()][0];c.payload.Opacity=100;c.emit('payload_changed');const count=writes.length;stale(100);assert.equal(writes.length,count);assert.equal(pending.size,1);
 tick(60);tick(110);assert.equal(group.opacity,75);tick(160);assert.equal(group.opacity,100);assert.equal(pending.size,0);
 c.payload.Opacity=40;c.payload['Fade duration']=0;c.emit('payload_changed');assert.equal(group.opacity,40);
 c.payload.Opacity=0;c.payload['Fade duration']=100;c.emit('payload_changed');const late=[...pending.values()][0];s.close();const final=writes.length;late(200);assert.equal(writes.length,final);assert.equal(pending.size,0);
});

(async()=>{
 const source=blocks('how-to-guides/fetch-external-data.md')[0]+'\n({load:load, close:closeRequests});';
 const resolvers=[];const target=widget('feed');let aborted=0;
 const api=vm.runInNewContext(source,{console:silent,AbortController:class{constructor(){this.signal={};}abort(){aborted++;}},fetch(){return new Promise(resolve=>resolvers.push(resolve));}});
 const first=api.load('first',target),second=api.load('second',target);
 resolvers[1]({ok:true,json:()=>Promise.resolve({text:'Newest'})});await second;
 resolvers[0]({ok:true,json:()=>Promise.resolve({text:'Old'})});await first;assert.equal(target.payload.text,'Newest');
 const last=api.load('third',target);api.close();resolvers[2]({ok:true,json:()=>Promise.resolve({text:'Late'})});await last;assert.equal(target.payload.text,'Newest');assert(aborted>=2);checks++;console.log('PASS request ordering, cancellation and late completion');
 console.log(JSON.stringify({javascriptBlocksParsed:parsed,behaviorFixtures:checks,scope:'Static syntax and mocked runtime logic; not live Player acceptance'},null,2));
})().catch(error=>{console.error(error);process.exitCode=1;});
