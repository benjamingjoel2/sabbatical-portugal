// node extract.cjs <repo> [dirs...]  -> i18n/strings.json (all copy) + i18n/client-keys.json (copy reachable from client components)
const fs = require('fs');
const path = require('path');
const repo = path.resolve(process.argv[2] || path.join(__dirname, '..'));
const ts = require(path.join(repo, 'node_modules/typescript'));
const DIRS = process.argv.length > 3 ? process.argv.slice(3) : ['app', 'components', 'data', 'config', 'lib', 'content'];
const SKIP_ATTR = /^(className|class|href|src|id|key|ref|style|k|image|slug|variant|size|as|type|name|icon|tone|sizes|target|rel|htmlFor|role|d|viewBox|fill|stroke|transform|autoComplete|inputMode|method|lang|hrefLang|loading|decoding|fetchPriority|aria-hidden|aria-controls|aria-current|aria-expanded|data-[\w-]+)$/;
const norm = (s) => s.replace(/\s+/g, ' ').trim();

function looksLikeCopy(s) {
  const k = norm(s);
  if (!/\p{L}{3}/u.test(k)) return false;
  if (/^(\/|#|https?:|mailto:|tel:|data:|\.\/|@\/|\.\.\/)/.test(k)) return false;
  if (/^[a-z0-9]+([-_.:/][a-z0-9]+)*$/.test(k)) return false;
  if (/^[a-z]+[A-Z]\w*$/.test(k)) return false;
  if (/^[A-Z0-9_]+$/.test(k) && k.length <= 4) return false;
  if (k.split(' ').every((w) => /^[!-]?[a-z0-9:[\]\-./%()#_,'=&>*~+]+$/.test(w)) && /[-:[]/.test(k)) return false;
  if (/^(use client|use server|use strict|server-only)$/.test(k)) return false;
  if (/^(\(|\[|\{).*[)\]}]$/.test(k) && !/ /.test(k)) return false;
  if (/^[\w-]+\/[\w.+-]+$/.test(k)) return false; // mime types
  if (/^(min|max)-width|^\(|^\d+(px|rem|vw|vh|%)|cubic-bezier|^rgba?\(|^#[0-9a-f]{3,8}$/i.test(k)) return false;
  return /\s/.test(k) || /^\p{Lu}/u.test(k) || /[^\x00-\x7f]/.test(k);
}

const files = [];
function walk(d) {
  if (!fs.existsSync(d)) return;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { const r = path.relative(repo, p); if (!/node_modules|^lib\/i18n|^components\/i18n|^app\/api|^i18n$/.test(r)) walk(p); }
    else if (/\.(tsx?|mjs)$/.test(e.name) && !/\.d\.ts$/.test(e.name)) files.push(p);
  }
}
DIRS.forEach((d) => walk(path.join(repo, d)));

const found = new Map(); // en -> Set(files)
const literals = new Map(); // every literal with letters -> Set(files) (client dictionary filter)
const addLit = (s, f) => { const k = norm(s); if (!/\p{L}{2}/u.test(k) || k.length > 400) return; if (!literals.has(k)) literals.set(k, new Set()); literals.get(k).add(f); };
const add = (s, f) => { const k = norm(s); if (!looksLikeCopy(k)) return; if (!found.has(k)) found.set(k, new Set()); found.get(k).add(f); };
const imports = new Map(); // file -> [resolved]
const clientFiles = new Set();

function resolveImp(from, spec) {
  let base;
  if (spec.startsWith('@/')) base = path.join(repo, spec.slice(2));
  else if (spec.startsWith('.')) base = path.resolve(path.dirname(from), spec);
  else return null;
  for (const ext of ['', '.ts', '.tsx', '.mjs', '/index.ts', '/index.tsx']) { const p = base + ext; if (fs.existsSync(p) && fs.statSync(p).isFile()) return p; }
  return null;
}

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const sf = ts.createSourceFile(f, src, ts.ScriptTarget.Latest, true, f.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const rel = path.relative(repo, f);
  if (/^\s*['"]use client['"]/.test(src)) clientFiles.add(rel);
  const imps = [];
  const visitLit = (n) => { if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) addLit(n.text, rel); else if (ts.isJsxText(n)) addLit(n.text, rel); ts.forEachChild(n, visitLit); };
  visitLit(sf);
  const visit = (n) => {
    if ((ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) && n.moduleSpecifier) { const r = resolveImp(f, n.moduleSpecifier.text); if (r) imps.push(path.relative(repo, r)); return; }
    if (ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword) return;
    if (ts.isLiteralTypeNode(n) || ts.isTypeAliasDeclaration(n) || ts.isInterfaceDeclaration(n)) return;
    if (ts.isCallExpression(n) && ts.isIdentifier(n.expression) && /^(cn|clsx|cva|twMerge|require|getElementById|querySelector|querySelectorAll)$/.test(n.expression.text)) return;
    if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression) && /^(querySelector|querySelectorAll|getItem|setItem|removeItem|addEventListener|removeEventListener|getElementById|setProperty|startsWith|endsWith|includes|split|join|toLocaleDateString|toLocaleString|matchMedia|get|has|log|warn|error|info|setAttribute|getAttribute)$/.test(n.expression.name.text) && !/join/.test(n.expression.name.text)) return;
    if (ts.isJsxAttribute(n) && SKIP_ATTR.test(n.name.getText(sf))) return;
    if (ts.isPropertyAssignment(n) && (ts.isStringLiteral(n.name) || ts.isIdentifier(n.name)) && /^(slug|href|id|key|k|image|images|src|icon|path|url|email|type|variant|tone|className|photo|file|sound|currency|code|iso|date|layout|audio|unsplash|credit|photographer|value|locale|timeZone|tz|hex|color|bg|accent|gradient)$/.test(n.name.text)) {
      // values here are identifiers, except a few known copy keys
      return;
    }
    if (ts.isBinaryExpression(n) && [ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken].includes(n.operatorToken.kind)) return;
    if (ts.isCaseClause(n)) { n.statements.forEach(visit); return; }
    if (ts.isElementAccessExpression(n)) { visit(n.expression); return; }
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      if (ts.isPropertyAssignment(n.parent) && n.parent.name === n) return;
      add(n.text, rel);
      return;
    }
    if (ts.isTemplateExpression(n)) {
      let pat = n.head.text;
      n.templateSpans.forEach((s, i) => { pat += `{${i}}` + s.literal.text; visit(s.expression); });
      if (/\p{L}{2}/u.test(pat.replace(/\{\d\}/g, '')) && !/^[\s{}\d]*(\/|https?:|#|\?|&)/.test(pat) && !/[\[\]=]|px|rem|translate|rotate|scale|rgba|var\(--/.test(pat)) add(pat, rel);
      return;
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  imports.set(rel, imps);
}
// client closure
const closure = new Set();
const stack = [...clientFiles];
while (stack.length) { const f = stack.pop(); if (closure.has(f)) continue; closure.add(f); (imports.get(f) || []).forEach((x) => stack.push(x)); }
const list = [...found].map(([en, fs_]) => ({ en, files: [...fs_] }));
// Data modules imported by client components: only short labels go to the browser; long copy is translated on the server.
const isData = (f) => /^(data|config|content)\//.test(f);
const inClient = (fs_, k) => [...fs_].some((f) => closure.has(f) && (!isData(f) || k.length <= 90));
const ck = new Set(list.filter((x) => inClient(x.files, x.en)).map((x) => x.en));
for (const [k, fs_] of literals) if (inClient(fs_, k)) ck.add(k);
const clientKeys = [...ck];
fs.mkdirSync(path.join(repo, 'i18n'), { recursive: true });
fs.writeFileSync(path.join(repo, 'i18n/strings.json'), JSON.stringify(list, null, 1));
fs.writeFileSync(path.join(repo, 'i18n/client-keys.json'), JSON.stringify(clientKeys.sort(), null, 0));
console.log(`strings ${list.length} (${list.reduce((a, x) => a + x.en.length, 0)} chars); client keys ${clientKeys.length} (${clientKeys.reduce((a, x) => a + x.length, 0)} chars); client closure files ${closure.size}`);
