import { renderToString } from '@builder.io/qwik/server';
import Root from './root';

export default function (opts: Parameters<typeof renderToString>[1]) {
  return renderToString(<Root />, opts);
}
