<script>
  import { corpusStats } from '$lib/corpus.js'

  const stats = corpusStats()

  const modes = [
    {
      href: '/daily',
      eyebrow: 'The Daily',
      title: 'Five questions, ninety seconds',
      body: 'The same five for everyone, every day. Type your answer before you see anything. It exists so the practice actually happens, which is the failure mode that kills every study tool.',
      cta: 'Play today',
      primary: true
    },
    {
      href: '/hot-seat',
      eyebrow: 'The Hot Seat',
      title: 'Defend your numbers to a board',
      body: 'Eight to twelve exchanges with directors who have different specialisms and who escalate when an answer is thin. One of them will quote a benchmark that is not real.',
      cta: 'Take the seat'
    },
    {
      href: '/reference',
      eyebrow: 'Reference',
      title: 'Look anything up',
      body: `All ${stats.cards} metrics with their definitions, formula variants, benchmarks and traps. No account, no network, no grading. Works on a plane.`,
      cta: 'Browse the corpus'
    }
  ]
</script>

<svelte:head>
  <title>The Hot Seat</title>
</svelte:head>

<section class="hero">
  <p class="eyebrow">Recall, not recognition</p>
  <h1>Defend your metrics under questioning.</h1>
  <p class="lede">
    Most people who work with these numbers can recognise a correct definition and cannot produce
    one. That is comfortable right up until somebody asks you across a table.
  </p>
</section>

<section class="stats" aria-label="What is in the corpus">
  <div><strong class="mono">{stats.cards}</strong><span>metrics</span></div>
  <div><strong class="mono">{stats.questions.toLocaleString('en-US')}</strong><span>questions</span></div>
  <div><strong class="mono">{stats.sourced}</strong><span>sourced benchmarks</span></div>
  <div><strong class="mono">{stats.absent}</strong><span>where nobody publishes one</span></div>
</section>

<section class="modes">
  {#each modes as mode (mode.href)}
    <article class="card">
      <p class="eyebrow">{mode.eyebrow}</p>
      <h2>{mode.title}</h2>
      <p class="body">{mode.body}</p>
      <a href={mode.href} class="btn" class:btn-primary={mode.primary}>{mode.cta}</a>
    </article>
  {/each}
</section>

<section class="rubric card">
  <p class="eyebrow">How answers are scored</p>
  <p class="body">
    When a director puts a wrong number in front of you, telling them they are wrong is barely a
    move. In a real room you cannot correct a board member's figure, you can only put a
    better-founded one next to it and then say what you are doing about it.
  </p>
  <ol>
    <li>
      <strong>Anchor your own number, and source it.</strong> A figure you cannot attribute is not an
      anchor.
    </li>
    <li>
      <strong>Bridge to strategy.</strong> Point back at the driver metrics and say what is being done.
      This is worth more than the anchor, and it is the half most people fumble.
    </li>
  </ol>
</section>

<style>
  .hero {
    margin-bottom: var(--gap-xl);
  }
  .hero h1 {
    margin: var(--gap-sm) 0;
    max-width: 16ch;
  }
  .lede {
    color: var(--mid);
    font-size: 1.05rem;
    max-width: 58ch;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--gap);
    padding: var(--gap-lg) 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    margin-bottom: var(--gap-xl);
  }
  .stats div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .stats strong {
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    background: var(--gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .stats span {
    font-size: 0.8rem;
    color: var(--muted);
    line-height: 1.35;
  }

  .modes {
    display: grid;
    gap: var(--gap);
    margin-bottom: var(--gap-xl);
  }
  .modes h2 {
    margin: var(--gap-xs) 0 var(--gap-sm);
  }
  .body {
    color: var(--mid);
    margin-bottom: var(--gap);
    max-width: 62ch;
  }
  .card:hover {
    border-color: var(--accent);
    box-shadow: 0 4px 20px var(--accent-shadow);
  }

  .rubric ol {
    margin: var(--gap) 0 0;
    padding-left: 1.2em;
    color: var(--mid);
    display: grid;
    gap: var(--gap-sm);
  }
  .rubric strong {
    color: var(--text);
  }
  .rubric:hover {
    border-color: var(--border);
    box-shadow: none;
  }

  @media (min-width: 720px) {
    .modes {
      grid-template-columns: 1fr 1fr;
    }
    .modes article:first-child {
      grid-column: 1 / -1;
    }
  }
</style>
