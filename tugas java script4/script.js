console.log("===== MATERI - 06 - CONSUME API =====");
// Tambahkan ?limit=0 agar API mengembalikan SEMUA produk, bukan cuma 30 produk
const API_URL = 'https://dummyjson.com/products?limit=0';

// 1. Variabel Global untuk menyimpan data produk dari API
let allProducts = [];

// 2. Mengambil Elemen DOM dari HTML
const productGrid = document.getElementById('product-grid');
const loadingState = document.getElementById('loading-state'); 
const resultSummary = document.getElementById('result-summary');
const categorySelect = document.getElementById('category-select');

const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const emptyState = document.getElementById('empty-state');
const resetBtn = document.getElementById('reset-btn');

const productDialog = document.getElementById('product-dialog');
const dialogContent = document.getElementById('dialog-content');
const dialogClose = document.getElementById('dialog-close');

function renderProduct(dataProduct) {
  productGrid.innerHTML = ''; // reset isi product grid
  dataProduct.forEach(data => {
    // mengubah key dari object dataProduct menjadi variable -> destructuring assignment
    const { id, title, price, category, thumbnail, rating } = data;

    productGrid.innerHTML += `
      <article class="product-card">
        <div class="product-image-wrap">
          <img class="product-image" src="${thumbnail}" alt="${title}" loading="lazy">
        </div>

        <div class="product-body">
          <span class="product-category">
            ${category}
          </span>

          <h3 class="product-title">
            ${title}
          </h3>

          <div class="product-meta">
            <span class="product-price">
              $${price}
            </span>

            <span class="product-rating">
              ⭐ ${rating}
            </span>
          </div>

          <button type="button" class="detail-btn" data-id="${id}">
            Lihat Detail
          </button>
        </div>
      </article>
    `;
  });
}

// Mengambil Data Produk dari API
const getProducts = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    allProducts = data.products; // Simpan data ke variabel global
    
    renderProduct(allProducts);
    resultSummary.textContent = `Menampilkan ${allProducts.length} dari ${allProducts.length} produk`;
    
    loadingState.hidden = true;
    productGrid.hidden = false;
    
    // Ambil daftar kategori setelah produk berhasil di-load
    getProductsCategories();
  } catch (error) {
    console.error("Error on Products:", error);
  }
};

const getProductsCategories = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/categories');
    const categories = await response.json();
    
    categories.forEach(category => {
      // Karena API dummyjson mengembalikan array object kategori ({slug, name})
      categorySelect.innerHTML += `<option value="${category.slug}">${category.name}</option>`;
    });
  } catch (error) {
    console.error("Error on getProductCategories:", error);
  }
};

function applyFilters() {
  let filtered = [...allProducts];

  // A. Logika Search
  const keyword = searchInput.value.toLowerCase().trim();
  if (keyword) {
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(keyword) || 
      item.category.toLowerCase().includes(keyword)
    );
  }

  // B. Logika Filter Kategori
  const selectedCategory = categorySelect.value;
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(item => item.category === selectedCategory);
  }

  // C. Logika Sorting
  const sortValue = sortSelect.value;
  if (sortValue === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortValue === 'rating-desc') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortValue === 'name-asc') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  // D. Menampilkan Hasil atau Empty State
  if (filtered.length === 0) {
    productGrid.hidden = true;
    emptyState.hidden = false;
  } else {
    productGrid.hidden = false;
    emptyState.hidden = true;
    renderProduct(filtered);
  }
  
  resultSummary.textContent = `Menampilkan ${filtered.length} dari ${allProducts.length} produk`;
}

// -------------------------------------------------------------
// EVENT LISTENERS (Perbaikan Utama: Agar filter merespons aksi user)
// -------------------------------------------------------------

// Jalankan applyFilters() saat user mengetik pencarian
searchInput.addEventListener('input', applyFilters);

// Jalankan applyFilters() saat opsi kategori diubah
categorySelect.addEventListener('change', applyFilters);

// Jalankan applyFilters() saat urutan sort diubah
sortSelect.addEventListener('change', applyFilters);

// Kembalikan ke posisi awal saat tombol Reset diklik
resetBtn.addEventListener('click', () => {
  searchInput.value = '';
  categorySelect.value = 'all';
  sortSelect.value = 'default';
  applyFilters();
});

// Event Listener Modal Detail Produk
productGrid.addEventListener('click', (e) => {
  if (e.target.classList.contains('detail-btn')) {
    const productId = Number(e.target.dataset.id);
    const selectedProduct = allProducts.find(p => p.id === productId);

    if (selectedProduct) {
      dialogContent.innerHTML = `
        <h2>${selectedProduct.title}</h2>
        <img src="${selectedProduct.thumbnail}" alt="${selectedProduct.title}" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 1rem;">
        <p><strong>Kategori:</strong> ${selectedProduct.category}</p>
        <p><strong>Harga:</strong> $${selectedProduct.price}</p>
        <p><strong>Rating:</strong> ⭐ ${selectedProduct.rating}</p>
        <p><strong>Deskripsi:</strong> ${selectedProduct.description}</p>
      `;
      productDialog.showModal();
    }
  }
});

dialogClose.addEventListener('click', () => {
  productDialog.close();
});

// Panggil fungsi awal untuk mengambil data dari API
getProducts();