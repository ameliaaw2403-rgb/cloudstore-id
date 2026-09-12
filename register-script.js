const STORAGE_KEY = 'cloudstore_users';
const form = document.getElementById('registerForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const message = document.getElementById('message');

// Toggle password visibility
togglePassword.addEventListener('click', () => {
  const visible = passwordInput.type === 'text';
  passwordInput.type = visible ? 'password' : 'text';
  togglePassword.textContent = visible ? '◉' : '◌';
});

toggleConfirmPassword.addEventListener('click', () => {
  const visible = confirmPasswordInput.type === 'text';
  confirmPasswordInput.type = visible ? 'password' : 'text';
  toggleConfirmPassword.textContent = visible ? '◉' : '◌';
});

// Form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  registerUser();
});

function registerUser() {
  const fullname = document.getElementById('fullname').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const termsAccepted = document.getElementById('terms').checked;

  // Validasi
  if (!fullname || !phone || !email || !password || !confirmPassword) {
    showMessage('⚠️ Semua field harus diisi!', 'error');
    return;
  }

  // Validasi nama
  if (fullname.length < 3) {
    showMessage('⚠️ Nama lengkap minimal 3 karakter!', 'error');
    return;
  }

  // Validasi nomor handphone
  const phoneRegex = /^08\d{8,11}$/;
  if (!phoneRegex.test(phone)) {
    showMessage('⚠️ Nomor handphone harus dimulai dengan 08 dan 10-13 digit!', 'error');
    return;
  }

  // Validasi email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage('⚠️ Format email tidak valid!', 'error');
    return;
  }

  // Validasi password strength
  if (password.length < 8) {
    showMessage('⚠️ Password minimal 8 karakter!', 'error');
    return;
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    showMessage('⚠️ Password harus mengandung huruf besar, huruf kecil, dan angka!', 'error');
    return;
  }

  // Validasi password match
  if (password !== confirmPassword) {
    showMessage('⚠️ Kata sandi tidak cocok!', 'error');
    return;
  }

  // Validasi terms
  if (!termsAccepted) {
    showMessage('⚠️ Anda harus menyetujui syarat dan ketentuan!', 'error');
    return;
  }

  // Get existing users
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // Check if phone already exists
  if (users.some(u => u.phone === phone)) {
    showMessage('⚠️ Nomor handphone sudah terdaftar!', 'error');
    return;
  }

  // Check if email already exists
  if (users.some(u => u.email === email)) {
    showMessage('⚠️ Email sudah terdaftar!', 'error');
    return;
  }

  // Create new user
  const newUser = {
    id: Math.max(...users.map(u => u.id), 0) + 1,
    name: fullname,
    phone: phone,
    email: email,
    password: password, // In production, hash this!
    status: 'active',
    createdAt: new Date().toLocaleDateString('id-ID')
  };

  // Save user
  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  // Show success message
  showMessage('✓ Akun berhasil dibuat! Mengalihkan ke halaman login...', 'success');

  // Redirect after 2 seconds
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000);
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = type;
  message.style.display = 'block';

  // Clear message after 5 seconds if error
  if (type === 'error') {
    setTimeout(() => {
      message.textContent = '';
      message.className = '';
    }, 5000);
  }
}