// INDUSTRY TOOLS, CAREER ROLES & SALARY EXPLORER
// Accurate market compensation for India (Kerala IT Hubs) & Global tech ecosystems

import { industryToolsData, careerRolesData } from '../data/careerData.js';

export class CareerSalaryExplorer {
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
          <span class="iridescent-badge">Industry Alignment & Careers</span>
          <h2 class="section-title">Industry Tools & Salary Market Explorer</h2>
          <p class="section-desc">Practical guide to the software tools used by network architects, job roles, required skill sets, and realistic compensation ranges in Kerala & global markets.</p>
        </div>
      </div>

      <!-- Section 1: Industry Tool Stacks -->
      <h3 style="font-size:1.35rem; font-weight:700; margin-bottom:1.25rem; color:var(--text-main);">
        1. Industry Technology Stack & Tools
      </h3>
      <div class="glass-card" style="padding:0; overflow:hidden; margin-bottom:2.5rem;">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Tool Name</th>
              <th>Category & Layer</th>
              <th>Core Industry Purpose</th>
              <th>Why It Is Essential</th>
              <th>License</th>
              <th>Documentation</th>
            </tr>
          </thead>
          <tbody>
            ${industryToolsData.map(t => `
              <tr>
                <td><strong style="color:var(--accent-cyan); font-size:1rem;">${t.name}</strong></td>
                <td>
                  <span class="exam-badge">${t.category}</span>
                  <div style="font-size:0.75rem; color:var(--text-dim); margin-top:0.2rem;">${t.layer}</div>
                </td>
                <td style="font-size:0.85rem; color:var(--text-muted);">${t.purpose}</td>
                <td style="font-size:0.85rem; color:var(--text-muted);">${t.whyUsed}</td>
                <td style="font-size:0.78rem; color:var(--accent-amber); font-weight:600;">${t.license}</td>
                <td>
                  <a href="${t.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-glass" style="font-size:0.75rem; padding:0.35rem 0.75rem;">
                    Docs ↗
                  </a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Section 2: Career Roles & Salary Insights -->
      <h3 style="font-size:1.35rem; font-weight:700; margin-bottom:1.25rem; color:var(--text-main);">
        2. Career Roles & Verified Salary Ranges (Kerala & India Focus)
      </h3>
      <div style="display:flex; flex-direction:column; gap:1.75rem;">
        ${careerRolesData.map(role => `
          <div class="glass-card">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
              <div>
                <span class="iridescent-badge">Role Profile</span>
                <h4 style="font-size:1.3rem; font-weight:700; color:var(--text-main); margin-top:0.3rem;">${role.title}</h4>
              </div>
              <span class="exam-badge" style="background:rgba(56,189,248,0.15); color:var(--accent-cyan);">
                ${role.salaryData.location}
              </span>
            </div>

            <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.25rem;">${role.overview}</p>

            <!-- Salary Comparison Grid -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; margin-bottom:1.25rem;">
              <div style="padding:1rem; background:rgba(0,0,0,0.25); border-radius:8px; border:1px solid var(--glass-border);">
                <span style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase;">Entry-Level (0-2 Yrs)</span>
                <p class="font-mono" style="font-size:1.15rem; font-weight:800; color:var(--accent-cyan); margin-top:0.2rem;">${role.salaryData.entryLevel}</p>
              </div>
              <div style="padding:1rem; background:rgba(0,0,0,0.25); border-radius:8px; border:1px solid var(--glass-border);">
                <span style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase;">Mid-Level (3-6 Yrs)</span>
                <p class="font-mono" style="font-size:1.15rem; font-weight:800; color:var(--accent-purple); margin-top:0.2rem;">${role.salaryData.midLevel}</p>
              </div>
              <div style="padding:1rem; background:rgba(0,0,0,0.25); border-radius:8px; border:1px solid var(--glass-border);">
                <span style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase;">Senior / Lead (7+ Yrs)</span>
                <p class="font-mono" style="font-size:1.15rem; font-weight:800; color:var(--accent-emerald); margin-top:0.2rem;">${role.salaryData.seniorLevel}</p>
              </div>
              <div style="padding:1rem; background:rgba(0,0,0,0.25); border-radius:8px; border:1px solid var(--glass-border);">
                <span style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase;">Global Comparison</span>
                <p class="font-mono" style="font-size:0.95rem; font-weight:700; color:var(--accent-amber); margin-top:0.2rem;">${role.salaryData.globalComparison}</p>
              </div>
            </div>

            <!-- Skills & Employers -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; font-size:0.85rem; margin-top:1rem;">
              <div>
                <strong style="color:var(--accent-cyan); display:block; margin-bottom:0.4rem;">Mandatory Core Technical Skills:</strong>
                <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
                  ${role.coreSkills.map(s => `<span class="exam-badge">${s}</span>`).join('')}
                </div>
                <strong style="color:var(--accent-purple); display:block; margin-top:0.8rem; margin-bottom:0.4rem;">Preferred / Recommended Certifications:</strong>
                <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
                  ${role.certifications.map(c => `<span class="exam-badge marks-badge">${c}</span>`).join('')}
                </div>
              </div>
              <div>
                <strong style="color:var(--accent-emerald); display:block; margin-bottom:0.4rem;">Major Employers in Kerala (Kochi Infopark & TVM Technopark):</strong>
                <ul style="list-style:none; display:flex; flex-direction:column; gap:0.3rem; color:var(--text-muted);">
                  ${role.topEmployersInKerala.map(emp => `<li>✔ ${emp}</li>`).join('')}
                </ul>
                <div style="margin-top:0.8rem; font-size:0.75rem; color:var(--text-dim);">
                  <strong>Data Source:</strong> ${role.salaryData.sources}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}
