/**
 * DATA PROPERTI YDTOWN
 * Gunakan kurung siku [ ] pada bagian gambar untuk memasukkan banyak foto.
 */
const dataProperti = [
    {
        id: 1,
        nama: "Lahan Strategis 37 Hektar",
        status: "Dijual",
        identitas: "Tanah",
        lokasi: "Rawi Barat, Ambal Ambil, Kec Kejayan, Pasuruan",
        harga: 62000000000,
        nego: true,
        // Path disesuaikan ke assets/img/ dan format .jpeg
        gambar: ["assets/img/pasuruan.jpeg"], 
        detail: {
            luas: "37 Hektar",
            deskripsi: "Sangat cocok untuk pengembangan kawasan industri (pabrik), operasional tambang, atau perkebunan skala besar. Lokasi sangat strategis dengan akses jalan yang memadai.",
            pembagian: "Sisi Kiri jalan 12Ha, Sisi Kanan jalan 25Ha. Lebar jalan 6 meter. Hanya 35 menit dari Gerbang Tol Pasuruan Kota."
        },
        igLink: "https://www.instagram.com/p/DILy8f-zsaS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" 
    },
    {
        id: 2,
        nama: "Tanah Purwantoro Wonogiri",
        status: "Dijual",
        identitas: "Tanah",
        lokasi: "Desa Purwantoro, Kec Purwantoro, Kab Wonogiri",
        harga: 12229000000,
        nego: true,
        gambar: ["assets/img/purwodadi.jpeg"],
        detail: {
            luas: "61.145m²",
            deskripsi: "Lahan luas dengan kontur yang baik di Jawa Tengah. Cocok untuk investasi jangka panjang atau pengembangan agribisnis.",
            pembagian: null
        },
        igLink: "https://www.instagram.com/p/DVJRASpkwsQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
    {
        id: 3,
        nama: "Rumah dengan Ruko",
        status: "Terjual",
        identitas: "Rumah & Ruko",
        lokasi: "Desa Panjalin Kidul, Majalengka",
        harga: 2100000000,
        nego: false,
        gambar: ["assets/img/panjalin.jpeg"],
        detail: {
            luas: "LT: 3.215m² | LB: 198m²",
            deskripsi: "Aset kombinasi tempat tinggal dan ruang usaha yang sudah laku terjual melalui jaringan Ydtown.",
            pembagian: "Terdiri dari 1 unit ruko depan dan rumah tinggal di bagian belakang dengan sisa tanah yang luas."
        },
        igLink: "https://www.instagram.com/reel/DHaU1JDTZzj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    }
];

const WA_NUMBER = "6281312092118";
let currentSlideIndex = 0;

/**
 * Memformat angka ke Rupiah
 */
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(angka);
}

/**
 * Render List di Halaman Utama (Overview)
 */
function renderProperti(filterStatus = "Semua", searchText = "") {
    const container = document.getElementById('property-list');
    container.innerHTML = "";

    const filteredData = dataProperti.filter(item => {
        const matchesStatus = filterStatus === "Semua" || item.status === filterStatus;
        const matchesSearch = item.nama.toLowerCase().includes(searchText.toLowerCase()) || 
                             item.lokasi.toLowerCase().includes(searchText.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    if (filteredData.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-20 text-slate-400">Tidak ada aset yang ditemukan...</div>`;
        return;
    }

    filteredData.forEach(item => {
        const isSold = item.status === "Terjual";
        const cardHtml = `
            <div onclick="openModal(${item.id})" class="card-property bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col ${isSold ? 'sold-out' : ''}">
                <div class="relative">
                    <img src="${item.gambar[0]}" class="property-image w-full h-64 object-cover">
                    <div class="absolute top-4 left-4">
                        <span class="status-badge px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${isSold ? 'bg-red-600' : 'bg-slate-900'}">
                            ${item.status}
                        </span>
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-bold text-slate-900 mb-1 leading-tight">${item.nama}</h3>
                    <p class="text-xs text-slate-400 mb-4 flex items-center italic">
                        <i class="fas fa-map-marker-alt mr-1 text-[10px]"></i> ${item.lokasi}
                    </p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="text-emerald-600 font-extrabold text-lg">${formatRupiah(item.harga)}</span>
                        <span class="text-[10px] bg-slate-50 text-slate-400 px-2 py-1 rounded-md uppercase font-bold">Detail <i class="fas fa-arrow-right ml-1"></i></span>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHtml;
    });
}

/**
 * Logika Modal & Galeri
 */
function openModal(id) {
    const item = dataProperti.find(p => p.id === id);
    const modal = document.getElementById('propertyModal');
    const content = document.getElementById('modalContent');
    currentSlideIndex = 0;

    let slidesHtml = "";
    item.gambar.forEach((img, idx) => {
        slidesHtml += `<div class="mySlides ${idx === 0 ? '' : 'hidden'} fade border-b border-slate-100">
            <img src="${img}" class="w-full h-[400px] object-cover">
        </div>`;
    });

    const controls = item.gambar.length > 1 ? `
        <div class="absolute inset-y-0 flex items-center justify-between w-full px-4 pointer-events-none">
            <button onclick="changeSlide(-1)" class="pointer-events-auto bg-white/90 hover:bg-white w-10 h-10 rounded-full shadow-xl flex items-center justify-center transition"><i class="fas fa-chevron-left"></i></button>
            <button onclick="changeSlide(1)" class="pointer-events-auto bg-white/90 hover:bg-white w-10 h-10 rounded-full shadow-xl flex items-center justify-center transition"><i class="fas fa-chevron-right"></i></button>
        </div>
    ` : "";

    content.innerHTML = `
        <div class="relative">${slidesHtml}${controls}</div>
        <div class="p-8 md:p-12">
            <div class="flex items-center gap-2 mb-4">
                <span class="bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase italic tracking-tighter">${item.identitas}</span>
                <span class="${item.status === 'Terjual' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">${item.status}</span>
            </div>
            
            <h2 class="text-3xl font-black text-slate-900 mb-2">${item.nama}</h2>
            <p class="text-slate-500 mb-8 flex items-center text-sm italic underline decoration-amber-200 decoration-2 underline-offset-4">
                <i class="fas fa-map-marker-alt mr-2 text-amber-500"></i> ${item.lokasi}
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p class="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Penawaran Harga</p>
                    <p class="text-2xl font-black text-emerald-600">${formatRupiah(item.harga)} ${item.nego ? '<span class="text-xs text-emerald-500 font-normal ml-1">(Nego)</span>' : ''}</p>
                </div>
                <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p class="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Dimensi Aset</p>
                    <p class="text-2xl font-black text-slate-900">${item.detail.luas}</p>
                </div>
            </div>

            <div class="space-y-6 mb-10">
                <div>
                    <h4 class="text-slate-900 font-bold text-sm uppercase tracking-widest mb-3 flex items-center">
                        <i class="fas fa-align-left mr-2 text-amber-500"></i> Informasi Lengkap
                    </h4>
                    <p class="text-slate-600 text-sm leading-relaxed">${item.detail.deskripsi}</p>
                </div>
                ${item.detail.pembagian ? `
                <div class="bg-slate-900 text-slate-300 p-6 rounded-3xl text-xs leading-loose shadow-xl">
                    <p class="text-white font-bold mb-2 uppercase tracking-tighter italic">Detail Tambahan / Akses Jalan:</p>
                    ${item.detail.pembagian}
                </div>` : ''}
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="https://wa.me/${WA_NUMBER}?text=Halo%20Ydtown,%20saya%20tertarik%20dengan%20${item.nama}" target="_blank"
                   class="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-100">
                    <i class="fab fa-whatsapp text-xl"></i> Konsultasi WhatsApp
                </a>
                <a href="${item.igLink}" target="_blank"
                   class="flex items-center justify-center gap-3 bg-white border-2 border-slate-900 text-slate-900 py-5 rounded-2xl font-bold transition-all hover:bg-slate-900 hover:text-white">
                    <i class="fab fa-instagram text-xl"></i> Lihat Video Aset
                </a>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('propertyModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

function changeSlide(n) {
    const slides = document.getElementsByClassName("mySlides");
    slides[currentSlideIndex].classList.add("hidden");
    currentSlideIndex = (currentSlideIndex + n + slides.length) % slides.length;
    slides[currentSlideIndex].classList.remove("hidden");
}

function searchProperty() {
    const text = document.getElementById('searchInput').value;
    renderProperti("Semua", text);
}

function filterByStatus(status) {
    renderProperti(status);
}

window.onclick = function(e) {
    const modal = document.getElementById('propertyModal');
    if (e.target == modal) closeModal();
}

document.addEventListener('DOMContentLoaded', () => renderProperti());