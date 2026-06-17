const BASE_URL = 'http://127.0.0.1:8000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const errorMessage = body?.detail || body?.message || JSON.stringify(body) || response.statusText;
    throw new Error(errorMessage);
  }

  return body;
}

export function saveAuthTokens(tokens) {
  localStorage.setItem('accessToken', tokens.access);
  localStorage.setItem('refreshToken', tokens.refresh);
}

export function clearAuthTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export async function registerUser(payload) {
  return request('/auth/register/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload) {
  return request('/auth/login/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function createDonor(payload) {
  return request('/donors/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchDonors(queryParams = {}) {
  const queryString = new URLSearchParams(queryParams).toString();
  return request(`/donors/?${queryString}`, {
    method: 'GET',
  });
}
