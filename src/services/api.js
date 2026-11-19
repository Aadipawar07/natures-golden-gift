const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
).replace(/\/+$/, '');

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body !== undefined) headers.set('Content-Type', 'application/json');

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/${String(path).replace(/^\/+/, '')}`, {
      ...options,
      headers,
      credentials: 'omit',
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch {
    throw new Error('Could not reach the store service. Please try again shortly.');
  }

  const responseText = await response.text();
  let result = null;
  if (responseText) {
    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error('The store service returned an unreadable response.');
    }
  }

  if (!response.ok) {
    throw new Error(result?.error || `The request failed (${response.status}).`);
  }
  return result;
}

export function apiGet(path, options = {}) {
  return apiRequest(path, { cache: 'no-store', ...options, method: 'GET' });
}

export function apiPost(path, body, options = {}) {
  return apiRequest(path, { ...options, method: 'POST', body });
}

export const API_BASE = API_BASE_URL;
