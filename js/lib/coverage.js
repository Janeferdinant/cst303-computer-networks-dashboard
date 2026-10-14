// Past-paper coverage counts, derived from js/data/examSolutionsData.js so that no number in the
// UI is typed by hand. Pure functions, covered by tests/solutions.test.js.

/** Questions with a worked solution on one paper, against the questions printed on it. */
export function paperCoverage(paper) {
  const solved = paper.sections.reduce((n, s) => n + s.questions.length, 0);
  const total = Number.isInteger(paper.questionsInPaper) ? paper.questionsInPaper : solved;
  const partA = paper.sections.filter(s => s.sectionName.startsWith('PART A')).reduce((n, s) => n + s.questions.length, 0);
  const partB = solved - partA;
  return {
    paperId: paper.paperId,
    label: (paper.examTitle.match(/(January|February|March|April|May|June|July|August|September|October|November|December) \d{4}/) || [paper.examTitle])[0],
    solved,
    total,
    partA,
    partB,
    complete: solved >= total
  };
}

/** Totals across all papers. */
export function coverageSummary(papers) {
  const perPaper = papers.map(paperCoverage);
  const solved = perPaper.reduce((n, p) => n + p.solved, 0);
  const total = perPaper.reduce((n, p) => n + p.total, 0);
  return { perPaper, solved, total, papers: perPaper.length, complete: perPaper.every(p => p.complete) };
}

/** One-line coverage statement for a paper (plain text). */
export function coverageText(paper) {
  const c = paperCoverage(paper);
  if (c.complete) {
    return `all ${c.total} questions on this paper have worked solutions (${c.partA} in Part A and ${c.partB} in Part B; in the exam you answer one question from each module's pair in Part B).`;
  }
  return `worked solutions to ${c.solved} of the ${c.total} questions on this paper; the rest are not yet covered.`;
}
