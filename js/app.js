// MAIN APPLICATION CONTROLLER
// CST303 Computer Networks Interactive 3D Learning Platform
// Author: Jane Rose | Assistant Professor, Department of Computer Science and Engineering

import { ThreeVisualizer } from './modules/threeVisualizer.js';
import { ConceptLab } from './modules/conceptLab.js';
import { MotionGraphicsEngine } from './modules/motionGraphics.js';
import { SyllabusExplorer } from './modules/syllabusExplorer.js';
import { ExamSolver } from './modules/examSolver.js';
import { EducationalGames } from './modules/educationalGames.js';
import { KnowledgeGraphEngine } from './modules/knowledgeGraph.js';
import { IndustryResearchExplorer } from './modules/industryResearchExplorer.js';
import { CareerSalaryExplorer } from './modules/careerSalaryExplorer.js';
import { PortfolioProjectLab } from './modules/portfolioProject.js';
import { examSolutionsData } from './data/examSolutionsData.js';
import { coverageSummary } from './lib/coverage.js';

class NetVerseApp {
  constructor() {
    this.currentView = 'overview';
    this.theme = localStorage.getItem('netverse_theme') || 'dark';
    this.threeVisualizer = null;
    this.motionGraphics = null;
    this.knowledgeGraph = null;
    this.portfolioLab = null;

    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.setupThemeToggle();
    this.setupNavigation();
    this.setupMobileMenu();
    this.setupGlobalSearch();

    // Mount sub-modules
    this.initModules();
  }

  /* Theme Management */
  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('netverse_theme', theme);

    const iconDark = document.getElementById('theme-icon-dark');
    const iconLight = document.getElementById('theme-icon-light');

    if (theme === 'light') {
      if (iconDark) iconDark.style.display = 'none';
      if (iconLight) iconLight.style.display = 'block';
    } else {
      if (iconDark) iconDark.style.display = 'block';
      if (iconLight) iconLight.style.display = 'none';
    }
  }

  setupThemeToggle() {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(nextTheme);
      });
    }
  }

  /* Navigation between sections */
  setupNavigation() {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;

    nav.addEventListener('click', (e) => {
      const item = e.target.closest('.nav-item');
      if (!item) return;
      const target = item.dataset.target;
      if (target) {
        this.navigateTo(target);
        // On mobile, close drawer after click
        const sidebar = document.getElementById('sidebar');
        if (sidebar && window.innerWidth <= 860) {
          sidebar.classList.remove('open');
        }
      }
    });
  }

  navigateTo(viewId) {
    this.currentView = viewId;

    // Update nav links
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.target === viewId);
    });

    // Update view containers
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const activeSec = document.getElementById(`section-${viewId}`);
    if (activeSec) {
      activeSec.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update breadcrumb
    const crumb = document.getElementById('breadcrumb-title');
    if (crumb) {
      const navItem = document.querySelector(`.nav-item[data-target="${viewId}"]`);
      crumb.textContent = navItem ? navItem.querySelector('span').textContent : viewId;
    }

    // Trigger canvas resize when switching to canvas-containing tabs
    if (viewId === 'three-gallery' && this.threeVisualizer) {
      setTimeout(() => this.threeVisualizer.handleResize(), 50);
    } else if (viewId === 'motion-graphics' && this.motionGraphics) {
      setTimeout(() => this.motionGraphics.resizeCanvas(), 50);
    } else if (viewId === 'knowledge-graph' && this.knowledgeGraph) {
      setTimeout(() => this.knowledgeGraph.initEvents(), 50);
    } else if (viewId === 'portfolio-project' && this.portfolioLab) {
      setTimeout(() => this.portfolioLab.initEvents(), 50);
    }
  }

  setupMobileMenu() {
    const toggleBtn = document.getElementById('menu-toggle-btn');
    const sidebar = document.getElementById('sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }
  }

  setupGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;

        if (query.includes('exam') || query.includes('question') || query.includes('solve')) {
          this.navigateTo('exam-solver');
        } else if (query.includes('game') || query.includes('quiz')) {
          this.navigateTo('games');
        } else if (query.includes('3d') || query.includes('fiber') || query.includes('osi')) {
          this.navigateTo('three-gallery');
        } else if (query.includes('crc') || query.includes('subnet') || query.includes('dijkstra')) {
          this.navigateTo('concept-lab');
        } else if (query.includes('salary') || query.includes('career') || query.includes('job')) {
          this.navigateTo('career-salary');
        } else if (query.includes('portfolio') || query.includes('sdn')) {
          this.navigateTo('portfolio-project');
        } else {
          this.navigateTo('syllabus');
        }
      }
    });
  }

  /* Initialize Sub-Modules */
  initModules() {
    // 1. Syllabus Explorer
    new SyllabusExplorer('syllabus-container');

    // 2. Concept Lab
    new ConceptLab();

    // 3. Three.js 3D Visualizer
    if (window.THREE) {
      this.threeVisualizer = new ThreeVisualizer('three-canvas-container');
      this.setupThreeSceneControls();
    }

    // 4. Motion Graphics Engine
    this.motionGraphics = new MotionGraphicsEngine('motion-canvas');
    this.setupMotionControls();

    // 5. Exam Solver
    new ExamSolver('exam-solver-container');
    this.renderCoverageCounters();

    // 6. Educational Games
    new EducationalGames();

    // 7. Knowledge Graph
    this.knowledgeGraph = new KnowledgeGraphEngine('knowledge-graph-canvas');

    // 8, 9, 10. Industry Research & Advancements
    new IndustryResearchExplorer('research-apps-container');
    new IndustryResearchExplorer('tech-advancements-container');
    new IndustryResearchExplorer('research-papers-container');

    // 11, 12. Careers & Tools
    new CareerSalaryExplorer('industry-tools-container');
    new CareerSalaryExplorer('career-salary-container');

    // 13. Portfolio Project Laboratory
    this.portfolioLab = new PortfolioProjectLab('portfolio-topology-canvas');
  }

  /** Past-paper counters on the Overview page come from the data, not from typed numbers. */
  renderCoverageCounters() {
    const summary = coverageSummary(examSolutionsData);
    const stat = document.getElementById('stat-solved-questions');
    if (stat) stat.textContent = String(summary.solved);
    const desc = document.getElementById('exam-card-desc');
    if (desc) {
      const papers = summary.perPaper.map(p => p.label).join(' and ');
      desc.textContent = summary.complete
        ? `Worked solutions to every question of the KTU ${papers} papers`
        : `Worked solutions to ${summary.solved} of the ${summary.total} questions on the KTU ${papers} papers`;
    }
  }

  setupThreeSceneControls() {
    const tabs = document.getElementById('three-scene-tabs');
    const tagText = document.getElementById('three-scene-tag-text');
    const pauseBtn = document.getElementById('three-pause-btn');
    const resetBtn = document.getElementById('three-reset-btn');

    if (tabs && this.threeVisualizer) {
      tabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;
        tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const sceneType = btn.dataset.scene;
        this.threeVisualizer.loadScene(sceneType);
        if (tagText) tagText.textContent = `Active 3D Scene: ${btn.textContent}`;
      });
    }

    if (pauseBtn && this.threeVisualizer) {
      pauseBtn.addEventListener('click', () => {
        const paused = this.threeVisualizer.togglePause();
        pauseBtn.textContent = paused ? 'Resume Animation' : 'Pause Animation';
      });
    }

    if (resetBtn && this.threeVisualizer) {
      resetBtn.addEventListener('click', () => {
        this.threeVisualizer.resetCamera();
      });
    }
  }

  setupMotionControls() {
    const nav = document.getElementById('motion-nav-tabs');
    const playPauseBtn = document.getElementById('motion-play-pause-btn');
    const speedBtn = document.getElementById('motion-speed-btn');

    if (nav && this.motionGraphics) {
      nav.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;
        nav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.motionGraphics.setMode(btn.dataset.motion);
      });
    }

    if (playPauseBtn && this.motionGraphics) {
      playPauseBtn.addEventListener('click', () => {
        this.motionGraphics.isPaused = !this.motionGraphics.isPaused;
        playPauseBtn.textContent = this.motionGraphics.isPaused ? 'Resume Animation' : 'Pause Animation';
      });
    }

    if (speedBtn && this.motionGraphics) {
      speedBtn.addEventListener('click', () => {
        this.motionGraphics.speed = this.motionGraphics.speed === 1 ? 2 : (this.motionGraphics.speed === 2 ? 0.5 : 1);
        speedBtn.textContent = `Speed: ${this.motionGraphics.speed}x`;
      });
    }
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new NetVerseApp();
});
