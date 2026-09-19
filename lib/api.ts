// lib/api.ts
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function getApiUrl(endpoint: string): string {
  return `${BASE_PATH}${endpoint}`;
}

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  const url = getApiUrl(endpoint);
  return fetch(url, options);
}