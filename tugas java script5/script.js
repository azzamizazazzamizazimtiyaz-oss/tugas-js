/* =========================================================
   DASHBOARD KANTIN HSI-BS
   ========================================================= */

// 1. DATA PRODUK
const produkAwal = [
  { id: 1, nama: "Nasi Goreng", kategori: "Makanan", terjual: 38, harga: 10000 },
  { id: 2, nama: "Mie Ayam", kategori: "Makanan", terjual: 23, harga: 8000 },
  { id: 3, nama: "Nasi Uduk", kategori: "Makanan", terjual: 23, harga: 7000 },
  { id: 4, nama: "Air Mineral", kategori: "Minuman", terjual: 34, harga: 4000 },
  { id: 5, nama: "Es Teh Manis", kategori: "Minuman", terjual: 42, harga: 3000 },
  { id: 6, nama: "Roti Bakar", kategori: "Snack", terjual: 25, harga: 5000 },
  { id: 7, nama: "Pisang Goreng", kategori: "Snack", terjual: 20, harga: 4000 },
  { id: 8, nama: "Kopi Susu", kategori: "Minuman", terjual: 18, harga: 4000 },
  { id: 9, nama: "Jus Jeruk", kategori: "Minuman", terjual: 18, harga: 6000 },
  { id: 10, nama: "Kentang Goreng", kategori: "Snack", terjual: 20, harga: 2000 }
];

let daftarProduk = produkAwal.map(produk => ({ ...produk }));

const totalOmzetAwal = produkAwal.reduce((total, produk) =>
  total + produk.terjual * produk.harga, 0
);

const totalItemAwal = produkAwal.reduce((total, produk) =>
  total + produk.terjual, 0
);

function ubahKeTanggalISO(tanggal) {
  const tahun = tanggal.getFullYear();
  const bulan = String(tanggal.getMonth() + 1).padStart(2, "0");
  const hari = String(tanggal.getDate()).padStart(2, "0");
  return `${tahun}-${bulan}-${hari}`;
}

// DATA PENJUALAN HARIAN
const penjualanHarian = [
  { tanggal: "2026-10-17", omzet: 220000, item: 40, transaksi: 3 },
  { tanggal: "2026-10-18", omzet: 163000, item: 31, transaksi: 3 },
  { tanggal: "2026-10-19", omzet: 198000, item: 37, transaksi: 3 },
  { tanggal: "2026-10-20", omzet: 220000, item: 40, transaksi: 3 },
  { tanggal: "2026-10-21", omzet: 194000, item: 36, transaksi: 3 },
  { tanggal: "2026-10-22", omzet: 154000, item: 29, transaksi: 3 },
  { tanggal: "2026-10-23", omzet: 261000, item: 48, transaksi: 3 }
];

// DATA PROMO
const promoMingguan = [
  { emoji: "🍜", nama: "Senin Hemat", deskripsi: "Mie Ayam cuma Rp7.000", label: "SENIN", warna: "blue" },
  { emoji: "🍳", nama: "Paket Sarapan", deskripsi: "Nasi Uduk + Es Teh Rp9.000", label: "SETIAP HARI", warna: "yellow" },
  { emoji: "🍌", nama: "Menu Baru", deskripsi: "Pisang Goreng Coklat", label: "MINGGU INI", warna: "teal" },
  { emoji: "💧", nama: "Jumat Berkah", deskripsi: "Air mineral gratis tiap beli makanan", label: "JUMAT", warna: "red" }
];


// 2. MENGAMBIL ELEMEN HTML
const ambil = id => document.getElementById(id);

const elemen = {
  tanggal: ambil("fDate"),
  kategori: ambil("fKat"),
  rentang: ambil("dRange"),
  omzet: ambil("kOmzet"),
  item: ambil("kItem"),
  transaksi: ambil("kTrx"),
  rataOmzet: ambil("cOmzet"),
  catatanItem: ambil("cItem"),
  catatanTrx: ambil("cTrx"),
  jumlahProduk: ambil("tCount"),
  jumlahPromo: ambil("pCount"),
  tabel: ambil("tProd"),
  promo: ambil("promo"),
  tombolTema: ambil("btnTheme"),
  tooltip: ambil("tooltip")
};

// FORMAT RUPIAH
const formatRupiah = angka =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(angka);

// FORMAT TANGGAL
const formatTanggal = tanggal =>
  new Date(tanggal + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });


// 3. FILTER TANGGAL DAN KATEGORI
let tanggalMulai = "2026-10-17";
let tanggalAkhir = "2026-10-23";

let kategoriTerpilih = ["Makanan", "Minuman", "Snack"];

function dataSesuaiFilter() {

  const dataTanggal = penjualanHarian.filter(data =>
    data.tanggal >= tanggalMulai &&
    data.tanggal <= tanggalAkhir
  );

  const produkTerpilih = daftarProduk.filter(produk =>
    kategoriTerpilih.includes(produk.kategori)
  );

  const omzetTerpilih = produkTerpilih.reduce((total, produk) =>
    total + produk.terjual * produk.harga, 0
  );

  const itemTerpilih = produkTerpilih.reduce((total, produk) =>
    total + produk.terjual, 0
  );

  const rasioOmzet = totalOmzetAwal
    ? omzetTerpilih / totalOmzetAwal : 0;

  const rasioItem = totalItemAwal
    ? itemTerpilih / totalItemAwal : 0;

  const omzetPeriode = dataTanggal.reduce((total, data) =>
    total + data.omzet, 0
  );

  const itemPeriode = dataTanggal.reduce((total, data) =>
    total + data.item, 0
  );

  const transaksiPeriode = dataTanggal.reduce((total, data) =>
    total + data.transaksi, 0
  );

  return {
    tanggal: dataTanggal,
    produk: produkTerpilih,
    omzet: Math.round(omzetPeriode * rasioOmzet),
    item: Math.round(itemPeriode * rasioItem),
    transaksi: Math.round(transaksiPeriode * rasioItem)
  };
}


// 4. FLATPICKR - PEMILIH RENTANG TANGGAL
if (window.flatpickr) {

  flatpickr.localize(flatpickr.l10ns.id);

  flatpickr(elemen.tanggal, {
    mode: "range",
    dateFormat: "Y-m-d",
    defaultDate: [tanggalMulai, tanggalAkhir],
    locale: "id",

    onChange: function (tanggal) {

      if (tanggal.length === 2) {

        tanggalMulai = ubahKeTanggalISO(tanggal[0]);
        tanggalAkhir = ubahKeTanggalISO(tanggal[1]);

        perbaruiDashboard();
      }
    }
  });
}


// 5. TOM SELECT - MULTI SELECT KATEGORI
["Makanan", "Minuman", "Snack"].forEach(kategori => {

  const option = document.createElement("option");

  option.value = kategori;
  option.textContent = kategori;

  elemen.kategori.appendChild(option);
});

if (window.TomSelect) {

  new TomSelect(elemen.kategori, {

    plugins: ["remove_button"],
    maxOptions: 3,
    placeholder: "Pilih kategori...",

    onChange: function (nilai) {

      kategoriTerpilih = Array.isArray(nilai)
        ? nilai
        : (nilai ? [nilai] : []);

      perbaruiDashboard();
    }
  });
}


// 6. CHART.JS - GRAFIK BATANG DAN DONAT
let grafikBatang;
let grafikDonat;

function buatGrafik() {

  if (!window.Chart) return;

  // GRAFIK BATANG
  grafikBatang = new Chart(ambil("cBar"), {

    type: "bar",

    data: {
      labels: [],

      datasets: [{
        label: "Omzet",
        data: [],
        backgroundColor: "#3575df",
        borderRadius: 4,
        maxBarThickness: 38
      }]
    },

    options: {

      responsive: true,
      maintainAspectRatio: false,

      plugins: {

        legend: {
          display: false
        },

        tooltip: {
          callbacks: {
            label: konteks =>
              " " + formatRupiah(konteks.raw)
          }
        }
      },

      scales: {

        y: {
          beginAtZero: true,

          ticks: {
            callback: nilai =>
              (nilai / 1000) + "rb"
          }
        },

        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });


  // GRAFIK DONAT
  grafikDonat = new Chart(ambil("cDn"), {

    type: "doughnut",

    data: {

      labels: ["Makanan", "Minuman", "Snack"],

      datasets: [{
        data: [0, 0, 0],
        backgroundColor: [
          "#3575df",
          "#82b536",
          "#bf63e8"
        ],
        borderWidth: 0,
        hoverOffset: 5
      }]
    },

    options: {

      responsive: true,
      maintainAspectRatio: false,
      cutout: "58%",

      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}


// MEMPERBARUI GRAFIK
function perbaruiGrafik(data) {

  if (!grafikBatang || !grafikDonat) return;

  grafikBatang.data.labels = data.tanggal.map(item =>

    new Date(item.tanggal + "T00:00:00")
      .toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric"
      })

  );

  grafikBatang.data.datasets[0].data = data.tanggal.map(item =>

    Math.round(
      item.omzet *
      (
        data.omzet /
        (data.tanggal.reduce((sum, d) => sum + d.omzet, 0) || 1)
      )
    )

  );

  grafikBatang.update();


  const jumlahKategori = ["Makanan", "Minuman", "Snack"].map(kategori =>

    data.produk
      .filter(produk => produk.kategori === kategori)
      .reduce((total, produk) => total + produk.terjual, 0)

  );

  grafikDonat.data.datasets[0].data = jumlahKategori;

  grafikDonat.update();
}


// 7. TABULATOR - TABEL PRODUK
let tabelProduk;

function buatTabel() {

  if (!window.Tabulator) return;

  tabelProduk = new Tabulator(elemen.tabel, {

    data: daftarProduk,

    layout: "fitColumns",
    responsiveLayout: "hide",

    pagination: true,
    paginationSize: 5,
    paginationSizeSelector: [5, 10],

    placeholder: "Tidak ada produk yang ditemukan",

    columns: [

      {
        title: "Produk",
        field: "nama",
        headerFilter: "input",
        headerFilterPlaceholder: "Cari produk...",
        minWidth: 130,
        sorter: "string"
      },

      {
        title: "Kategori",
        field: "kategori",
        minWidth: 105,

        formatter: cell => {

          const kategori = cell.getValue();

          const warna =
            kategori === "Makanan" ? "blue" :
            kategori === "Minuman" ? "green" : "purple";

          return `<span class="lozenge ${warna}">${kategori}</span>`;
        }
      },

      {
        title: "Terjual",
        field: "terjual",
        hozAlign: "right",
        sorter: "number",
        width: 90
      },

      {
        title: "Omzet",
        field: "omzet",
        hozAlign: "right",
        sorter: "number",
        width: 125,

        formatter: cell =>
          formatRupiah(cell.getValue())
      },

      {
        title: "",
        field: "id",
        width: 42,
        hozAlign: "center",
        headerSort: false,

        formatter: () =>
          '<button class="icon-btn del" title="Hapus produk" aria-label="Hapus produk">⌫</button>',

        cellClick: function (event, cell) {

          const produk = cell.getRow().getData();

          hapusProduk(produk.id);
        }
      }
    ]
  });
}


// MEMPERBARUI TABEL
function perbaruiTabel(data) {

  if (!tabelProduk) return;

  const dataTabel = data.produk.map(produk => ({

    ...produk,

    omzet: produk.terjual * produk.harga

  }));

  tabelProduk.replaceData(dataTabel);

  elemen.jumlahProduk.textContent =
    dataTabel.length + " produk";
}


// 8. SWEETALERT2 - HAPUS PRODUK
function hapusProduk(id) {

  const produk = daftarProduk.find(item => item.id === id);

  if (!produk) return;

  Swal.fire({

    title: "Hapus " + produk.nama + "?",
    text: "Produk ini akan dihapus dari daftar produk.",

    icon: "warning",

    showCancelButton: true,

    confirmButtonText: "Hapus",
    cancelButtonText: "Batal",

    confirmButtonColor: "#c9372c",
    cancelButtonColor: "#6b6e76",

    reverseButtons: true,

    customClass: {
      popup: "ads-modal"
    }

  }).then(hasil => {

    if (hasil.isConfirmed) {

      daftarProduk = daftarProduk.filter(item =>
        item.id !== id
      );

      perbaruiDashboard();

      Swal.fire({

        toast: true,
        position: "top-end",
        icon: "success",

        title: "Produk berhasil dihapus",

        showConfirmButton: false,
        timer: 1800,

        customClass: {
          popup: "ads-flag"
        }
      });
    }
  });
}


// 9. FLOATING UI - TOOLTIP
function aktifkanTooltip() {

  const tombolInfo = document.querySelectorAll("[data-tip]");

  tombolInfo.forEach(tombol => {

    tombol.addEventListener("mouseenter", async () => {

      const tooltip = elemen.tooltip;

      tooltip.textContent = tombol.dataset.tip;
      tooltip.style.opacity = "1";

      if (window.FloatingUIDOM) {

        const posisi = await FloatingUIDOM.computePosition(
          tombol,
          tooltip,
          {
            placement: "top",

            middleware: [
              FloatingUIDOM.offset(8),
              FloatingUIDOM.flip(),
              FloatingUIDOM.shift({ padding: 8 })
            ]
          }
        );

        Object.assign(tooltip.style, {

          left: posisi.x + "px",
          top: posisi.y + "px"

        });
      }
    });


    tombol.addEventListener("mouseleave", () => {

      elemen.tooltip.style.opacity = "0";

    });


    tombol.addEventListener("focus", () =>
      tombol.dispatchEvent(new Event("mouseenter"))
    );

    tombol.addEventListener("blur", () =>
      tombol.dispatchEvent(new Event("mouseleave"))
    );

  });
}


// 10. MODE GELAP DAN TERANG
function aturTema() {

  const html = document.documentElement;

  const temaTersimpan =
    localStorage.getItem("kantin-color-mode");

  const temaAwal =
    temaTersimpan ||
    html.getAttribute("data-color-mode") ||
    "light";

  html.setAttribute("data-color-mode", temaAwal);

  ubahTeksTombolTema(temaAwal);


  elemen.tombolTema.addEventListener("click", () => {

    const temaBaru =
      html.getAttribute("data-color-mode") === "dark"
        ? "light"
        : "dark";

    html.setAttribute("data-color-mode", temaBaru);

    localStorage.setItem("kantin-color-mode", temaBaru);

    ubahTeksTombolTema(temaBaru);

  });
}


// MENGUBAH TULISAN TOMBOL TEMA
function ubahTeksTombolTema(tema) {

  const tulisan =
    elemen.tombolTema.querySelector("span");

  if (tulisan) {

    tulisan.textContent =
      tema === "dark" ? "Mode terang" : "Mode gelap";

  }
}


// 11. MENAMPILKAN PROMO MINGGUAN
function tampilkanPromo() {

  elemen.promo.innerHTML = promoMingguan.map(promo => `

    <li>

      <span class="p-emoji">${promo.emoji}</span>

      <div class="p-body">

        <b>${promo.nama}</b>

        <small>${promo.deskripsi}</small>

      </div>

      <span class="lozenge ${promo.warna}">
        ${promo.label}
      </span>

    </li>

  `).join("");

  elemen.jumlahPromo.textContent =
    promoMingguan.length + " aktif";
}


// 12. MEMPERBARUI SELURUH DASHBOARD
function perbaruiDashboard() {

  const data = dataSesuaiFilter();

  elemen.omzet.textContent =
    formatRupiah(data.omzet);

  elemen.item.textContent =
    data.item.toLocaleString("id-ID");

  elemen.transaksi.textContent =
    data.transaksi.toLocaleString("id-ID");


  const jumlahHari = data.tanggal.length;

  elemen.rataOmzet.textContent = jumlahHari
    ? "Rata-rata " +
      formatRupiah(Math.round(data.omzet / jumlahHari)) +
      " per hari"
    : "Tidak ada data pada rentang ini";


  elemen.catatanItem.textContent =
    "Dari " + data.produk.length + " produk yang dipilih";

  elemen.catatanTrx.textContent =
    "Dalam " + jumlahHari + " hari";


  if (jumlahHari > 0) {

    elemen.rentang.textContent =

      formatTanggal(tanggalMulai) +
      " – " +
      formatTanggal(tanggalAkhir) +
      " · " +
      kategoriTerpilih.length +
      " kategori · " +
      data.produk.length +
      " produk";

  } else {

    elemen.rentang.textContent =
      "Tidak ada data pada rentang tanggal tersebut";

  }


  perbaruiGrafik(data);

  perbaruiTabel(data);

}


// 13. MENJALANKAN SEMUA FITUR
document.addEventListener("DOMContentLoaded", function () {

  aturTema();

  buatGrafik();

  buatTabel();

  tampilkanPromo();

  aktifkanTooltip();

  perbaruiDashboard();

});