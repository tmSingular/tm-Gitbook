'use strict';
// Author the simple App SDK tree. Generate the existing GitBook navigation layout.
const fs = require('node:fs');
const path = require('node:path');
const source = path.resolve(__dirname, '../docs/api-and-sdk-reference/app-sdk');
const target = path.resolve(__dirname, '../docs/api-and-sdk-reference/api-and-sdk-reference/app-sdk');
const docs = path.resolve(__dirname, '../docs');
const check = process.argv.includes('--check');
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
}
function destination(file) {
  const rel = path.relative(source, file).replaceAll('\\', '/');
  const flat = ['examples/lower-third-app.md', 'examples/subcomposition-fill-in-form.md'];
  return path.join(target, flat.includes(rel) ? path.basename(rel) : rel);
}
function relocate(resolved) {
  if (resolved === source || resolved.startsWith(source + path.sep)) return destination(resolved);
  const graphics = path.join(docs, 'api-and-sdk-reference/graphics-sdk');
  if (resolved === graphics || resolved.startsWith(graphics + path.sep)) {
    return path.join(docs, 'api-and-sdk-reference/api-and-sdk-reference/graphics-sdk', path.relative(graphics, resolved));
  }
  const rest = path.join(docs, 'api-and-sdk-reference/rest');
  if (resolved === rest || resolved.startsWith(rest + path.sep)) {
    return path.join(docs, 'api-and-sdk-reference/api-and-sdk-reference/rest', path.relative(rest, resolved));
  }
  const scripting = path.join(docs, 'composition-scripting');
  if (resolved === scripting || resolved.startsWith(scripting + path.sep)) {
    return path.join(docs, 'composition-scripting/composition-scripting', path.relative(scripting, resolved));
  }
  // Existing source links use the shorter operations layout; use the published one.
  const operations = path.join(docs, 'operate-and-troubleshoot');
  if (resolved.startsWith(operations + path.sep) && !resolved.startsWith(path.join(operations, 'operate-and-troubleshoot') + path.sep)) {
    return path.join(operations, 'operate-and-troubleshoot', path.relative(operations, resolved));
  }
  return resolved;
}
let count = 0;
for (const file of walk(source).filter(file => file.endsWith('.md'))) {
  const dest = destination(file);
  function link(href) {
    if (/^(?:[a-z][a-z\d+.-]*:|#|\/)/i.test(href)) return href;
    const [name, ...fragment] = href.split('#');
    const resolved = relocate(path.resolve(path.dirname(file), name));
    return path.relative(path.dirname(dest), resolved).replaceAll('\\', '/') + (fragment.length ? '#' + fragment.join('#') : '');
  }
  // Never rewrite link-looking text inside code fences (complete HTML is embedded).
  const parts = fs.readFileSync(file, 'utf8').split(/(^```[^\n]*\n[\s\S]*?^```[^\n]*$)/m);
  const text = parts.map((part, i) => i % 2 ? part : part
    .replace(/(!?\[[^\]]*\]\()([^\s)]+)(\))/g, (_, start, href, end) => start + link(href) + end)
    .replace(/(\{% file src=")([^"]+)(" %\})/g, (_, start, href, end) => start + link(href) + end)).join('');
  if (check) {
    if (!fs.existsSync(dest) || fs.readFileSync(dest, 'utf8') !== text) throw new Error('Generated page differs: ' + dest);
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, text);
  }
  count++;
}
console.log(`${check ? 'Verified' : 'Generated'} ${count} App SDK pages`);
