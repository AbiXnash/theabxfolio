import { component$ } from '@builder.io/qwik';
import { useDocumentHead } from '@builder.io/qwik-city';

export const RouterHead = component$(() => {
  const head = useDocumentHead();
  return (
    <>
      <title>{head.title}</title>
      {head.meta.map((meta) => (
        <meta key={meta.key} {...meta} />
      ))}
      {head.links.map((link) => (
        <link key={link.key} {...link} />
      ))}
      {head.styles.map((style) => (
        <style key={style.key} {...style.props} dangerouslySetInnerHTML={style.style} />
      ))}
    </>
  );
});
