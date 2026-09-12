const form = document.getElementById('loginForm');
const password = document.getElementById('password');
const toggle = document.getElementById('togglePassword');
const register = document.getElementById('registerLink');
const message = document.getElementById('message');

toggle.addEventListener('click', () => {
  const visible = password.type === 'text';
  password.type = visible ? 'password' : 'text';
  toggle.textContent = visible ? '◉' : '◌';
  toggle.setAttribute('aria-label', visible ? 'Tampilkan kata sandi' : 'Sembunyikan kata sandi');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;
  
  // Ambil data dari localStorage
  const users = JSON.parse(localStorage.getItem('cloudstore_users')) || [];
  const user = users.find(u => u.phone === phone && u.password === password);
  
  if (user) {
    message.className = 'success';
    message.textContent = '✓ Login berhasil! Mengalihkan...';
    localStorage.setItem('currentUser', JSON.stringify(user));
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  } else {
    message.className = 'error';
    message.textContent = '✕ Nomor handphone atau kata sandi salah!';
    setTimeout(() => {
      message.textContent = '';
      message.className = '';
    }, 4000);
  }
});

register.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'register.html';
});