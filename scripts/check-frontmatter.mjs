#!/usr/bin/env node
// Confere o frontmatter de toda página .mdx: title obrigatório e description
// entre 70 e 160 caracteres (o que o Google mostra inteiro no resultado).
// Uso: node scripts/check-frontmatter.mjs [--verbose]
// Sai com código 1 se alguma página falhar.

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MIN_DESCRIPTION = 70;
const MAX_DESCRIPTION = 160;
const IGNORED_DIRS = new Set(['node_modules', 'snippets', 'scripts']);
const verbose = process.argv.includes('--verbose');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) return [];
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return IGNORED_DIRS.has(entry.name) ? [] : walk(path);
    return entry.name.endsWith('.mdx') ? [path] : [];
  });
}

// Lê só o que o script precisa: title e description, com ou sem aspas.
function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
      value = value.slice(1, -1).replace(/''/g, "'").replace(/\\"/g, '"');
    }
    fields[kv[1]] = value;
  }
  return fields;
}

const problems = [];
const pages = walk(ROOT).sort();

for (const file of pages) {
  const rel = relative(ROOT, file);
  const fm = parseFrontmatter(readFileSync(file, 'utf8'));
  if (!fm) {
    problems.push(`${rel}: sem frontmatter`);
    continue;
  }
  if (!fm.title) problems.push(`${rel}: sem title`);
  if (!fm.description) {
    problems.push(`${rel}: sem description`);
  } else {
    const length = [...fm.description].length;
    if (length < MIN_DESCRIPTION || length > MAX_DESCRIPTION) {
      problems.push(`${rel}: description com ${length} caracteres (esperado ${MIN_DESCRIPTION}-${MAX_DESCRIPTION})`);
    }
  }
  if (verbose && fm.title && fm.description) {
    console.log(`${rel}\n  title (${[...fm.title].length}): ${fm.title}\n  description (${[...fm.description].length}): ${fm.description}`);
  }
}

if (problems.length) {
  console.error(`\n${problems.length} problema(s) em ${pages.length} páginas:\n`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log(`OK: ${pages.length} páginas com title e description entre ${MIN_DESCRIPTION} e ${MAX_DESCRIPTION} caracteres.`);
