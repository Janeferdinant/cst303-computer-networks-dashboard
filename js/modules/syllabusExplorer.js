// SYLLABUS & LAB CURRICULUM EXPLORER
// Interactive view for KTU CST303 Course Modules & Lab Experiments

import { syllabusData } from '../data/syllabusData.js';
import { renderInline } from '../lib/richText.js';

export class SyllabusExplorer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (this.container) {
      this.render();
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="section-header">
        <div>
          <span class="iridescent-badge">KTU B.Tech CSE (2019 Scheme)</span>
          <h2 class="section-title">Course & Syllabus Explorer</h2>
          <p class="section-desc">Comprehensive curriculum breakdown of ${syllabusData.courseCode}: ${syllabusData.courseName} (${syllabusData.credits} Credits) and PCCSL507 Networks Laboratory.</p>
        </div>
        <div style="display:flex; gap:0.6rem;">
          <input type="text" id="syllabus-search-input" placeholder="Search topics (e.g. OSPF, CRC)..." class="search-box" style="width:240px; padding:0.5rem 1rem;">
        </div>
      </div>

      <!-- Course Outcomes Card -->
      <div class="glass-card" style="margin-bottom:2rem;">
        <h3 style="color:var(--accent-cyan); margin-bottom:1rem; font-size:1.15rem;">Course Outcomes (COs) & Bloom's Taxonomy Mapping</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
          ${syllabusData.courseOutcomes.map(co => `
            <div style="padding:1rem; border-radius:8px; background:rgba(255,255,255,0.03); border:1px solid var(--glass-border);">
              <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
                <span class="exam-badge">${co.code}</span>
                <span style="font-size:0.75rem; color:var(--accent-purple); font-weight:600;">Bloom's: ${co.blooms}</span>
              </div>
              <p style="font-size:0.85rem; color:var(--text-muted);">${co.text}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Modules List -->
      <h3 style="font-size:1.4rem; font-weight:700; margin-bottom:1.25rem;">Core Theory Modules (Modules 1 to 5)</h3>
      <div id="modules-container" style="display:flex; flex-direction:column; gap:1.25rem; margin-bottom:2.5rem;">
        ${syllabusData.modules.map(mod => `
          <div class="glass-card module-card" data-title="${mod.title.toLowerCase()}" data-desc="${mod.description.toLowerCase()}">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
              <div>
                <span class="iridescent-badge" style="margin-bottom:0.4rem;">Module ${mod.number} • ${mod.hours} Lecture Hours</span>
                <h4 style="font-size:1.25rem; font-weight:700; color:var(--text-main);">${mod.title}</h4>
              </div>
            </div>
            <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.25rem;">${mod.description}</p>
            
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.85rem;">
              ${mod.topics.map(t => `
                <div style="padding:0.9rem; background:rgba(0,0,0,0.2); border-radius:6px; border:1px solid var(--glass-border);">
                  <strong style="color:var(--accent-cyan); font-size:0.9rem; display:block; margin-bottom:0.25rem;">${t.name}</strong>
                  <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.4rem;">${renderInline(t.details)}</p>
                  <span class="font-mono" style="font-size:0.72rem; color:var(--text-dim); display:block;">Ref: ${t.textbookRef}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Lab Experiments -->
      <h3 style="font-size:1.4rem; font-weight:700; margin-bottom:1.25rem;">PCCSL507 Networks Laboratory Practicals</h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(340px, 100%), 1fr)); gap:1.5rem;">
        ${syllabusData.labExperiments.map(exp => `
          <div class="glass-card">
            <span class="exam-badge marks-badge" style="margin-bottom:0.5rem; display:inline-block;">Experiment ${exp.expNo}</span>
            <h4 style="font-size:1.2rem; font-weight:700; color:var(--text-main); margin-bottom:0.5rem;">${exp.title}</h4>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;"><strong>Aim:</strong> ${exp.aim}</p>
            
            <div style="padding:0.8rem; background:rgba(0,0,0,0.3); border-radius:6px; margin-bottom:1rem;">
              <span style="font-size:0.75rem; color:var(--accent-amber); font-weight:700; display:block; margin-bottom:0.3rem;">KEY CISCO PACKET TRACER COMMANDS:</span>
              <pre class="font-mono" style="font-size:0.78rem; line-height:1.4; color:var(--text-main);">${exp.keyCommands.join('\n')}</pre>
            </div>
            <span class="font-mono" style="font-size:0.72rem; color:var(--text-dim);">Source: ${exp.source}</span>
          </div>
        `).join('')}
      </div>
    `;

    // Live filter search
    const searchInput = document.getElementById('syllabus-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.module-card').forEach(card => {
          const t = card.dataset.title;
          const d = card.dataset.desc;
          if (t.includes(query) || d.includes(query)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }
  }
}
