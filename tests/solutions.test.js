// Tests for the past-paper worked solutions: coverage, structure, mark totals and the
// machine-checked numerical answers (scripts/verify_solutions.js).
// Run with: node --test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { examSolutionsData } from '../js/data/examSolutionsData.js';
import { paperCoverage, coverageSummary, coverageText } from '../js/lib/coverage.js';
import { runChecks, coverage, EXPECTED_QUESTIONS, crcDivide, crcCodeword, bitStuff, bitUnstuff } from '../scripts/verify_solutions.js';

const allQuestions = paper => paper.sections.flatMap(s => s.questions);

test('both papers have a worked solution for every one of their 30 questions', () => {
  assert.equal(examSolutionsData.length, 2);
  for (const paper of examSolutionsData) {
    const have = allQuestions(paper).map(q => String(q.qNo));
    assert.equal(new Set(have).size, have.length, `${paper.paperId} has a duplicate question number`);
    assert.deepEqual([...have].sort(), [...EXPECTED_QUESTIONS[paper.paperId]].sort(), paper.paperId);
    assert.equal(have.length, 30);
  }
  const cov = coverage();
  for (const [id, c] of Object.entries(cov)) {
    assert.deepEqual(c.missing, [], `${id} missing questions`);
    assert.deepEqual(c.extra, [], `${id} unexpected questions`);
  }
});

test('coverage counters are derived from the data', () => {
  const summary = coverageSummary(examSolutionsData);
  assert.equal(summary.solved, 60);
  assert.equal(summary.total, 60);
  assert.equal(summary.complete, true);
  assert.deepEqual(summary.perPaper.map(p => [p.label, p.solved, p.total, p.partA, p.partB]), [
    ['December 2022', 30, 30, 10, 20],
    ['December 2023', 30, 30, 10, 20]
  ]);
  assert.match(coverageText(examSolutionsData[0]), /^all 30 questions on this paper have worked solutions \(10 in Part A and 20 in Part B/);
});

test('coverage helpers report a partial paper honestly', () => {
  const partial = { paperId: 'x', examTitle: 'Exam, May 2020', questionsInPaper: 30, sections: [{ sectionName: 'PART A (x)', questions: [{}, {}, {}] }, { sectionName: 'PART B (x)', questions: [{}, {}] }] };
  const c = paperCoverage(partial);
  assert.deepEqual([c.label, c.solved, c.total, c.partA, c.partB, c.complete], ['May 2020', 5, 30, 3, 2, false]);
  assert.equal(coverageText(partial), 'worked solutions to 5 of the 30 questions on this paper; the rest are not yet covered.');
});

test('every solution has all fields and the right module', () => {
  for (const paper of examSolutionsData) {
    for (const q of allQuestions(paper)) {
      const id = `${paper.paperId} Q${q.qNo}`;
      for (const f of ['questionText', 'syllabusRef', 'schemeRubric', 'conciseAnswer', 'detailedAnswer']) {
        assert.ok(typeof q[f] === 'string' && q[f].trim().length > 10, `${id} ${f} is empty`);
      }
      assert.ok(Number.isInteger(q.module) && q.module >= 1 && q.module <= 5, `${id} module`);
      assert.ok(q.marks > 0, `${id} marks`);
      assert.ok(q.detailedAnswer.length > q.conciseAnswer.length, `${id} detailed answer should be longer than the concise one`);
      const n = parseInt(q.qNo, 10);
      if (n >= 11) assert.equal(q.module, Math.ceil((n - 10) / 2), `${id} module should follow the question number`);
    }
  }
});

test('mark totals match the papers: Part A 10 x 3, each Part B pair 14, one per module gives 100', () => {
  for (const paper of examSolutionsData) {
    const qs = allQuestions(paper);
    const partA = qs.filter(q => typeof q.qNo === 'number');
    assert.equal(partA.length, 10);
    assert.ok(partA.every(q => q.marks === 3), `${paper.paperId} Part A marks`);
    for (let n = 11; n <= 20; n++) {
      const a = qs.find(q => q.qNo === `${n}a`);
      const b = qs.find(q => q.qNo === `${n}b`);
      assert.equal(a.marks + b.marks, 14, `${paper.paperId} Q${n} a+b`);
    }
    assert.equal(30 + 5 * 14, paper.totalMarks);
  }
});

test('Part B fenced diagrams are balanced and no solution contains a raw tilde fence', () => {
  for (const paper of examSolutionsData) {
    for (const q of allQuestions(paper)) {
      const fences = (q.detailedAnswer.match(/^\s*```/gm) || []).length;
      assert.equal(fences % 2, 0, `${paper.paperId} Q${q.qNo} has an unclosed code fence`);
      assert.ok(!/^\s*~~~/m.test(q.detailedAnswer), `${paper.paperId} Q${q.qNo} has a ~~~ fence`);
    }
  }
});

test('every numerical and algorithmic answer is reproduced by scripts/verify_solutions.js', () => {
  const results = runChecks();
  assert.ok(results.length >= 80, `expected at least 80 checks, got ${results.length}`);
  const failures = results.filter(r => !r.ok);
  assert.deepEqual(failures.map(r => `${r.id}: ${r.detail}`), []);
});

test('the CRC, parity and stuffing helpers reproduce the textbook answers', () => {
  // Dec 2023 Q14b: 10011101 with x^3 + 1
  assert.deepEqual(crcCodeword('10011101', '1001'), { remainder: '100', codeword: '10011101100' });
  assert.equal(crcDivide('10011101000', '1001').quotient, '10001100');
  assert.equal(crcDivide('10011101100', '1001').remainder, '000');
  // a flipped bit is detected
  assert.notEqual(crcDivide('10011101101', '1001').remainder, '000');
  // Dec 2022 Q14a / Dec 2023 Q13a bit stuffing round-trips
  for (const data of ['0111110111111011111', '01101111110111110', '11111111', '0']) {
    assert.equal(bitUnstuff(bitStuff(data)), data);
    assert.ok(!bitStuff(data).includes('111111'), 'stuffed data must not contain six 1s');
  }
});

test('README and the Overview page state the same coverage as the data', () => {
  const summary = coverageSummary(examSolutionsData);
  assert.ok(summary.complete);
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(readme, /30 of 30 questions on each of the December 2022 and December 2023 papers/);
  assert.ok(!/16 of (the )?30|5 of 30|selected questions/i.test(readme), 'README still describes partial coverage');
  assert.ok(html.includes(`id="stat-solved-questions">${summary.solved}<`), 'static fallback of the Overview counter should equal the data');
  assert.ok(html.includes('Worked solutions to every question of the KTU December 2022 and December 2023 papers'));
  assert.ok(!/selected (past-paper )?questions/i.test(html), 'index.html still describes partial coverage');
});
