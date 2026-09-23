import { CONFIG } from './config.js';

const NAV_ITEMS = [
  { label: 'Beranda', href: 'index.html' },
  {
    label: 'Profil',
    href: 'tentang-kami.html',
    children: [
      { label: 'Tentang Kami', href: 'tentang-kami.html' },
      { label: 'Struktur Organisasi', href: 'struktur-organisasi.html' },
      { label: 'Struktur Wilayah', href: 'struktur-wilayah.html' },
      { label: 'Filosofi Logo', href: 'filosofi-logo.html' },
    ],
  },
  {
    label: 'Program',
    href: 'program-kerja.html',
    children: [
      { label: 'Program Kerja', href: 'program-kerja.html' },
      { label: '5 Pilar LKP', href: 'program-kerja.html#pilar' },
    ],
  },
  {
    label: 'Informasi',
    href: 'berita.html',
    children: [
      { label: 'Berita', href: 'berita.html' },
      { label: 'Galeri Kegiatan', href: 'galeri.html' },
      { label: 'Kemitraan', href: 'kemitraan.html' },
    ],
  },
  {
    label: 'Anggota',
    href: 'gabung.html',
    children: [
      { label: 'Daftar Anggota', href: 'gabung.html' },
      { label: 'Cek Status', href: 'cek-status.html' },
    ],
  },
  { label: 'Kontak', href: 'hubungi-kami.html' },
];

export function renderNavbar() {
  const current = location.pathname.split('/').pop() || 'index.html';
  const isActive = (href) => current === href.split('#')[0];

  const renderItem = (item) => {
    if (!item.children) {
      return `
        <li class="navbar__item">
          <a class="navbar__link no-caret ${isActive(item.href) ? 'is-active' : ''}" href="${item.href}">
            ${item.label}
          </a>
        </li>
      `;
    }
    const anyChildActive = item.children.some(c => isActive(c.href));
    return `
      <li class="navbar__item" data-dropdown>
        <a class="navbar__link ${anyChildActive ? 'is-active' : ''}" href="${item.href}">
          ${item.label}
        </a>
        <ul class="navbar__dropdown">
          ${item.children.map(c => `
            <li><a href="${c.href}">${c.label}</a></li>
          `).join('')}
        </ul>
      </li>
    `;
  };

  const html = `
    <nav class="navbar">
      <div class="container navbar__inner">
        <a href="index.html" class="navbar__brand">
          <img src="assets/img/logo-lkp.png" alt="Logo LKP" onerror="this.style.display='none'">
          <span>LKP</span>
        </a>
        <button class="navbar__toggle" id="navToggle" aria-label="Buka menu" aria-expanded="false">☰</button>
        <ul class="navbar__menu" id="navMenu">
          ${NAV_ITEMS.map(renderItem).join('')}
          <li class="navbar__item">
            <a href="gabung.html" class="navbar__cta">Gabung →</a>
          </li>
        </ul>
      </div>
    </nav>
  `;
  document.body.insertAdjacentHTML('afterbegin', html);

  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? '✕' : '☰';
  });

  document.querySelectorAll('[data-dropdown] > .navbar__link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        link.parentElement.classList.toggle('is-open');
      }
    });
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 1024 && !a.classList.contains('navbar__link')) {
        menu.classList.remove('is-open');
        toggle.textContent = '☰';
      }
    });
  });
}

export function renderFooter() {
  const waLink = `https://wa.me/${CONFIG.WHATSAPP}`;
  const html = `
    <footer class="footer">
      <div class="container">
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;" class="footer-grid">
          <div>
            <h4>${CONFIG.NAMA_ORGANISASI}</h4>
            <p>${CONFIG.ADDRESS}</p>
            <p style="margin-top:12px;">
              <a href="tel:+${CONFIG.WHATSAPP}">+${CONFIG.WHATSAPP}</a><br>
              <a href="mailto:${CONFIG.EMAIL}">${CONFIG.EMAIL}</a>
            </p>
          </div>
          <div>
            <h4>Profil</h4>
            <p><a href="tentang-kami.html">Tentang Kami</a></p>
            <p><a href="struktur-organisasi.html">Struktur Organisasi</a></p>
            <p><a href="struktur-wilayah.html">Struktur Wilayah</a></p>
            <p><a href="filosofi-logo.html">Filosofi Logo</a></p>
          </div>
          <div>
            <h4>Informasi</h4>
            <p><a href="berita.html">Berita</a></p>
            <p><a href="galeri.html">Galeri</a></p>
            <p><a href="kemitraan.html">Kemitraan</a></p>
            <p><a href="program-kerja.html">Program Kerja</a></p>
          </div>
          <div>
            <h4>Ayo Bergabung</h4>
            <p><a href="${CONFIG.INSTAGRAM}" target="_blank" rel="noopener">Instagram</a></p>
            <p><a href="${waLink}" target="_blank" rel="noopener">WhatsApp</a></p>
            <p><a href="gabung.html">Daftar Anggota</a></p>
            <p><a href="cek-status.html">Cek Status</a></p>
          </div>
        </div>
        <div class="footer__bottom">
          © ${new Date().getFullYear()} ${CONFIG.NAMA_ORGANISASI} (${CONFIG.SINGKATAN}).
          Terdaftar: ${CONFIG.NOMOR_SK}. Masa bakti ${CONFIG.PERIODE_KEPENGURUSAN}.
        </div>
      </div>
      <style>
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 500px) { .footer-grid { grid-template-columns: 1fr !important; } }
      </style>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
});
