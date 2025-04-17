document.addEventListener('DOMContentLoaded', () => {
    // Hanya jalankan di halaman galeri
    if (document.body.getAttribute('data-page') !== 'galeri-informasi') {
        return;
    }

    const galleryGridContainer = document.getElementById('gallery-grid-container');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Pastikan semua elemen ada
    if (!galleryGridContainer || !lightboxModal || !lightboxImage || !lightboxCaption || !lightboxClose) {
        console.error("Elemen galeri atau lightbox tidak ditemukan!");
        if (galleryGridContainer) {
             galleryGridContainer.innerHTML = '<p class="error-text">Gagal memuat komponen galeri.</p>';
        }
        return;
    }

    // Fungsi untuk memuat dan menampilkan galeri
    async function loadGallery() {
        try {
            const response = await fetch('data/galeri.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const galleryData = await response.json();

            // Bersihkan placeholder
            galleryGridContainer.innerHTML = '';

            if (galleryData.length === 0) {
                 galleryGridContainer.innerHTML = '<p>Belum ada foto di galeri.</p>';
                 return;
            }

            // Loop data dan buat elemen HTML
            galleryData.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                // Simpan data fullUrl dan caption di dataset untuk lightbox
                galleryItem.dataset.fullUrl = item.fullUrl;
                galleryItem.dataset.caption = item.caption || item.altText || ""; // Fallback caption

                const img = document.createElement('img');
                img.src = item.thumbnailUrl;
                img.alt = item.altText || item.caption || "Foto Galeri"; // Fallback alt text
                img.loading = 'lazy'; // Optimasi: lazy load gambar

                const captionDiv = document.createElement('div');
                captionDiv.className = 'caption';
                captionDiv.textContent = item.caption || item.altText || "Tanpa Judul";

                galleryItem.appendChild(img);
                galleryItem.appendChild(captionDiv);
                galleryGridContainer.appendChild(galleryItem);

                // Tambahkan event listener untuk membuka lightbox
                galleryItem.addEventListener('click', openLightbox);
            });

        } catch (error) {
            console.error('Gagal memuat data galeri:', error);
            galleryGridContainer.innerHTML = '<p class="error-text">Gagal memuat data galeri. Coba refresh halaman.</p>';
        }
    }

    // Fungsi untuk membuka lightbox
    function openLightbox(event) {
        const item = event.currentTarget; // div.gallery-item yang diklik
        lightboxImage.src = item.dataset.fullUrl;
        lightboxCaption.textContent = item.dataset.caption;
        lightboxModal.style.display = 'block';
    }

    // Fungsi untuk menutup lightbox
    function closeLightbox() {
        lightboxModal.style.display = 'none';
        lightboxImage.src = ""; // Kosongkan src untuk mencegah flash gambar lama
        lightboxCaption.textContent = "";
    }

    // Event listener untuk tombol close dan overlay
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (event) => {
        // Hanya tutup jika klik pada overlay langsung, bukan kontennya
        if (event.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Panggil fungsi untuk memuat galeri
    loadGallery();

}); 