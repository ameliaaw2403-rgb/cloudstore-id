// Data penyimpanan (menggunakan localStorage)
const STORAGE_KEY = 'cloudstore_users';
const ADMIN_PASSWORD = 'admin123'; // Password default untuk demo

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeAdmin();
  loadUsers();
  updateStats();
  setupEventListeners();
  updateServerTime();
  setInterval(updateServerTime, 1000);
});

// Initialize Admin Panel
function initializeAdmin() {
  // Check if admin is logged in (demo purposes)
  const isLoggedIn = localStorage.getItem('adminLoggedIn');
  if (!isLoggedIn) {
    const password = prompt('Masukkan password admin (default: admin123):');
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminLoggedIn', 'true');
    } else {
      alert('Password salah! Anda akan diarahkan ke halaman login.');
      window.location.href = 'index.html';
    }
  }

  // Initialize storage jika kosong
  if (!localStorage.getItem(STORAGE_KEY)) {
    const defaultUsers = [
      {
        id: 1,
        phone: '08123456789',
        name: 'Budi Santoso',
        email: 'budi@example.com',
        password: 'password123',
        status: 'active',
        createdAt: new Date().toLocaleDateString('id-ID')
      },
      {
        id: 2,
        phone: '08987654321',
        name: 'Siti Nurhaliza',
        email: 'siti@example.com',
        password: 'password456',
        status: 'active',
        createdAt: new Date().toLocaleDateString('id-ID')
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Tab Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = item.dataset.tab;
      switchTab(tabName);
    });
  });

  // Create User Form
  document.getElementById('createUserForm').addEventListener('submit', createUser);

  // Search & Filter
  document.getElementById('searchInput').addEventListener('input', filterUsers);
  document.getElementById('filterStatus').addEventListener('change', filterUsers);

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', logout);

  // Modal
  const modal = document.getElementById('editModal');
  const closeBtn = modal.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Edit Form
  document.getElementById('editUserForm').addEventListener('submit', updateUser);
}

// Switch Tab
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // Remove active class from all nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  // Show selected tab
  document.getElementById(tabName).classList.add('active');

  // Add active class to clicked nav item
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  // Update stats if dashboard
  if (tabName === 'dashboard') {
    updateStats();
  }
}

// Load & Display Users
function loadUsers() {
  const users = getUsers();
  const tbody = document.getElementById('usersTableBody');

  if (users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">Tidak ada data pengguna</td></tr>';
    return;
  }

  tbody.innerHTML = users.map((user, index) => `
    <tr>
      <td>${index + 1}</td>
      <td><strong>${user.phone}</strong></td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <span class="status-badge status-${user.status}">
          ${user.status === 'active' ? '✓ Aktif' : user.status === 'blocked' ? '✕ Terblokir' : '○ Tidak Aktif'}
        </span>
      </td>
      <td>${user.createdAt}</td>
      <td>
        <div class="action-buttons">
          <button class="btn-small btn-edit" onclick="openEditModal(${user.id})">Edit</button>
          <button class="btn-small btn-delete" onclick="deleteUser(${user.id})">Hapus</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Get Users from Storage
function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Create User
function createUser(e) {
  e.preventDefault();

  const phone = document.getElementById('newPhone').value;
  const name = document.getElementById('newName').value;
  const email = document.getElementById('newEmail').value;
  const password = document.getElementById('newPassword').value;
  const status = document.getElementById('newStatus').value;
  const messageEl = document.getElementById('createMessage');

  // Validation
  if (!phone || !name || !email || !password) {
    messageEl.classList.add('error');
    messageEl.classList.remove('success');
    messageEl.textContent = '⚠️ Semua field harus diisi!';
    return;
  }

  if (password.length < 6) {
    messageEl.classList.add('error');
    messageEl.classList.remove('success');
    messageEl.textContent = '⚠️ Password minimal 6 karakter!';
    return;
  }

  const users = getUsers();
  
  // Check if phone already exists
  if (users.some(u => u.phone === phone)) {
    messageEl.classList.add('error');
    messageEl.classList.remove('success');
    messageEl.textContent = '⚠️ Nomor telepon sudah terdaftar!';
    return;
  }

  // Create new user
  const newUser = {
    id: Math.max(...users.map(u => u.id), 0) + 1,
    phone,
    name,
    email,
    password,
    status,
    createdAt: new Date().toLocaleDateString('id-ID')
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  // Reset form
  document.getElementById('createUserForm').reset();
  
  // Show success message
  messageEl.classList.remove('error');
  messageEl.classList.add('success');
  messageEl.textContent = '✓ Akun berhasil dibuat!';

  // Reload users table
  setTimeout(() => {
    loadUsers();
    updateStats();
    messageEl.textContent = '';
    switchTab('users');
  }, 1500);
}

// Delete User
function deleteUser(id) {
  if (confirm('Yakin ingin menghapus akun ini?')) {
    let users = getUsers();
    users = users.filter(u => u.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    loadUsers();
    updateStats();
  }
}

// Open Edit Modal
function openEditModal(id) {
  const users = getUsers();
  const user = users.find(u => u.id === id);

  if (!user) return;

  document.getElementById('editUserId').value = id;
  document.getElementById('editPhone').value = user.phone;
  document.getElementById('editName').value = user.name;
  document.getElementById('editEmail').value = user.email;
  document.getElementById('editStatus').value = user.status;

  document.getElementById('editModal').classList.add('active');
}

// Update User
function updateUser(e) {
  e.preventDefault();

  const id = parseInt(document.getElementById('editUserId').value);
  const phone = document.getElementById('editPhone').value;
  const name = document.getElementById('editName').value;
  const email = document.getElementById('editEmail').value;
  const status = document.getElementById('editStatus').value;

  let users = getUsers();
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      phone,
      name,
      email,
      status
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    loadUsers();
    document.getElementById('editModal').classList.remove('active');
    alert('Perubahan berhasil disimpan!');
  }
}

// Filter Users
function filterUsers() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const status = document.getElementById('filterStatus').value;
  const users = getUsers();

  const filtered = users.filter(user => {
    const matchSearch = user.phone.includes(search) || user.name.toLowerCase().includes(search);
    const matchStatus = !status || user.status === status;
    return matchSearch && matchStatus;
  });

  const tbody = document.getElementById('usersTableBody');
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">Tidak ada hasil yang cocok</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map((user, index) => `
    <tr>
      <td>${index + 1}</td>
      <td><strong>${user.phone}</strong></td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <span class="status-badge status-${user.status}">
          ${user.status === 'active' ? '✓ Aktif' : user.status === 'blocked' ? '✕ Terblokir' : '○ Tidak Aktif'}
        </span>
      </td>
      <td>${user.createdAt}</td>
      <td>
        <div class="action-buttons">
          <button class="btn-small btn-edit" onclick="openEditModal(${user.id})">Edit</button>
          <button class="btn-small btn-delete" onclick="deleteUser(${user.id})">Hapus</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Update Statistics
function updateStats() {
  const users = getUsers();
  const today = new Date().toLocaleDateString('id-ID');

  document.getElementById('totalUsers').textContent = users.length;
  document.getElementById('activeUsers').textContent = users.filter(u => u.status === 'active').length;
  document.getElementById('blockedUsers').textContent = users.filter(u => u.status === 'blocked').length;
  document.getElementById('todayUsers').textContent = users.filter(u => u.createdAt === today).length;

  // Additional stats
  document.getElementById('totalLogins').textContent = Math.floor(Math.random() * 100) + 20;
  document.getElementById('avgActivity').textContent = Math.floor(Math.random() * 40) + 60 + '%';
  document.getElementById('newThisMonth').textContent = Math.floor(Math.random() * 15) + 5;
}

// Update Server Time
function updateServerTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  const timeEl = document.getElementById('serverTime');
  if (timeEl) {
    timeEl.textContent = timeString;
  }
}

// Logout
function logout() {
  if (confirm('Yakin ingin keluar dari admin panel?')) {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
  }
}