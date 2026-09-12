// Check if user is logged in
window.addEventListener('load', () => {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'index.html';
    return;
  }
  loadDashboard();
});

// Sample Products Data
const products = [
  {
    id: 1,
    name: 'MANGKUK WHEATSTRAW SET | 1 SET ISI 3 | BPA FREE | MICROWAVABLE',
    price: 33900,
    originalPrice: 84000,
    commission: 'IDR2.712',
    image: 'https://via.placeholder.com/150/fff3cd/333?text=Mangkuk',
    description: 'Set mangkuk premium dengan material ramah lingkungan'
  },
  {
    id: 2,
    name: 'LADIESBAG - TAS SELEMPANG SLINGBAG WANITA FASHION',
    price: 48500,
    originalPrice: 105000,
    commission: 'IDR4.270',
    image: 'https://via.placeholder.com/150/f0f0f0/333?text=Tas',
    description: 'Tas selempang wanita dengan desain modern dan nyaman'
  },
  {
    id: 3,
    name: 'Mega_1688 Rak Bumbu Dapur Kotak Bumbu Tempat Pisau/Sendok',
    price: 72500,
    originalPrice: 157000,
    commission: 'IDR6.525',
    image: 'https://via.placeholder.com/150/ffffcc/333?text=Rak',
    description: 'Rak bumbu dapur multifungsi untuk menyimpan berbagai kebutuhan dapur'
  },
  {
    id: 4,
    name: 'AmazeFan Penyedot Debu Nirkabel 9000Pa Mini Portabel Vakuum',
    price: 90500,
    originalPrice: 210000,
    commission: 'IDR7.240',
    image: 'https://via.placeholder.com/150/e8f5e9/333?text=Vacuum',
    description: 'Penyedot debu mini portabel dengan teknologi terkini'
  },
  {
    id: 5,
    name: 'SKETZGO_ORIGINAL_SEPATUPRIA_SEI',
    price: 115500,
    originalPrice: 250000,
    commission: 'IDR9.240',
    image: 'https://via.placeholder.com/150/f3e5f5/333?text=Sepatu',
    description: 'Sepatu pria original dengan kualitas premium dan desain eksklusif'
  },
  {
    id: 6,
    name: 'Speaker Bluetooth Karaoke Free Mic 8.5inch Q5780U Salon Aktif',
    price: 142500,
    originalPrice: 307000,
    commission: 'IDR11.400',
    image: 'https://via.placeholder.com/150/fce4ec/333?text=Speaker',
    description: 'Speaker bluetooth karaoke dengan kualitas suara jernih dan bass kuat'
  },
  {
    id: 7,
    name: 'Soedi Diary - Cherry shirt',
    price: 144500,
    originalPrice: 312000,
    commission: 'IDR11.560',
    image: 'https://via.placeholder.com/150/f1f8e9/333?text=Shirt',
    description: 'Kemeja cherry dengan bahan berkualitas dan desain trendy'
  },
  {
    id: 8,
    name: 'KHANS - Sandal Platform Wedges Wanita - Raya Black',
    price: 89000,
    originalPrice: 189000,
    commission: 'IDR7.120',
    image: 'https://via.placeholder.com/150/f8bbd0/333?text=Sandal',
    description: 'Sandal platform wedges wanita dengan desain elegant'
  }
];

// Sample Gifts Data
const gifts = [
  { id: 1, name: 'Voucher 50K', icon: '🎁' },
  { id: 2, name: 'Cashback 25K', icon: '💰' },
  { id: 3, name: 'Diskon 20%', icon: '🏷️' },
  { id: 4, name: 'Free Ongkir', icon: '🚚' },
  { id: 5, name: 'Poin Reward', icon: '⭐' },
  { id: 6, name: 'Bonus Produk', icon: '📦' }
];

let selectedGift = null;
let currentProduct = null;

// Load Dashboard
function loadDashboard() {
  displayProducts();
  setupEventListeners();
}

// Display Products
function displayProducts(filteredProducts = products) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = filteredProducts.map(product => `
    <div class="product-card" onclick="openProductModal(${product.id})">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">
          <span class="original-price">IDR${product.originalPrice.toLocaleString('id-ID')}</span>
          <span class="current-price">IDR${product.price.toLocaleString('id-ID')}</span>
        </div>
        <div class="product-commission">Komisi: ${product.commission}</div>
        <div class="product-actions">
          <button class="action-btn buy-btn-small" onclick="event.stopPropagation(); buyProduct(${product.id})">Beli</button>
          <button class="action-btn gift-btn-small" onclick="event.stopPropagation(); openGiftModal(${product.id})">Hadiah</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Open Product Modal
function openProductModal(productId) {
  currentProduct = products.find(p => p.id === productId);
  if (!currentProduct) return;

  document.getElementById('modalProductImage').src = currentProduct.image;
  document.getElementById('modalProductName').textContent = currentProduct.name;
  document.getElementById('modalOriginalPrice').textContent = `IDR${currentProduct.originalPrice.toLocaleString('id-ID')}`;
  document.getElementById('modalCurrentPrice').textContent = `IDR${currentProduct.price.toLocaleString('id-ID')}`;
  document.getElementById('modalCommission').textContent = `Komisi: ${currentProduct.commission}`;
  document.getElementById('modalProductDesc').textContent = currentProduct.description;

  document.getElementById('productModal').classList.add('active');
}

// Open Gift Modal
function openGiftModal(productId) {
  currentProduct = products.find(p => p.id === productId);
  const giftsGrid = document.getElementById('giftsGrid');
  giftsGrid.innerHTML = gifts.map(gift => `
    <div class="gift-card" onclick="selectGift(${gift.id})">
      <div class="gift-icon">${gift.icon}</div>
      <div class="gift-name">${gift.name}</div>
    </div>
  `).join('');

  document.getElementById('giftModal').classList.add('active');
}

// Select Gift
function selectGift(giftId) {
  selectedGift = gifts.find(g => g.id === giftId);
  document.querySelectorAll('.gift-card').forEach(card => card.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
}

// Buy Product
function buyProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  alert(`✓ Pesanan untuk "${product.name}" telah ditambahkan ke keranjang!\n\nHarga: IDR${product.price.toLocaleString('id-ID')}\nKomisi: ${product.commission}`);
}

// Setup Event Listeners
function setupEventListeners() {
  // Close Modals
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('productModal').classList.remove('active');
      document.getElementById('giftModal').classList.remove('active');
    });
  });

  // Modal overlay close
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Tab Navigation
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      if (btn.dataset.tab === 'promo') {
        displayProducts(products.filter(p => p.price < p.originalPrice * 0.5));
      } else {
        displayProducts();
      }
    });
  });

  // Product Buttons
  document.getElementById('buyBtn').addEventListener('click', () => {
    if (currentProduct) {
      buyProduct(currentProduct.id);
      document.getElementById('productModal').classList.remove('active');
    }
  });

  document.getElementById('chooseGiftBtn').addEventListener('click', () => {
    document.getElementById('productModal').classList.remove('active');
    openGiftModal(currentProduct.id);
  });

  document.getElementById('confirmGiftBtn').addEventListener('click', () => {
    if (!selectedGift) {
      alert('Pilih hadiah terlebih dahulu!');
      return;
    }
    alert(`✓ Pesanan untuk "${currentProduct.name}" dengan hadiah "${selectedGift.name}" berhasil dibuat!\n\nHarga: IDR${currentProduct.price.toLocaleString('id-ID')}\nKomisi: ${currentProduct.commission}\nHadiah: ${selectedGift.name}`);
    document.getElementById('giftModal').classList.remove('active');
  });

  // Search
  document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(filtered);
  });

  document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('searchBtn').click();
    }
  });

  // Bottom Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      handleNavigation(page);
    });
  });
}

// Handle Navigation
function handleNavigation(page) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  event.currentTarget.classList.add('active');

  switch(page) {
    case 'bantuan':
      alert('Halaman Bantuan - Hubungi customer service kami');
      break;
    case 'aktivitas':
      alert('Halaman Aktivitas - Lihat riwayat pesanan Anda');
      break;
    case 'akun':
      alert('Halaman Akun - Edit profil dan pengaturan');
      break;
    default:
      // Stay on dashboard
      break;
  }
}