const requiredStrings = ['id', 'key', 'path', 'title', 'summary', 'kind', 'domain', 'searchText'];

function validEntry(entry) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return false;
  if (!requiredStrings.every(key => typeof entry[key] === 'string')) return false;
  if (entry.image !== undefined && typeof entry.image !== 'string') return false;
  if (!Array.isArray(entry.sections)) return false;
  return entry.sections.every(section => section && typeof section === 'object'
    && typeof section.title === 'string'
    && typeof section.text === 'string'
    && (section.anchor === undefined || typeof section.anchor === 'string'));
}

// A corrupt full-text response must not replace the independent summary index.
export function validateSearchIndex(data) {
  if (!data || typeof data !== 'object' || data.version !== 1 || !Array.isArray(data.entries) || !data.entries.length) {
    throw new Error('invalid search index');
  }
  if (!data.entries.every(validEntry)) throw new Error('invalid search index entry');
  return data.entries;
}
