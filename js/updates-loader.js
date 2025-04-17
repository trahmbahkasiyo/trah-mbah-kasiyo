document.addEventListener('DOMContentLoaded', () => {
    // Hanya jalankan di halaman galeri & informasi
    if (document.body.getAttribute('data-page') !== 'galeri-informasi') {
        return;
    }

    const pengumumanContainer = document.getElementById('pengumuman-container');
    const pengumumanControls = document.getElementById('pengumuman-controls'); // Ambil div kontrol
    const toggleBtn = document.getElementById('toggle-pengumuman-btn');      // Ambil tombol

    // Pastikan elemen target ada
    if (!pengumumanContainer || !pengumumanControls || !toggleBtn) {
        console.error("Elemen #pengumuman-container atau kontrolnya tidak ditemukan!");
        return;
    }

    const initialShowCount = 2; // Jumlah pengumuman yang ditampilkan awal
    let isExpanded = false;     // Status apakah daftar diperluas

    // Fungsi untuk memuat dan menampilkan pengumuman
    async function loadUpdates() {
        const placeholder = pengumumanContainer.querySelector('.placeholder-text'); // Ambil placeholder

        try {
            const response = await fetch('data/updates.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Data JSON sekarang adalah objek { updates: [...] }
            const jsonData = await response.json();
            // Akses array sebenarnya di dalam properti "updates"
            const updatesArray = jsonData.updates;

            // Hapus placeholder jika ada
            if (placeholder) placeholder.remove();

            // Cek panjang array yang benar
            if (!updatesArray || updatesArray.length === 0) {
                 const noUpdateMsg = document.createElement('p');
                 noUpdateMsg.textContent = 'Tidak ada pengumuman terbaru saat ini.';
                 pengumumanContainer.appendChild(noUpdateMsg);
                 return; // Tidak perlu tombol jika kosong
            }

            // Tambahkan semua item ke DOM, tapi beri class untuk yang disembunyikan
            updatesArray.forEach((item, index) => {
                const infoItemDiv = document.createElement('div');
                infoItemDiv.className = 'info-item'; // Class dasar

                // Tambahkan class hidden jika index >= initialShowCount
                if (index >= initialShowCount) {
                    infoItemDiv.classList.add('announcement-hidden');
                }

                const dateP = document.createElement('p');
                dateP.className = 'date';
                dateP.textContent = item.date || 'Tanggal tidak tersedia';

                const titleP = document.createElement('p');
                titleP.className = 'title';
                titleP.textContent = item.title || 'Judul tidak tersedia';

                const contentP = document.createElement('p');
                contentP.className = 'content';
                contentP.textContent = item.content || 'Konten tidak tersedia';

                infoItemDiv.appendChild(dateP);
                infoItemDiv.appendChild(titleP);
                infoItemDiv.appendChild(contentP);

                // Tambahkan item ke container
                pengumumanContainer.appendChild(infoItemDiv);
            });

            // Tampilkan tombol HANYA jika jumlah item > jumlah awal
            if (updatesArray.length > initialShowCount) {
                pengumumanControls.style.display = 'block'; // Tampilkan div kontrol
                toggleBtn.addEventListener('click', toggleAnnouncements); // Tambah listener
            }

        } catch (error) {
            console.error('Gagal memuat data pengumuman:', error);
             if (placeholder) placeholder.remove();
             const errorMsg = document.createElement('p');
             errorMsg.className = 'error-text';
             errorMsg.textContent = 'Gagal memuat pengumuman. Coba refresh halaman.';
             pengumumanContainer.appendChild(errorMsg);
        }
    }

    // Fungsi untuk toggle tampilan pengumuman
    function toggleAnnouncements() {
        isExpanded = !isExpanded; // Balik status
        const allItems = pengumumanContainer.querySelectorAll('.info-item');

        allItems.forEach((item, index) => {
            if (index >= initialShowCount) { // Target item setelah jumlah awal
                if (isExpanded) {
                    item.classList.remove('announcement-hidden'); // Tampilkan
                } else {
                    item.classList.add('announcement-hidden'); // Sembunyikan
                }
            }
        });

        // Ubah teks tombol
        toggleBtn.textContent = isExpanded ? 'Perkecil' : 'Baca Selengkapnya';
    }

    // Panggil fungsi untuk memuat pengumuman
    loadUpdates();

}); 