<script>
  import { projects } from './data/projects.js';
  import ProjectSection from './components/ProjectSection.svelte';
  import { onMount } from 'svelte';

  let activeSection = $state('');

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    projects.forEach((p) => {
      const el = document.getElementById(p.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  });
</script>

<div class="layout-wrapper">
  <div class="container">
    <aside class="sidebar">
      <div class="identity-block">
        <h1 class="author-name">Akshit Sivaraman</h1>
        <p class="author-subtext">अक्षित शिवरामन</p>
        <p class="author-bio">Computer science engineering</p>
      </div>

      <div class="contact-block">
        <p>
          <a href="mailto:shiviatrix@protonmail.com" class="contact-link">
            shiviatrix (at) protonmail (dot) com
          </a>
        </p>
        <p class="contact-phone">+91 6382124901</p>
        <p>
          <a
            href="https://github.com/Shiviatrix"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-link"
          >
            github.com/Shiviatrix
          </a>
        </p>
      </div>

      <nav class="toc-nav" aria-label="Index of Works">
        <h2 class="toc-heading">Index of Works</h2>
        <ul class="toc-list">
          {#each projects as project, i}
            <li>
              <a
                href="#{project.id}"
                class="toc-link {activeSection === project.id ? 'active-toc-link' : ''}"
              >
                <span class="toc-dot"></span>
                <span class="toc-title-text">{project.title}</span>
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </aside>

    <main class="content-stream">
      {#each projects as project, i (project.id)}
        <ProjectSection {project} index={i} />
      {/each}
    </main>
  </div>
</div>

<style>
  .layout-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }


  .container {
    max-width: 1080px;
    width: 100%;
    margin: 0 auto;
    padding: 3.5rem 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  @media (min-width: 820px) {
    .container {
      grid-template-columns: 310px 1fr;
      gap: 4.5rem;
      padding: 4.5rem 2rem;
    }
  }

  .sidebar {
    position: relative;
  }

  @media (min-width: 820px) {
    .sidebar {
      position: sticky;
      top: 3.5rem;
      align-self: start;
    }
  }

  .identity-block {
    margin-bottom: 2rem;
  }

  .author-name {
    font-family: var(--font-serif);
    font-size: 1.65rem;
    font-weight: 600;
    color: var(--c-sand);
    letter-spacing: 0.02em;
    line-height: 1.2;
    margin-bottom: 0.2rem;
  }

  .author-subtext {
    font-family: var(--font-serif);
    font-size: 0.85rem;
    color: var(--c-terracotta);
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }

  .author-bio {
    font-size: 0.95rem;
    color: var(--c-clay);
    line-height: 1.5;
  }

  .contact-block {
    margin-bottom: 2.5rem;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .contact-link {
    color: var(--c-clay);
    border-bottom: 1px dotted rgba(197, 160, 89, 0.3);
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .contact-link:hover {
    color: var(--c-sand);
    border-color: var(--c-terracotta);
  }

  .contact-phone {
    color: var(--c-clay);
  }

  .toc-nav {
    border-top: var(--border-subtle);
    padding-top: 1.75rem;
  }

  .toc-heading {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--c-brass);
    margin-bottom: 1rem;
  }

  .toc-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .toc-link {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.88rem;
    color: var(--c-clay);
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .toc-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid var(--c-clay);
    transition: all 0.15s ease;
    flex-shrink: 0;
  }

  .toc-link:hover {
    color: var(--c-sand);
    transform: translateX(3px);
  }

  .toc-link:hover .toc-dot {
    border-color: var(--c-terracotta);
    background: var(--c-terracotta);
  }

  .active-toc-link {
    color: var(--c-sand);
    font-weight: 500;
  }

  .active-toc-link .toc-dot {
    background: var(--c-kesar);
    border-color: var(--c-kesar);
    box-shadow: 0 0 6px rgba(217, 119, 6, 0.6);
  }

  .content-stream {
    display: flex;
    flex-direction: column;
  }
</style>
