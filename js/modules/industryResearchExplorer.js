// INDUSTRY RESEARCH & REAL-WORLD ADVANCEMENTS EXPLORER
// Verified Peer-Reviewed Papers, Industry Standards, and Case Studies

import { realWorldAppsData, techAdvancementsData, researchPapersData } from '../data/industryResearchData.js';

export class IndustryResearchExplorer {
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
          <span class="iridescent-badge">Industry & Research Intelligence</span>
          <h2 class="section-title">Research Papers & Real-World Deployments</h2>
          <p class="section-desc">Connecting theoretical networking foundations with production hyperscale architectures, IEEE/ACM publications, and modern protocols.</p>
        </div>
      </div>

      <!-- Real-World Engineering Case Studies -->
      <h3 style="font-size:1.35rem; font-weight:700; margin-bottom:1.25rem; color:var(--text-main);">
        1. Hyperscale Production Applications
      </h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(360px, 1fr)); gap:1.5rem; margin-bottom:2.5rem;">
        ${realWorldAppsData.map(app => `
          <div class="glass-card">
            <span class="iridescent-badge" style="margin-bottom:0.6rem;">${app.industry}</span>
            <h4 style="font-size:1.2rem; font-weight:700; color:var(--text-main); margin-bottom:0.75rem;">${app.title}</h4>
            
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">
              <strong style="color:var(--accent-rose);">Problem Solved:</strong> ${app.problem}
            </p>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">
              <strong style="color:var(--accent-cyan);">Technical Approach:</strong> ${app.technicalApproach}
            </p>
            
            <div style="padding:0.75rem; background:rgba(0,0,0,0.25); border-radius:6px; margin-bottom:0.75rem; font-size:0.82rem;">
              <strong style="color:var(--accent-emerald);">Measured Impact:</strong> ${app.metrics}
            </div>

            <p style="font-size:0.8rem; color:var(--text-dim); margin-bottom:1rem;">
              <strong>Limitations:</strong> ${app.limitations}
            </p>

            <a href="${app.referenceUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size:0.78rem; padding:0.4rem 0.8rem;">
              Technical Case Study ↗
            </a>
          </div>
        `).join('')}
      </div>

      <!-- Latest Technological Advancements -->
      <h3 style="font-size:1.35rem; font-weight:700; margin-bottom:1.25rem; color:var(--text-main);">
        2. Latest Technology Advancements & Standards
      </h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:1.5rem; margin-bottom:2.5rem;">
        ${techAdvancementsData.map(tech => `
          <div class="glass-card">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.78rem;">
              <span class="exam-badge">${tech.releaseDate}</span>
            </div>
            <h4 style="font-size:1.15rem; font-weight:700; color:var(--accent-cyan); margin-bottom:0.6rem;">${tech.name}</h4>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.6rem;">
              <strong>Core Innovation:</strong> ${tech.keyInnovation}
            </p>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.6rem;">
              <strong>Compared to Legacy:</strong> ${tech.comparisonToEarlier}
            </p>
            <p style="font-size:0.8rem; color:var(--text-dim); margin-bottom:1rem;">
              <strong>Use Cases:</strong> ${tech.useCases}
            </p>
            <a href="${tech.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-glass" style="font-size:0.78rem; padding:0.4rem 0.8rem;">
              Official Specification ↗
            </a>
          </div>
        `).join('')}
      </div>

      <!-- Research Paper Explorer -->
      <h3 style="font-size:1.35rem; font-weight:700; margin-bottom:1.25rem; color:var(--text-main);">
        3. Peer-Reviewed Research Papers (Foundational & Next-Gen)
      </h3>
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        ${researchPapersData.map(p => `
          <div class="glass-card">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem; flex-wrap:wrap; gap:0.5rem;">
              <div>
                <span class="exam-badge marks-badge">${p.year}</span>
                <span class="exam-badge" style="margin-left:0.4rem;">${p.isOpenAccess ? 'Open Access Available' : 'IEEE/ACM Archive'}</span>
                <h4 style="font-size:1.2rem; font-weight:700; color:var(--text-main); margin-top:0.4rem;">${p.title}</h4>
                <p style="font-size:0.85rem; color:var(--text-muted);">${p.authors} • <em>${p.venue}</em></p>
              </div>
              <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size:0.78rem; padding:0.45rem 0.85rem;">
                DOI: ${p.doi} ↗
              </a>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-top:1rem; font-size:0.85rem;">
              <div style="padding:0.8rem; background:rgba(0,0,0,0.2); border-radius:6px;">
                <strong style="color:var(--accent-cyan); display:block; margin-bottom:0.25rem;">Research Problem:</strong>
                <p style="color:var(--text-muted);">${p.problem}</p>
              </div>
              <div style="padding:0.8rem; background:rgba(0,0,0,0.2); border-radius:6px;">
                <strong style="color:var(--accent-purple); display:block; margin-bottom:0.25rem;">Methodology:</strong>
                <p style="color:var(--text-muted);">${p.methodology}</p>
              </div>
              <div style="padding:0.8rem; background:rgba(0,0,0,0.2); border-radius:6px;">
                <strong style="color:var(--accent-emerald); display:block; margin-bottom:0.25rem;">Key Findings:</strong>
                <p style="color:var(--text-muted);">${p.mainFindings}</p>
              </div>
            </div>

            <div style="margin-top:0.85rem; font-size:0.78rem; color:var(--text-dim);">
              <strong>Syllabus Relevance:</strong> ${p.futureWorkRelevance}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}
