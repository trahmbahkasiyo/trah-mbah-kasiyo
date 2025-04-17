// Silsilah Manager - Client-side data management
const SilsilahManager = {
    members: [], // Array untuk menyimpan data dari silsilah.json
    dataLoaded: false,

    // Load data from localStorage or use default data
    loadData: function() {
        const savedData = localStorage.getItem('silsilahData');
        if (savedData) {
            this.members = JSON.parse(savedData);
            this.dataLoaded = true;
            console.log('Data silsilah berhasil dimuat.');
            return this.members;
        } else {
            // Default data structure
            this.members = {
                keluargaBesar: "Kasio Mertodimbejo & Ngatinem Mertodimbejo",
                lokasi: "Dsn. Ngronggo Ds. Getas Kec. Playen Kab. Gunung Kidul - D.I. Yogyakarta",
                kepalaKeluarga: [
                    {
                        id: "kasio",
                        nama: "KASIO MERTODIMBEJO",
                        lokasi: "GUNUNG KIDUL",
                        generasi: "KEPALA KELUARGA",
                        gender: "male",
                        foto: "img/placeholder.png"
                    },
                    {
                        id: "ngatinem",
                        nama: "NGATINEM MERTODIMBEJO",
                        lokasi: "GUNUNG KIDUL",
                        generasi: "KEPALA KELUARGA",
                        gender: "female",
                        foto: "img/placeholder.png"
                    }
                ],
                anak: [
                    {
                        id: "kasiran",
                        nama: "KASIRAN (ALM)",
                        lokasi: "GUNUNG KIDUL",
                        generasi: "ANAK KE-1",
                        gender: "male",
                        foto: "img/placeholder.png",
                        children: []
                    },
                    {
                        id: "sagirah",
                        nama: "SAGIRAH (ALM)",
                        lokasi: "GUNUNG KIDUL",
                        generasi: "ANAK KE-2",
                        gender: "female",
                        foto: "img/placeholder.png",
                        children: []
                    },
                    {
                        id: "sagiran",
                        nama: "SAGIRAN (ALM)",
                        lokasi: "GUNUNG KIDUL",
                        generasi: "ANAK KE-3",
                        gender: "male",
                        foto: "img/placeholder.png",
                        children: []
                    },
                    {
                        id: "sadirah",
                        nama: "SADIRAH",
                        lokasi: "GUNUNG KIDUL",
                        generasi: "ANAK KE-4",
                        gender: "female",
                        foto: "img/placeholder.png",
                        children: []
                    },
                    {
                        id: "midah",
                        nama: "MIDAH",
                        lokasi: "GUNUNG KIDUL",
                        generasi: "ANAK KE-5",
                        gender: "female",
                        foto: "img/placeholder.png",
                        children: []
                    },
                    {
                        id: "dasiran",
                        nama: "DASIRAN",
                        lokasi: "GUNUNG KIDUL",
                        generasi: "ANAK KE-6",
                        gender: "male",
                        foto: "img/placeholder.png",
                        children: []
                    },
                    {
                        id: "suyadi",
                        nama: "SUYADI",
                        lokasi: "GUNUNG KIDUL",
                        generasi: "ANAK KE-7",
                        gender: "male",
                        foto: "img/placeholder.png",
                        children: []
                    },
                    {
                        id: "pasinem",
                        nama: "PASINEM",
                        lokasi: "GUNUNG KIDUL",
                        generasi: "ANAK KE-8",
                        gender: "female",
                        foto: "img/placeholder.png",
                        children: []
                    }
                ],
                generasiNames: [
                    "Anak",
                    "Putu (Cucu)",
                    "Buyu (Cicit)",
                    "Canggah",
                    "Wareng",
                    "Udhek-udhek",
                    "Gantung siwur",
                    "Cicip Moning",
                    "Petarangan Bobrok",
                    "Gropak Senthe",
                    "Gropak Waton",
                    "Cendheng",
                    "Giyeng",
                    "Cumpleng",
                    "Ampleng",
                    "Menyaman",
                    "Menya Menya",
                    "Trah Tumerah"
                ]
            };
            this.dataLoaded = true;
            console.log('Data silsilah berhasil dimuat.');
            return this.members;
        }
    },
    
    // Save data to localStorage
    saveData: function(data) {
        localStorage.setItem('silsilahData', JSON.stringify(data));
    },
    
    // Search for family members
    searchMembers: function(keyword = "", generasiFilter = "", jenisKelaminFilter = "") {
        if (!this.dataLoaded) {
            console.warn("Mencoba mencari saat data belum dimuat.");
            return []; // Kembalikan array kosong jika data belum siap
        }

        const keywordLower = keyword.toLowerCase();
        let filteredMembers = this.members;

        // 1. Filter berdasarkan keyword (nama)
        if (keywordLower) {
            filteredMembers = filteredMembers.filter(person =>
                person.nama && person.nama.toLowerCase().includes(keywordLower)
            );
        }

        // 2. Filter berdasarkan Generasi
        if (generasiFilter) {
            filteredMembers = filteredMembers.filter(person =>
                person.generasi === generasiFilter
            );
        }

        // 3. Filter berdasarkan Jenis Kelamin
        // Pastikan nama field di JSON (misal 'jenisKelamin') sesuai
        if (jenisKelaminFilter) {
             filteredMembers = filteredMembers.filter(person =>
                 person.gender && person.gender.toLowerCase() === jenisKelaminFilter.toLowerCase()
             );
        }

        // 4. (Opsional) Filter berdasarkan Status
        // if (statusFilter) {
        //     filteredMembers = filteredMembers.filter(person =>
        //         person.status && person.status.toLowerCase() === statusFilter.toLowerCase()
        //     );
        // }

        return filteredMembers;
    },
    
    // Initialize data if not exists
    init: function() {
        if (!localStorage.getItem('silsilahData')) {
            const defaultData = this.loadData();
            this.saveData(defaultData);
        }
    },

    isDataLoaded() {
        return this.dataLoaded;
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    SilsilahManager.init();
});