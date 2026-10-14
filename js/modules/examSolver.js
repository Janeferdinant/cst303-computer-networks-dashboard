// QUESTION-PAPER SOLVER
// Worked solutions to every question of the KTU CST303 December 2022 and December 2023 papers

import { examSolutionsData } from '../data/examSolutionsData.js';
import { renderRichText, renderInline } from '../lib/richText.js';
import { coverageText } from '../lib/coverage.js';

export class ExamSolver {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentPaperId = 'cst303-dec2022';
    this.currentModuleFilter = 'all';
    this.viewMode = 'detailed'; // 'detailed' or 'concise'
    this.completedQuestions = new Set(JSON.parse(localStorage.getItem('cst303_mastered_qs') || '[]'));

    if (this.container) {
      this.render();
    }
  }

  render() {
    const paper = examSolutionsData.find(p => p.paperId === this.currentPaperId) || examSolutionsData[0];

    this.container.innerHTML = `
      <div class="section-header">
        <div>
          <span class="iridescent-badge">Worked Solutions</span>
          <h2 class="section-title">Question-Paper Solver</h2>
          <p class="section-desc">Worked solutions to the APJ Abdul Kalam Technological University (KTU) CST303 December 2022 and December 2023 papers, with marking notes that follow the KTU valuation schemes.</p>
        </div>
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap; align-items:center;">
          <select id="exam-paper-select" class="btn btn-glass font-mono" style="padding:0.6rem 1rem;">
            ${examSolutionsData.map(p => `
              <option value="${p.paperId}" ${p.paperId === this.currentPaperId ? 'selected' : ''}>${p.examTitle.substring(0, 42)}...</option>
            `).join('')}
          </select>
          <button class="btn btn-outline" id="toggle-view-mode-btn">
            ${this.viewMode === 'detailed' ? 'Switch to Concise Revision' : 'Switch to Detailed Solutions'}
          </button>
          <button class="btn btn-primary" id="print-exam-btn">
            Print / Export PDF
          </button>
        </div>
      </div>

      <!-- Exam Metadata Card -->
      <div class="glass-card" style="margin-bottom:1.75rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <h3 style="font-size:1.25rem; font-weight:700; color:var(--text-main);">${paper.examTitle}</h3>
            <p style="font-size:0.85rem; color:var(--text-muted);">${paper.subject} • Paper Code: <span class="font-mono">${paper.paperCode}</span> • Max Marks: ${paper.totalMarks} • Duration: ${paper.duration}</p>
          </div>
          <div>
            <span class="exam-badge" style="background:rgba(16,185,129,0.15); color:var(--accent-emerald);">
              Mastered: ${this.completedQuestions.size} Questions
            </span>
          </div>
        </div>
        <div style="margin-top:0.85rem; font-size:0.78rem; color:var(--text-dim);">
          <strong>Marking reference:</strong> ${paper.schemeSource}
        </div>
        <div style="margin-top:0.35rem; font-size:0.78rem; color:var(--text-dim);" id="exam-coverage-note">
          <strong>Coverage:</strong> ${coverageText(paper)}
        </div>
      </div>

      <!-- Module Filter Buttons -->
      <div class="tab-nav" id="exam-module-filters">
        <button class="tab-btn ${this.currentModuleFilter === 'all' ? 'active' : ''}" data-mod="all">All Modules</button>
        <button class="tab-btn ${this.currentModuleFilter === '1' ? 'active' : ''}" data-mod="1">Module 1</button>
        <button class="tab-btn ${this.currentModuleFilter === '2' ? 'active' : ''}" data-mod="2">Module 2</button>
        <button class="tab-btn ${this.currentModuleFilter === '3' ? 'active' : ''}" data-mod="3">Module 3</button>
        <button class="tab-btn ${this.currentModuleFilter === '4' ? 'active' : ''}" data-mod="4">Module 4</button>
        <button class="tab-btn ${this.currentModuleFilter === '5' ? 'active' : ''}" data-mod="5">Module 5</button>
      </div>

      <!-- Questions Container -->
      <div id="questions-list-container" style="display:flex; flex-direction:column; gap:1.5rem;">
        ${this.renderQuestions(paper)}
      </div>
    `;

    this.attachEvents();
  }

  renderQuestions(paper) {
    let html = '';

    paper.sections.forEach(sec => {
      const filtered = sec.questions.filter(q => {
        if (this.currentModuleFilter === 'all') return true;
        return q.module.toString() === this.currentModuleFilter;
      });

      if (filtered.length === 0) return;

      html += `
        <div style="margin-top:0.75rem;">
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--accent-cyan); margin-bottom:1rem; border-bottom:1px solid var(--glass-border); padding-bottom:0.4rem;">
            ${sec.sectionName}
          </h3>
          <div style="display:flex; flex-direction:column; gap:1.25rem;">
            ${filtered.map(q => {
              const qKey = `${paper.paperId}_q${q.qNo}`;
              const isMastered = this.completedQuestions.has(qKey);

              return `
                <div class="glass-card exam-q-card" id="q-card-${q.qNo}">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.8rem; flex-wrap:wrap; gap:0.5rem;">
                    <div style="display:flex; align-items:center; gap:0.75rem;">
                      <span class="exam-badge">Q. ${q.qNo}</span>
                      <span class="exam-badge marks-badge">${q.marks} Marks</span>
                      <span class="iridescent-badge">Module ${q.module}</span>
                    </div>
                    <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.8rem; cursor:pointer; color:var(--text-muted);">
                      <input type="checkbox" class="master-checkbox" data-key="${qKey}" ${isMastered ? 'checked' : ''}>
                      <span>Mark Mastered</span>
                    </label>
                  </div>

                  <h4 style="font-size:1.1rem; font-weight:600; color:var(--text-main); line-height:1.5; margin-bottom:0.75rem;">
                    ${renderInline(q.questionText)}
                  </h4>

                  <div style="display:flex; gap:1rem; font-size:0.78rem; color:var(--text-dim); margin-bottom:1rem; flex-wrap:wrap;">
                    <span><strong>Syllabus Reference:</strong> ${renderInline(q.syllabusRef)}</span>
                    <span><strong>Marking Notes:</strong> <span style="color:var(--accent-amber);">${renderInline(q.schemeRubric)}</span></span>
                  </div>

                  <!-- Model Answer Area -->
                  <div class="solution-box">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
                      <span style="font-weight:700; font-size:0.85rem; color:var(--accent-emerald);">
                        ${this.viewMode === 'detailed' ? 'MODEL ANSWER & WORKING' : 'CONCISE REVISION SUMMARY'}
                      </span>
                    </div>
                    <div style="font-size:0.9rem; line-height:1.7; color:var(--text-main);">
                      ${this.viewMode === 'detailed' ? renderRichText(q.detailedAnswer) : `<p>${renderInline(q.conciseAnswer)}</p>`}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    return html;
  }

  attachEvents() {
    // Paper select
    const paperSelect = document.getElementById('exam-paper-select');
    if (paperSelect) {
      paperSelect.addEventListener('change', (e) => {
        this.currentPaperId = e.target.value;
        this.render();
      });
    }

    // Toggle view mode
    const viewBtn = document.getElementById('toggle-view-mode-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', () => {
        this.viewMode = this.viewMode === 'detailed' ? 'concise' : 'detailed';
        this.render();
      });
    }

    // Print
    const printBtn = document.getElementById('print-exam-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Module filters
    const filterNav = document.getElementById('exam-module-filters');
    if (filterNav) {
      filterNav.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;
        this.currentModuleFilter = btn.dataset.mod;
        this.render();
      });
    }

    // Mastered Checkboxes
    document.querySelectorAll('.master-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const key = e.target.dataset.key;
        if (e.target.checked) {
          this.completedQuestions.add(key);
        } else {
          this.completedQuestions.delete(key);
        }
        localStorage.setItem('cst303_mastered_qs', JSON.stringify([...this.completedQuestions]));
      });
    });
  }
}
