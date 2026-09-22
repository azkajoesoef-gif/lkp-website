// assets/js/api.js — Wrapper untuk panggil LKP API
import { CONFIG } from './config.js';

async function callAPI(params = {}) {
  if (!CONFIG.API_URL) {
    throw new Error('API_URL belum di-set di config.js');
  }

  const qs = new URLSearchParams(params).toString();
  const url = `${CONFIG.API_URL}?${qs}`;

  const res = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const json = await res.json();
  if (json.error) {
    throw new Error(json.error);
  }
  return json;
}

export async function fetchBerita() {
  const res = await callAPI({ action: 'getBerita' });
  return res.data || [];
}

export async function fetchBeritaBySlug(slug) {
  const res = await callAPI({ action: 'getBeritaBySlug', slug });
  return res.data || null;
}

export async function fetchPengurus() {
  const res = await callAPI({ action: 'getPengurus' });
  return res.data || [];
}

export async function fetchGaleri() {
  const res = await callAPI({ action: 'getGaleri' });
  return res.data || [];
}

export async function fetchMitra() {
  const res = await callAPI({ action: 'getMitra' });
  return res.data || [];
}

export async function postAnggota(payload) {
  const res = await callAPI({ action: 'postAnggota', ...payload });
  return res;
}

export async function postPengaduan(payload) {
  const res = await callAPI({ action: 'postPengaduan', ...payload });
  return res;
}

export async function cekStatus(query) {
  const res = await callAPI({ action: 'cekStatus', q: query });
  return res;
}

// ============================================================
// UTILITY
// ============================================================

export function formatTanggal(tanggal) {
  if (!tanggal) return '';
  const bulan = ['Januari','Februari','Maret','April','Mei','Juni',
                 'Juli','Agustus','September','Oktober','November','Desember'];
  const d = new Date(tanggal);
  if (isNaN(d)) return tanggal;
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
