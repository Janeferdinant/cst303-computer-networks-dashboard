// Tests for the Markdown + TeX renderer used by the exam solver.
// KaTeX itself runs in the browser; here a stub renderer records what would be typeset.
// Run with: node --test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderInline, renderRichText, escapeHtml, katexRenderer } from '../js/lib/richText.js';
import { examSolutionsData } from '../js/data/examSolutionsData.js';

const stub = (tex, display) => `<m${display ? ' d' : ''}>${escapeHtml(tex)}</m>`;

test('inline and display maths are passed to the renderer', () => {
  assert.equal(renderInline('Layer $N+1$ uses $N$', stub), 'Layer <m>N+1</m> uses <m>N</m>');
  assert.equal(renderInline('$$2^s \\ge 1000$$', stub), '<m d>2^s \\ge 1000</m>');
});

test('bold that wraps maths still renders as bold', () => {
  assert.equal(renderInline('**$\\infty$ (poisoned)**', stub), '<strong><m>\\infty</m> (poisoned)</strong>');
  assert.equal(renderInline('*italic* and **bold**', stub), '<em>italic</em> and <strong>bold</strong>');
});

test('plain text is HTML-escaped; code spans keep their contents', () => {
  assert.equal(renderInline('a < b & c', stub), 'a &lt; b &amp; c');
  assert.match(renderInline('`1101` $x$', stub), /<code[^>]*>1101<\/code> <m>x<\/m>/);
  assert.equal(renderInline('2 * 3 * 4', stub), '2 * 3 * 4');
});

test('fenced code is not treated as maths or Markdown', () => {
  const html = renderRichText('```\n|--- $a$ **b** <x> --->|\n```', stub);
  assert.match(html, /<pre[^>]*><code>\|--- \$a\$ \*\*b\*\* &lt;x&gt; ---&gt;\|<\/code><\/pre>/);
});

test('pipe tables become HTML tables with maths in cells', () => {
  const md = '| Feature | GBN | SR |\n|---|---|---|\n| Window | $2^m - 1$ | $2^{m-1}$ |';
  const html = renderRichText(md, stub);
  assert.match(html, /<table class="md-table"><thead><tr><th>Feature<\/th><th>GBN<\/th><th>SR<\/th><\/tr><\/thead>/);
  assert.match(html, /<td><m>2\^m - 1<\/m><\/td><td><m>2\^\{m-1\}<\/m><\/td>/);
});

test('lists keep the author numbering across interruptions', () => {
  const html = renderRichText('1. one\n$$x$$\n2. two\n- a\n- b', stub);
  assert.match(html, /<ol class="md-list"><li>one<\/li><\/ol>/);
  assert.match(html, /<ol class="md-list" start="2"><li>two<\/li><\/ol>/);
  assert.match(html, /<ul class="md-list"><li>a<\/li><li>b<\/li><\/ul>/);
});

test('without KaTeX loaded, TeX source is shown as code instead of raw dollars', () => {
  assert.equal(typeof globalThis.window, 'undefined');
  assert.equal(katexRenderer('x^2', false), '<code class="font-mono tex-fallback">x^2</code>');
  assert.match(renderInline('$a<b$'), /<code class="font-mono tex-fallback">a&lt;b<\/code>/);
});

test('every worked solution renders with no stray $ delimiters or ** markers', () => {
  let questions = 0;
  let mathCalls = 0;
  const counting = (tex, display) => { mathCalls++; return stub(tex, display); };
  for (const paper of examSolutionsData) {
    for (const section of paper.sections) {
      for (const q of section.questions) {
        questions++;
        for (const field of ['questionText', 'schemeRubric', 'conciseAnswer']) {
          const html = renderInline(q[field], counting);
          assert.ok(!html.includes('$'), `${paper.paperId} Q${q.qNo} ${field} has a stray $`);
        }
        const html = renderRichText(q.detailedAnswer, counting);
        const outsidePre = html.replace(/<pre[\s\S]*?<\/pre>/g, '');
        assert.ok(!outsidePre.includes('$'), `${paper.paperId} Q${q.qNo} detailedAnswer has a stray $`);
        assert.ok(!outsidePre.includes('**'), `${paper.paperId} Q${q.qNo} detailedAnswer has a stray **`);
      }
    }
  }
  assert.ok(questions > 0);
  assert.ok(mathCalls > 0);
});

test('Dec 2023 Q14b sits in a Part B section, not Part A', () => {
  const dec2023 = examSolutionsData.find(p => p.paperId === 'cst303-dec2023');
  const partA = dec2023.sections.find(s => s.sectionName.startsWith('PART A'));
  const partB = dec2023.sections.find(s => s.sectionName.startsWith('PART B'));
  assert.ok(partA.questions.every(q => q.marks === 3));
  assert.ok(partB.questions.some(q => q.qNo === '14b' && q.marks === 7));
});
