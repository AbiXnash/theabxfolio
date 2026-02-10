import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <section class="page-shell">
      <div class="page-inner service-shell">
        <div class="hero-block" data-reveal>
          <span class="hero-kicker">$ services --list</span>
          <h1 class="hero-title">Services & Collaboration</h1>
          <p class="hero-subtitle">
            Premium engineering support for backend systems, transaction platforms, and research-grade prototypes.
            Clear scope, measurable delivery, and careful documentation.
          </p>
          <p class="section-hint">
            Hint: Choose a track below, then check the process and FAQ for timelines.
          </p>
        </div>

        <div class="service-grid">
          <article class="card service-card" data-reveal>
            <div class="service-head">
              <h2 class="section-title">
                <span class="service-icon">◈</span>
                Architecture & Strategy
              </h2>
              <span class="service-tag">advisory</span>
            </div>
            <p class="section-subtitle">
              System design, roadmap alignment, and technical planning for banking, payments, and data-heavy platforms.
            </p>
            <ul class="service-list">
              <li>System design reviews</li>
              <li>Risk, compliance, and audit readiness</li>
              <li>Migration and scale planning</li>
            </ul>
            <div class="service-detail">
              Deliverables include architecture docs, threat modeling inputs, and aligned milestones.
            </div>
          </article>

          <article class="card service-card" data-reveal>
            <div class="service-head">
              <h2 class="section-title">
                <span class="service-icon">⎯</span>
                Backend Engineering
              </h2>
              <span class="service-tag">build</span>
            </div>
            <p class="section-subtitle">
              Production APIs, transaction workflows, and microservice delivery with clean observability and testing.
            </p>
            <ul class="service-list">
              <li>Payment and transaction services</li>
              <li>High-volume data pipelines</li>
              <li>Performance tuning and reliability</li>
            </ul>
            <div class="service-detail">
              Focused on idempotency, audit trails, rollback safety, and resiliency.
            </div>
          </article>

          <article class="card service-card" data-reveal>
            <div class="service-head">
              <h2 class="section-title">
                <span class="service-icon">✦</span>
                Research Collaboration
              </h2>
              <span class="service-tag">research</span>
            </div>
            <p class="section-subtitle">
              Support for intrusion detection research, dataset structuring, and experimentation pipelines.
            </p>
            <ul class="service-list">
              <li>Experiment design and baselines</li>
              <li>Model evaluation and reporting</li>
              <li>Reproducible notebooks</li>
            </ul>
            <div class="service-detail">Ideal for papers, prototypes, and defense-grade documentation.</div>
          </article>
        </div>

        <div class="service-process card" data-reveal>
          <div>
            <h2 class="section-title">Process</h2>
            <p class="section-subtitle">
              A lightweight workflow that keeps every build transparent and on schedule.
            </p>
          </div>
          <div class="process-steps">
            <div class="process-step">
              <span class="process-count">01</span>
              <div>
                <h3>Discovery</h3>
                <p>Scope goals, constraints, and success metrics.</p>
              </div>
            </div>
            <div class="process-step">
              <span class="process-count">02</span>
              <div>
                <h3>Design</h3>
                <p>Architecture, workflows, and system boundaries.</p>
              </div>
            </div>
            <div class="process-step">
              <span class="process-count">03</span>
              <div>
                <h3>Build</h3>
                <p>Implementation, tests, and release staging.</p>
              </div>
            </div>
            <div class="process-step">
              <span class="process-count">04</span>
              <div>
                <h3>Launch</h3>
                <p>Monitoring, documentation, and handoff.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="service-stack" data-reveal>
          <h2 class="section-title">Core Stack</h2>
          <div class="stack-chips">
            <span class="chip">Java</span>
            <span class="chip">Spring Boot</span>
            <span class="chip">Microservices</span>
            <span class="chip">OracleDB</span>
            <span class="chip">PostgreSQL</span>
            <span class="chip">Kafka</span>
            <span class="chip">Redis</span>
            <span class="chip">Docker</span>
          </div>
        </div>

        <div class="service-faq" data-reveal>
          <h2 class="section-title">FAQ</h2>
          <div class="faq-grid">
            <details class="card">
              <summary title="Click to expand">What type of projects do you take?</summary>
              <p>
                Backend platforms, banking integrations, transaction flows, and research prototypes that need reliability and clarity.
              </p>
            </details>
            <details class="card">
              <summary title="Click to expand">How fast can you start?</summary>
              <p>Typically within 1–2 weeks after scope confirmation and alignment.</p>
            </details>
            <details class="card">
              <summary title="Click to expand">Do you provide documentation?</summary>
              <p>Yes. Every delivery includes structured docs, diagrams, and handoff notes.</p>
            </details>
          </div>
        </div>

        <div class="card service-cta" data-reveal>
          <div>
            <h3 class="section-title">Start a Project</h3>
            <p class="section-subtitle">Share your scope and timeline. I will respond with a plan and next steps.</p>
          </div>
          <a href="/contact" class="btn-primary">Contact</a>
        </div>
      </div>
    </section>
  );
});
