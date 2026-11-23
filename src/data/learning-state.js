export const storageKeys = { bookmarks: 'port-bookmarks', read: 'port-read' };
export function learningKey(path, base = '/port-knowledge/') {
  const url = new URL(path, 'https://port.invalid' + base);
  let local = decodeURIComponent(url.pathname);
  if (local.startsWith(base)) local = local.slice(base.length);
  local = local.replace(/^\/+|\/+$/g, '');
  if (local.startsWith('knowledge/')) return local.slice('knowledge/'.length);
  return 'page:' + local + '/' + (local === 'containers' ? url.hash : '');
}
export function readItems(storage, type) {
  const value = JSON.parse(storage.getItem(storageKeys[type]) || '[]');
  if (!Array.isArray(value) || value.some(item => typeof item !== 'string')) throw new Error('invalid learning data');
  return [...new Set(value)];
}
export function toggleItem(storage, type, key) {
  const items = readItems(storage, type);
  const next = items.includes(key) ? items.filter(item => item !== key) : [...items, key];
  storage.setItem(storageKeys[type], JSON.stringify(next));
  return next;
}
export function routeProgress(paths, read, base) {
  const keys = paths.map(path => learningKey(path, base));
  return { done: keys.filter(key => read.includes(key)).length, total: keys.length, next: paths.find((path,i) => !read.includes(keys[i])) };
}
