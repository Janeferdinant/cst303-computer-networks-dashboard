// Renders the small Markdown + TeX subset used in js/data/examSolutionsData.js:
// fenced code blocks, pipe tables, "-" and "1." lists, **bold**, *italic*, `code`,
// inline $...$ and display $$...$$ maths.
//
// TeX is rendered with KaTeX (window.katex, loaded from a pinned CDN build in
// index.html). If KaTeX is not available, the TeX source is shown as code instead.
// The renderer is a pure function of its inputs, so it can be tested with `node --test`.

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, ch => ESCAPES[ch]);
}

export function katexRenderer(tex, displayMode) {
  const katex = typeof window !== 'undefined' ? window.katex : undefined;
  if (katex && typeof katex.renderToString === 'function') {
    return katex.renderToString(tex, { displayMode, throwOnError: false });
  }
  return displayMode
    ? `<pre class="font-mono tex-fallback">${escapeHtml(tex)}</pre>`
    : `<code class="font-mono tex-fallback">${escapeHtml(tex)}</code>`;
}

// Private-use characters delimit placeholders; they never occur in the data.
const PH_OPEN = '';
const PH_CLOSE = '';
const TOKEN_RE = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$|`([^`\n]+)`/g;
const PH_RE = new RegExp(`${PH_OPEN}(\\d+)${PH_CLOSE}`, 'g');

const CODE_STYLE = 'background:rgba(255,255,255,0.08); padding:0.15rem 0.4rem; border-radius:4px; font-size:0.85rem; color:var(--accent-cyan);';
const PRE_STYLE = 'background:rgba(0,0,0,0.4); padding:0.8rem; border-radius:6px; overflow-x:auto; margin:0.8rem 0; font-size:0.82rem; line-height:1.4;';

/** Inline formatting: maths, code spans, bold and italic. Escapes all other HTML. */
export function renderInline(text, renderMath = katexRenderer) {
  if (text === undefined || text === null) return '';
  const pieces = [];
  let s = String(text).replace(TOKEN_RE, (match, display, inline, code) => {
    let html;
    if (display !== undefined) html = renderMath(display.trim(), true);
    else if (inline !== undefined) html = renderMath(inline.trim(), false);
    else html = `<code class="font-mono" style="${CODE_STYLE}">${escapeHtml(code)}</code>`;
    pieces.push(html);
    return `${PH_OPEN}${pieces.length - 1}${PH_CLOSE}`;
  });

  s = escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*\w])\*(?=\S)([^*\n]+?)(?<=\S)\*(?![*\w])/g, '$1<em>$2</em>');

  return s.replace(PH_RE, (_, i) => pieces[Number(i)]);
}

function splitRow(line) {
  let row = line.trim();
  if (row.startsWith('|')) row = row.slice(1);
  if (row.endsWith('|')) row = row.slice(0, -1);
  return row.split('|').map(cell => cell.trim());
}

const TABLE_SEPARATOR_RE = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/;
const UL_RE = /^\s*[-*]\s+(.*)$/;
const OL_RE = /^\s*\d+\.\s+(.*)$/;
const OL_START_RE = /^\s*(\d+)\./;

/** Block formatting: paragraphs, code fences, tables and lists. */
export function renderRichText(text, renderMath = katexRenderer) {
  if (!text) return '';
  const lines = String(text).replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  let paragraph = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      out.push(`<p>${paragraph.map(l => renderInline(l, renderMath)).join('<br>')}</p>`);
      paragraph = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced code block
    if (line.trim().startsWith('```')) {
      flushParagraph();
      const body = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        body.push(lines[i]);
        i++;
      }
      out.push(`<pre class="font-mono" style="${PRE_STYLE}"><code>${escapeHtml(body.join('\n'))}</code></pre>`);
      continue;
    }

    // Pipe table: header row followed by a |---|---| separator row
    if (line.trim().startsWith('|') && i + 1 < lines.length && TABLE_SEPARATOR_RE.test(lines[i + 1])) {
      flushParagraph();
      const header = splitRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      i--;
      const th = header.map(c => `<th>${renderInline(c, renderMath)}</th>`).join('');
      const trs = rows.map(r => `<tr>${r.map(c => `<td>${renderInline(c, renderMath)}</td>`).join('')}</tr>`).join('');
      out.push(`<div class="md-table-wrap"><table class="md-table"><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table></div>`);
      continue;
    }

    // Lists (consecutive items of the same kind)
    const listMatch = line.match(UL_RE) || line.match(OL_RE);
    if (listMatch) {
      flushParagraph();
      const ordered = !UL_RE.test(line);
      const re = ordered ? OL_RE : UL_RE;
      // Keep the author's numbering when a list is interrupted (e.g. by a $$ line)
      const start = ordered ? Number(line.match(OL_START_RE)[1]) : 1;
      const items = [];
      while (i < lines.length && re.test(lines[i])) {
        items.push(lines[i].match(re)[1]);
        i++;
      }
      i--;
      const open = ordered ? `<ol class="md-list"${start !== 1 ? ` start="${start}"` : ''}>` : '<ul class="md-list">';
      out.push(`${open}${items.map(it => `<li>${renderInline(it, renderMath)}</li>`).join('')}${ordered ? '</ol>' : '</ul>'}`);
      continue;
    }

    if (line.trim() === '') {
      flushParagraph();
      continue;
    }

    paragraph.push(line);
  }
  flushParagraph();
  return out.join('');
}
