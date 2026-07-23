import type { APIRoute } from 'astro';

const SITE = 'https://www.stuart-white.co.uk';

// Routes that exist but must never appear in the generated sitemap.
// /start/founding is an unlisted signup path shared privately - it must not
// be discoverable via the sitemap, search engines, or internal links.
const EXCLUDED_PATHS = ['/start/founding'];

const pageFiles = import.meta.glob('/src/pages/**/*.astro', { eager: false });

function pathFromFile(file: string): string {
  let path = file.replace(/^\/src\/pages/, '').replace(/\.astro$/, '');
  if (path.endsWith('/index')) path = path.slice(0, -'index'.length);
  if (path === '') path = '/';
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path;
}

export const GET: APIRoute = () => {
  const urls = Object.keys(pageFiles)
    .map(pathFromFile)
    .filter((path) => !EXCLUDED_PATHS.includes(path))
    .sort();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${SITE}${path === '/' ? '' : path}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
