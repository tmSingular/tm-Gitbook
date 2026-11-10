const fs=require('fs');const path=require('path');const vm=require('vm');const assert=require('assert/strict');
const docs=path.resolve(process.argv[2]||path.join(__dirname,'../docs'));
const roots=['api-and-sdk-reference/api-and-sdk-reference/data-streams','api-and-sdk-reference/data-streams'];
const expected=['README.md','quick-start.md','create-a-stream.md','publish.md','subscribe.md','messages.md','lifecycle.md','limits.md','troubleshooting.md'];
let links=0,jsonBlocks=0,scripts=0;
function slug(s){return s.toLowerCase().replace(/[^\p{L}\p{N}_\- ]/gu,'').replace(/ /g,'-');}
for(const root of roots){
 for(const name of expected){
  const file=path.join(docs,root,name);const text=fs.readFileSync(file,'utf8');
  assert.equal((text.match(/^```/gm)||[]).length%2,0,'Unclosed code fence: '+file);
  for(const match of text.matchAll(/```json\s*\n([\s\S]*?)```/g)){JSON.parse(match[1]);jsonBlocks++;}
  for(const match of text.matchAll(/```javascript\s*\n([\s\S]*?)```/g)){
   new vm.Script(match[1],{filename:file});scripts++;
   assert(!/\bvar\s|\bthrow\s|console\.(?:warn|error)|\.catch\s*\(/.test(match[1]),'Example convention: '+file);
   assert(/^\s*(?:\/\/[^\n]*\n\s*)*\(function\(\)\s*\{\s*return\s*\{/.test(match[1]),'Complete script structure: '+file);
  }
  for(const match of text.matchAll(/```bash\s*\n([\s\S]*?)```/g)){
   assert(match[1].includes('--request PUT'));assert(match[1].includes('/datastreams/YOUR_PRIVATE_TOKEN'));
   const data=match[1].match(/--data '([^']+)'/);assert(data,'Missing JSON request body');assert.equal(typeof JSON.parse(data[1]).text,'string');
  }
  const prose=text.replace(/^```[^\n]*\n[\s\S]*?^```/gm,'').replace(/`[^`\n]+`/g,'');
  assert(!/<a\b[^>]*href=["']https?:/i.test(prose),'External HTML link: '+file);
  for(const match of prose.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)){
   assert(!/^https?:/.test(match[1]),'External documentation link: '+file);
   const [rel,anchor]=match[1].split('#');let target=path.resolve(path.dirname(file),rel||path.basename(file));
   if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'README.md');
   assert(fs.existsSync(target),'Missing target '+match[1]+' in '+file);
   if(anchor){const headings=[...fs.readFileSync(target,'utf8').matchAll(/^#+\s+(.+)$/gm)].map(h=>slug(h[1]));assert(headings.includes(anchor),'Missing anchor '+match[1]+' in '+file);}
   links++;
  }
 }
}
const summary=fs.readFileSync(path.join(docs,'SUMMARY.md'),'utf8');
const nav=[...summary.matchAll(/\[([^\]]+)\]\((api-and-sdk-reference\/api-and-sdk-reference\/data-streams\/[^)]+)\)/g)];
assert.equal(nav.length,expected.length);assert.equal(new Set(nav.map(m=>m[2])).size,expected.length);
for(const match of nav)assert.equal(fs.readFileSync(path.join(docs,match[2]),'utf8').split('\n')[0],'# '+match[1]);
const quick=fs.readFileSync(path.join(docs,roots[0],'quick-start.md'),'utf8');const source=[...quick.matchAll(/```javascript\s*\n([\s\S]*?)```/g)][0][1];
const updates=[];let callback,closeCount=0;
const wiStreamText={setPayload(patch){updates.push({...patch});}};
const compCurrent={findWidget(name){assert.equal(name,'Stream Text');return[wiStreamText];}};
const context={utils:{createDataStream(token,consumer){assert.equal(token,'your-data-stream-public-token');callback=consumer;consumer('message',{payload:{text:'Retained value'}});return{close(){closeCount++;}};}}};
const script=vm.runInNewContext(source);script.init(compCurrent,context);
assert.equal(updates[0].text,'Waiting for data');assert.equal(updates.at(-1).text,'Retained value');
callback('open');callback('disconnect');assert.equal(updates.at(-1).text,'Retained value');
callback('message',{payload:{text:'First update'}});callback('message',{payload:{text:'Second update'}});assert.equal(updates.at(-1).text,'Second update');
callback('message',{payload:{text:''}});assert.equal(updates.at(-1).text,'');
script.close(compCurrent);script.close(compCurrent);const count=updates.length;callback('message',{payload:{text:'Late'}});assert.equal(updates.length,count);assert.equal(closeCount,1);
console.log('PASS synchronous retained value, status filtering, two live updates, clearing, idempotent cleanup, and late callback suppression.');
// Appended to the Data Streams check after its basic subscription fixture.
const subscriptionPage=fs.readFileSync(path.join(docs,roots[0],'subscribe.md'),'utf8');
const subscriptionExamples=[...subscriptionPage.matchAll(/```javascript\s*\n([\s\S]*?)```/g)].map(match=>match[1]);
assert.equal(subscriptionExamples.length,2,'Basic and diagnostic subscriptions must both be present');
assert.equal(subscriptionExamples[0],source,'The quick start must use the same basic script');
const entries=[];const diagnosticWrites=[];let diagnosticCallback,diagnosticCloseCount=0;
const diagnosticComp={name:'Diagnostic',findWidget(name){assert.equal(name,'Stream Text');return[{setPayload(patch){diagnosticWrites.push({...patch});}}];}};
const diagnosticContext={utils:{createDataStream(token,consumer){assert.equal(token,'your-data-stream-public-token');diagnosticCallback=consumer;consumer('connecting');consumer('connect');consumer('open');return{close(){diagnosticCloseCount++;consumer('close');}};}}};
const diagnostic=vm.runInNewContext(subscriptionExamples[1],{console:{log(...args){entries.push(args);}}});
diagnostic.init(diagnosticComp,diagnosticContext);
const originalMessage={payload:{text:'First diagnostic value'},sampleMetadata:'observed envelope'};
diagnosticCallback('message',originalMessage);
diagnosticCallback('message',{payload:{text:''}});
diagnosticCallback('message',{});
diagnosticCallback('message',{payload:{text:123}});
diagnosticCallback('close');diagnosticCallback('disconnect');diagnosticCallback('error',{description:'sample error'});diagnosticCallback('future-status',{sample:true});
assert.equal(diagnosticWrites[0].text,'First diagnostic value');assert.equal(diagnosticWrites.at(-1).text,'');assert.equal(diagnosticWrites.length,2);
assert(entries.some(args=>args[3]===originalMessage),'Full message should be logged without stripping its envelope');
for(const statusText of ['connecting…','connected to data stream server','stream open','stream closed','disconnected from data stream server','data stream error:','unhandled status "future-status":'])assert(entries.some(args=>args[2]===statusText),'Missing diagnostic '+statusText);
assert(entries.some(args=>args[2]==='message #4 — full message:'),'Each message callback increments the counter');
assert(entries.some(args=>args[2]==='payload:'&&args[3].includes('First diagnostic value')),'Payload JSON should be logged separately');
assert(entries.some(args=>args[1]==='color: #b36b00'));assert(entries.some(args=>args[1]==='color: #c62828'));assert(entries.some(args=>args[1]==='color: #1565c0'));
assert(entries.every(args=>/^%c\[DataStream\] \d{4}-\d{2}-\d{2}T/.test(args[0])),'Every diagnostic log needs a timestamped prefix');
diagnostic.close(diagnosticComp);diagnostic.close(diagnosticComp);
assert(entries.some(args=>args[2]==='closing script — 4 message(s) received'));
const logsAtClose=entries.length,writesAtClose=diagnosticWrites.length;
diagnosticCallback('message',{payload:{text:'Late'}});diagnosticCallback('error',{});
assert.equal(entries.length,logsAtClose);assert.equal(diagnosticWrites.length,writesAtClose);assert.equal(diagnosticCloseCount,1);
const loggingOnly=[];let loggingOnlyCallback,loggingOnlyClosed=0;
const loggingComp={name:'Logging only',findWidget(){return[];}};
const loggingScript=vm.runInNewContext(subscriptionExamples[1],{console:{log(...args){loggingOnly.push(args);}}});
loggingScript.init(loggingComp,{utils:{createDataStream(token,consumer){loggingOnlyCallback=consumer;return{close(){loggingOnlyClosed++;}};}}});
loggingOnlyCallback('message',{payload:{text:'No widget required'}});
assert(loggingOnly.some(args=>args[2]==='widget "Stream Text" not found — logging only'));
assert(loggingOnly.some(args=>args[2]==='message #1 — full message:'));loggingScript.close(loggingComp);assert.equal(loggingOnlyClosed,1);
console.log('PASS all known/unknown statuses, timestamped colored logs, message counter, full envelope/payload logging, missing-widget mode, and post-close suppression.');

console.log(JSON.stringify({pagesChecked:expected.length*roots.length,navigationEntries:nav.length,relativeLinks:links,jsonBlocks,javascriptBlocks:scripts,scope:'Static checks and mocked client lifecycle; no live HTTP publish or Player acceptance'},null,2));
