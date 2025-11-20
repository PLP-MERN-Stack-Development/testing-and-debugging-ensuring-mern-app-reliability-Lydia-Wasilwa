const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function fetchBugs() {
  const res = await fetch(`${API_BASE}/bugs`);
  if (!res.ok) throw new Error('Failed to fetch bugs');
  return res.json();
}

export async function createBug(payload) {
  const res = await fetch(`${API_BASE}/bugs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.errors ? err.errors.join(', ') : 'Failed to create');
  }
  return res.json();
}

export async function updateBug(id, payload) {
  const res = await fetch(`${API_BASE}/bugs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update');
  return res.json();
}

export async function deleteBug(id) {
  const res = await fetch(`${API_BASE}/bugs/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete');
  return res.json();
}
