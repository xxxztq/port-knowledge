import { defineConfig } from 'astro/config';
export default defineConfig({ site: 'https://xxxztq.github.io', base: '/port-knowledge', output: 'static', trailingSlash: 'always', build: { format: 'directory' }, vite: { server: { watch: { ignored: ['**/docs/**'] } } } });
