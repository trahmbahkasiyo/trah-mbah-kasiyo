// Main JavaScript for the website
document.addEventListener('DOMContentLoaded', function() {
    // Ganti selector agar menggunakan ID
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const filterGenerasi = document.getElementById('filter-generasi');

    if (searchButton && searchInput && filterGenerasi) {
        searchButton.addEventListener('click', performSearchAndFilter);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearchAndFilter();
            }
        });
    }
    
    function performSearchAndFilter() {
        const keyword = searchInput.value.trim();
        const generasi = filterGenerasi.value; // Dapat "Anak", "Putu", atau ""
        // Dapatkan nilai jenis kelamin dari radio button yang terpilih
        const jenisKelaminRadio = document.querySelector('input[name="jenisKelamin"]:checked');
        const jenisKelamin = jenisKelaminRadio ? jenisKelaminRadio.value : ""; // Dapat "Pria", "Wanita", atau ""

        // --- PENTING ---
        // Asumsi: Ada objek SilsilahManager dengan fungsi searchMembers
        // Fungsi ini HARUS dimodifikasi untuk menerima dan menggunakan filter
        console.log(`Mencari: keyword='${keyword}', generasi='${generasi}', jenisKelamin='${jenisKelamin}'`); // Untuk debugging

        // Pastikan SilsilahManager sudah dimuat dan punya datanya
        if (typeof SilsilahManager !== 'undefined' && SilsilahManager.isDataLoaded()) {
             // Modifikasi SilsilahManager.searchMembers untuk menerima filter
            const results = SilsilahManager.searchMembers(keyword, generasi, jenisKelamin);
            displaySearchResults(results);
        } else {
            // Beri tahu pengguna data belum siap atau error
             alert('Data silsilah belum siap atau gagal dimuat. Coba refresh halaman.');
             // Idealnya, muat data di sini jika belum
             // SilsilahManager.loadData().then(() => {
             //    const results = SilsilahManager.searchMembers(keyword, generasi, jenisKelamin);
             //    displaySearchResults(results);
             // });
        }
    }
    
    function displaySearchResults(results) {
        // Tampilan hasil masih menggunakan alert, idealnya diganti
        if (results.length > 0) {
            let message = `Ditemukan ${results.length} hasil:\n\n`;
            // Batasi jumlah hasil yang ditampilkan di alert
            results.slice(0, 15).forEach(person => {
                message += `- ${person.nama} (Gen: ${person.generasi}, JK: ${person.jenisKelamin || 'N/A'})\n`;
            });
            if (results.length > 15) {
                message += `\n...dan ${results.length - 15} hasil lainnya.`;
            }
            alert(message);
        } else {
            alert('Tidak ditemukan hasil yang sesuai dengan pencarian atau filter Anda.');
        }
    }
    
    // Placeholder image error handler
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            this.src = 'img/placeholder.png';
        };
    });
    
    // --- Fungsi untuk Inisialisasi Interaksi Diagram (TERMASUK DOWNLOAD) ---
    function initializeDiagramInteraction(containerId, imageId, zoomInId, zoomOutId, resetId, downloadId) {
        const diagramContainer = document.getElementById(containerId);
        const diagramImage = document.getElementById(imageId);
        const zoomInBtn = document.getElementById(zoomInId);
        const zoomOutBtn = document.getElementById(zoomOutId);
        const resetBtn = document.getElementById(resetId);
        const downloadBtn = document.getElementById(downloadId);

        if (diagramContainer && diagramImage && zoomInBtn && zoomOutBtn && resetBtn && downloadBtn) {
            let scale = 1;
            let panning = false;
            let pointX = 0;
            let pointY = 0;
            let start = { x: 0, y: 0 };

            function setTransform() {
                diagramImage.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
            }

            zoomInBtn.addEventListener('click', () => {
                scale = Math.min(scale + 0.1, 3);
                setTransform();
            });
            zoomOutBtn.addEventListener('click', () => {
                scale = Math.max(scale - 0.1, 0.5);
                setTransform();
            });
            resetBtn.addEventListener('click', () => {
                scale = 1; pointX = 0; pointY = 0;
                setTransform();
            });
             diagramContainer.addEventListener('mousedown', (e) => {
                 e.preventDefault(); panning = true; diagramContainer.classList.add('grabbing');
                 start = { x: e.clientX - pointX, y: e.clientY - pointY };
             });
             diagramContainer.addEventListener('mouseup', () => { if (panning) { panning = false; diagramContainer.classList.remove('grabbing'); } });
             diagramContainer.addEventListener('mouseleave', () => { if (panning) { panning = false; diagramContainer.classList.remove('grabbing'); } });
             diagramContainer.addEventListener('mousemove', (e) => { if (!panning) return; e.preventDefault(); pointX = (e.clientX - start.x); pointY = (e.clientY - start.y); setTransform(); });

            // --- Download (HQ) ---
            downloadBtn.addEventListener('click', () => {
                if (diagramImage.src) {
                    // Membuat elemen link temporary
                    const link = document.createElement('a');
                    link.href = diagramImage.src;

                    // Mendapatkan nama file dari src
                    const filename = diagramImage.src.substring(diagramImage.src.lastIndexOf('/') + 1);
                    link.download = filename || 'diagram-keluarga-besar.png'; // Nama file saat diunduh

                    // Menambahkan link ke body, klik, lalu hapus
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    alert('Sumber gambar tidak ditemukan.');
                }
            });

            setTransform(); // Inisialisasi
            console.log(`Diagram interaction initialized for: ${containerId}`);
        }
    }

    // --- Deteksi Halaman dan Panggil Inisialisasi Diagram ---
    const bodyBranch = document.body.getAttribute('data-branch');
    const bodyPage = document.body.getAttribute('data-page');

    if (bodyBranch) {
        // Halaman Cabang (Kasiran, Sagirah, dll.)
        initializeDiagramInteraction(
            `${bodyBranch}-diagram-container`,
            `${bodyBranch}-diagram-image`,
            'btn-zoom-in',
            'btn-zoom-out',
            'btn-reset',
            'btn-export'
        );
    } else if (bodyPage === 'keluarga-besar') {
        // Halaman Keluarga Besar
        initializeDiagramInteraction(
            'keluarga-besar-diagram-container',
            'keluarga-besar-diagram-image',
            'btn-zoom-in',
            'btn-zoom-out',
            'btn-reset',
            'btn-download-hq'
        );
    } else if (document.getElementById('main-diagram-container')) {
        // Halaman Beranda (index.html)
        initializeDiagramInteraction(
            'main-diagram-container',
            'main-diagram-image',
            'btn-main-zoom-in',
            'btn-main-zoom-out',
            'btn-main-reset',
            'btn-main-export'
        );
    }
});