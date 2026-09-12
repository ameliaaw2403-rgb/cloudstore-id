const form = document.getElementById('loginForm');
const password = document.getElementById('password');
const toggle = document.getElementById('togglePassword');
const register = document.getElementById('registerLink');
const message = document.getElementById('message');

toggle.addEventListener('click', () => {
  const visible = password.type === 'text';
  password.type = visible ? 'password' : 'text';
  toggle.textContent = visible ? '◉' : '◌';
  toggle.setAttribute('aria-label', visible ? 'Tampilkan kata laluan' : 'Sembunyikan kata laluan');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  message.textContent = 'Halaman demo: sambungan ke sistem log masuk belum dikonfigurasi.';
});

register.addEventListener('click', (event) => {
  event.preventDefault();
  message.textContent = 'Halaman pendaftaran belum dikonfigurasi.';
});