import { CONFIG } from './config.js';

const NAV_ITEMS = [
  { label: 'Beranda', href: 'index.html' },
  { label: 'Tentang Kami', href: 'tentang-kami.html' },
  { label: 'Program Kerja', href: 'program-kerja.html' },
  { label: 'Struktur Pengurus', href: 'struktur-organisasi.html' },
  { label: 'Berita', href: 'berita.html' },
  { label: 'Gabung', href: 'gabung.html' },
  { label: 'Hubungi Kami', href: 'hubungi-kami.html' },
];

export function renderNavbar() {
  const html = `
    <nav class="navbar">
      <div class="container navbar__inner">
        <a href="index.html" class="navbar__brand">
          <img src="assets/img/logo-lkp.png" alt="Logo LKP" onerror="this.style.display='none'">
          <span>LKP</span>
        </a>
        <ul class="navbar__menu">
          ${NAV_ITEMS.map(i =>
            `<li><a class="navbar__link" href="${i.href}">${i.label}</a></li>`
          ).join('')}
        </ul>
      </div>
    </nav>
  `;
  document.body.insertAdjacentHTML('afterbegin', html);
}

export function renderFooter() {
  const waLink = `https://wa.me/${CONFIG.WHATSAPP}`;
  const html = `
    <footer class="footer">
      <div class="container">
        <h4>${CONFIG.NAMA_ORGANISASI} (${CONFIG.SINGKATAN})</h4>
        <p>${CONFIG.ADDRESS}</p>
        <p>
          <a href="tel:+${CONFIG.WHATSAPP}">+${CONFIG.WHATSAPP}</a> ·
          <a href="mailto:${CONFIG.EMAIL}">${CONFIG.EMAIL}</a> ·
          <a href="${waLink}">WhatsApp</a> ·
          <a href="${CONFIG.INSTAGRAM}">Instagram</a>
        </p>
        <div class="footer__bottom">
          © ${new Date().getFullYear()} ${CONFIG.NAMA_ORGANISASI}.
          Terdaftar: ${CONFIG.NOMOR_SK}. Masa bakti ${CONFIG.PERIODE_KEPENGURUSAN}.
        </div>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
});
