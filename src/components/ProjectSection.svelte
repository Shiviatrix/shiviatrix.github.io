<script>
  let { project, index } = $props();

  const devanagariNumerals = ['१', '२', '३', '४', '५', '६'];
</script>

<article class="project-item" id={project.id}>
  <header class="project-header">
    <div class="numeral-row">
      <span class="deva-numeral">{devanagariNumerals[index] || (index + 1)}</span>
      <span class="deva-script-sub">{project.subTitleDeva}</span>
    </div>

    <h2 class="project-title">{project.title}</h2>
    <div class="project-meta">{project.meta}</div>
  </header>

  <div class="project-body">
    {#each project.paragraphs as paragraph}
      <p class="body-paragraph">{@html paragraph}</p>
    {/each}
  </div>

  <footer class="project-links">
    {#each project.links as link}
      <a
        href={link.url}
        class="minimal-link-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{link.label}</span>
        <span class="arrow-glyph">↗</span>
      </a>
    {/each}
  </footer>
</article>

<style>
  .project-item {
    padding: 2.25rem 0;
    border-bottom: var(--border-subtle);
    position: relative;
    transition: border-color 0.2s ease;
  }

  .project-item:first-child {
    padding-top: 0;
  }

  .project-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .project-header {
    margin-bottom: 1.25rem;
  }

  .numeral-row {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    margin-bottom: 0.35rem;
  }

  .deva-numeral {
    font-family: var(--font-serif);
    font-size: 0.95rem;
    color: var(--c-terracotta);
    font-weight: 600;
  }

  .deva-script-sub {
    font-family: var(--font-serif);
    font-size: 0.82rem;
    color: var(--c-clay);
    letter-spacing: 0.04em;
  }

  .project-title {
    font-family: var(--font-serif);
    font-size: 1.45rem;
    font-weight: 600;
    color: var(--c-sand);
    letter-spacing: 0.02em;
    line-height: 1.25;
    margin-bottom: 0.35rem;
  }

  .project-meta {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--c-brass);
    letter-spacing: 0.03em;
  }

  .project-body {
    margin-bottom: 1.25rem;
  }

  .body-paragraph {
    font-size: 0.96rem;
    line-height: 1.65;
    color: #cfc5b8;
    margin-bottom: 0.85rem;
  }

  .body-paragraph:last-child {
    margin-bottom: 0;
  }

  :global(.body-paragraph strong) {
    color: var(--c-sand);
    font-weight: 600;
  }

  .project-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .minimal-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    padding: 5px 12px;
    background: transparent;
    color: var(--c-sand);
    border: var(--border-hairline);
    border-radius: 2px;
    transition: all 0.15s ease;
  }

  .arrow-glyph {
    font-size: 0.85rem;
    color: var(--c-brass);
    transition: transform 0.15s ease;
  }

  .minimal-link-btn:hover {
    border-color: var(--c-terracotta);
    color: #ffffff;
    background: rgba(192, 86, 56, 0.08);
  }

  .minimal-link-btn:hover .arrow-glyph {
    transform: translate(2px, -2px);
    color: var(--c-terracotta);
  }
</style>
