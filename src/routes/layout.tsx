import { component$, Slot, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dock from '../components/Dock';

export default component$(() => {
  useVisibleTask$(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });

  return (
    <>
      <Header />
      <main class="flex-1">
        <Slot />
      </main>
      <Dock />
      <Footer />
    </>
  );
});

export const head: DocumentHead = {
  title: 'abx@portfolio',
  links: [
    { rel: 'icon', type: 'image/svg+xml', href: '/arch-logo.svg' },
    { rel: 'apple-touch-icon', href: '/arch-logo.svg' },
  ],
};
