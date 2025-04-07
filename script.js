const familyData = {
    id: 1,
    name: "Mbah Kasiyo",
    spouse: "Mbah Ngatinem",
    children: [
        {
            id: 2,
            name: "Kasiran",
            status: "Alm",
            children: []
        },
        {
            id: 3,
            name: "Sagirah",
            children: []
        },
        {
            id: 4,
            name: "Sagiran",
            status: "Alm",
            children: []
        },
        {
            id: 5,
            name: "Sadirah",
            children: []
        }
    ]
};

function renderFamilyTree() {
    const treeContainer = document.querySelector('.family-tree');
    const rootMember = createFamilyMemberElement(familyData);
    treeContainer.appendChild(rootMember);
}

function createFamilyMemberElement(member) {
    const div = document.createElement('div');
    div.className = 'family-member';
    div.setAttribute('data-id', member.id);

    const nameSpan = document.createElement('span');
    nameSpan.className = 'member-name';
    nameSpan.textContent = member.name;
    
    if (member.status) {
        nameSpan.textContent += ` (${member.status})`;
    }
    
    div.appendChild(nameSpan);

    if (member.spouse) {
        const spouseSpan = document.createElement('span');
        spouseSpan.className = 'member-spouse';
        spouseSpan.textContent = ` & ${member.spouse}`;
        div.appendChild(spouseSpan);
    }

    if (member.children && member.children.length > 0) {
        const childrenDiv = document.createElement('div');
        childrenDiv.className = 'children';
        member.children.forEach(child => {
            childrenDiv.appendChild(createFamilyMemberElement(child));
        });
        div.appendChild(childrenDiv);
    }

    return div;
}

// Tambahkan setelah fungsi createFamilyMemberElement

function tambahAnggotaKeluarga(parentId, data) {
    function findParent(tree, id) {
        if (tree.id === id) return tree;
        for (let child of tree.children || []) {
            const found = findParent(child, id);
            if (found) return found;
        }
        return null;
    }

    const parent = findParent(familyData, parentId);
    if (parent) {
        parent.children = parent.children || [];
        parent.children.push({
            id: Date.now(),
            name: data.nama,
            spouse: data.pasangan,
            status: data.status,
            photoUrl: data.photoUrl,
            children: []
        });
        renderFamilyTree();
        simpanData();
    }
}

function simpanData() {
    localStorage.setItem('silsilahData', JSON.stringify(familyData));
}

function loadData() {
    const data = localStorage.getItem('silsilahData');
    if (data) {
        familyData = JSON.parse(data);
        renderFamilyTree();
    }
}

// Tambahkan di event listener DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    
    document.getElementById('simpanAnggota').addEventListener('click', () => {
        const data = {
            nama: document.getElementById('namaAnggota').value,
            pasangan: document.getElementById('pasanganAnggota').value,
            status: document.getElementById('statusAnggota').value
        };
        
        const parentId = document.getElementById('anggotaId').value;
        tambahAnggotaKeluarga(parentId, data);
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('anggotaModal'));
        modal.hide();
    });
});


function cariAnggota(keyword) {
    const searchResults = [];
    
    function searchInTree(node) {
        if (node.name.toLowerCase().includes(keyword.toLowerCase())) {
            searchResults.push(node);
        }
        if (node.children) {
            node.children.forEach(child => searchInTree(child));
        }
    }
    
    searchInTree(familyData);
    return searchResults;
}

document.getElementById('searchButton').addEventListener('click', () => {
    const keyword = document.querySelector('.search-input').value;
    const results = cariAnggota(keyword);
    
    const treeContainer = document.querySelector('.family-tree');
    treeContainer.innerHTML = '';
    
    results.forEach(member => {
        const memberElement = createFamilyMemberElement(member);
        memberElement.classList.add('search-result');
        treeContainer.appendChild(memberElement);
    });
});


function editAnggota(id) {
    const member = findMember(familyData, id);
    if (member) {
        document.getElementById('anggotaId').value = id;
        document.getElementById('namaAnggota').value = member.name;
        document.getElementById('pasanganAnggota').value = member.spouse || '';
        document.getElementById('statusAnggota').value = member.status || '';
        
        const modal = new bootstrap.Modal(document.getElementById('anggotaModal'));
        modal.show();
    }
}

function findMember(tree, id) {
    if (tree.id === id) return tree;
    if (tree.children) {
        for (let child of tree.children) {
            const found = findMember(child, id);
            if (found) return found;
        }
    }
    return null;
}

function updateAnggota(id, data) {
    const member = findMember(familyData, id);
    if (member) {
        member.name = data.nama;
        member.spouse = data.pasangan;
        member.status = data.status;
        if (data.photoUrl) {
            member.photoUrl = data.photoUrl;
        }
        renderFamilyTree();
        simpanData();
    }
}

// Update event listener untuk tombol simpan
document.getElementById('simpanAnggota').addEventListener('click', () => {
    const id = document.getElementById('anggotaId').value;
    const data = {
        nama: document.getElementById('namaAnggota').value,
        pasangan: document.getElementById('pasanganAnggota').value,
        status: document.getElementById('statusAnggota').value
    };
    
    if (id) {
        updateAnggota(id, data);
    } else {
        tambahAnggotaKeluarga(familyData.id, data);
    }
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('anggotaModal'));
    modal.hide();
});


// Fungsi untuk export data
function exportData() {
    const data = JSON.stringify(familyData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'silsilah-mbah-kasiyo.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Fungsi untuk import data
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            familyData = data;
            renderFamilyTree();
            simpanData();
            alert('Data berhasil diimpor!');
        } catch (error) {
            alert('Format file tidak valid!');
        }
    };
    reader.readAsText(file);
}


function printSilsilah() {
    const printWindow = window.open('', '_blank');
    const content = document.querySelector('.family-tree').innerHTML;
    
    printWindow.document.write(`
        <html>
            <head>
                <title>Silsilah Trah Mbah Kasiyo</title>
                <link href="styles.css" rel="stylesheet">
            </head>
            <body>
                <h1 class="text-center">Silsilah Trah Mbah Kasiyo</h1>
                <div class="family-tree print-view">
                    ${content}
                </div>
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}


const eventSystem = {
    events: [],
    
    addEvent(event) {
        this.events.push({
            id: Date.now(),
            ...event,
            createdAt: new Date()
        });
        this.saveEvents();
        this.renderEvents();
        notificationSystem.add(`Acara baru: ${event.name}`, 'success');
    },
    
    saveEvents() {
        localStorage.setItem('familyEvents', JSON.stringify(this.events));
    },
    
    loadEvents() {
        const saved = localStorage.getItem('familyEvents');
        if (saved) {
            this.events = JSON.parse(saved);
            this.renderEvents();
        }
    },
    
    renderEvents() {
        const container = document.getElementById('eventList');
        container.innerHTML = '';
        
        this.events
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .forEach(event => {
                const element = document.createElement('div');
                element.className = 'list-group-item';
                element.innerHTML = `
                    <h5>${event.name}</h5>
                    <p class="mb-1">Tanggal: ${new Date(event.date).toLocaleDateString()}</p>
                    <p class="mb-1">Lokasi: ${event.location}</p>
                    <p class="mb-1">${event.description}</p>
                `;
                container.appendChild(element);
            });
    }
};

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const id = document.getElementById('anggotaId').value;
    const data = {
        nama: document.getElementById('namaAnggota').value,
        pasangan: document.getElementById('pasanganAnggota').value,
        status: document.getElementById('statusAnggota').value
    };
    
    if (id) {
        updateAnggota(id, data);
    } else {
        tambahAnggotaKeluarga(familyData.id, data);
    }
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('anggotaModal'));
    modal.hide();
});


// Fungsi untuk export data
function exportData() {
    const data = JSON.stringify(familyData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'silsilah-mbah-kasiyo.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Fungsi untuk import data
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            familyData = data;
            renderFamilyTree();
            simpanData();
            alert('Data berhasil diimpor!');
        } catch (error) {
            alert('Format file tidak valid!');
        }
    };
    reader.readAsText(file);
}


function printSilsilah() {
    const printWindow = window.open('', '_blank');
    const content = document.querySelector('.family-tree').innerHTML;
    
    printWindow.document.write(`
        <html>
            <head>
                <title>Silsilah Trah Mbah Kasiyo</title>
                <link href="styles.css" rel="stylesheet">
            </head>
            <body>
                <h1 class="text-center">Silsilah Trah Mbah Kasiyo</h1>
                <div class="family-tree print-view">
                    ${content}
                </div>
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}


const notificationSystem = {
    notifications: [],
    
    add(message, type = 'info') {
        const notification = {
            id: Date.now(),
            message,
            type,
            date: new Date()
        };
        this.notifications.unshift(notification);
        this.display(notification);
        this.save();
    },
    
    display(notification) {
        const container = document.getElementById('notificationContainer');
        const element = document.createElement('div');
        element.className = `alert alert-${notification.type} alert-dismissible fade show`;
        element.innerHTML = `
            ${notification.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        container.appendChild(element);
    },
    
    save() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }
};


function hitungStatistik() {
    let totalAnggota = 0;
    let totalGenerasi = 0;
    let totalKeluarga = 0;
    
    function hitungDalamPohon(node, level = 0) {
        totalAnggota++;
        totalGenerasi = Math.max(totalGenerasi, level);
        if (node.children && node.children.length > 0) {
            totalKeluarga++;
            node.children.forEach(child => hitungDalamPohon(child, level + 1));
        }
    }
    
    hitungDalamPohon(familyData);
    
    document.getElementById('totalAnggota').textContent = totalAnggota;
    document.getElementById('totalGenerasi').textContent = totalGenerasi + 1;
    document.getElementById('totalKeluarga').textContent = totalKeluarga;
    document.getElementById('totalCabang').textContent = familyData.children.length;
}


const beritaSystem = {
    berita: [],
    
    tambahBerita(data) {
        const berita = {
            id: Date.now(),
            ...data,
            tanggal: new Date(),
            likes: 0,
            comments: []
        };
        this.berita.unshift(berita);
        this.simpanBerita();
        this.renderBerita();
        notificationSystem.add('Berita baru telah ditambahkan', 'info');
    },
    
    simpanBerita() {
        localStorage.setItem('familyNews', JSON.stringify(this.berita));
    },
    
    loadBerita() {
        const saved = localStorage.getItem('familyNews');
        if (saved) {
            this.berita = JSON.parse(saved);
            this.renderBerita();
        }
    },
    
    renderBerita() {
        const container = document.getElementById('daftarBerita');
        container.innerHTML = this.berita.map(item => `
            <div class="berita-item ${item.kategori}">
                <h4>${item.judul}</h4>
                <div class="berita-meta">
                    <span class="tanggal">${new Date(item.tanggal).toLocaleDateString()}</span>
                    <span class="kategori">${item.kategori}</span>
                </div>
                <p>${item.isi}</p>
                <div class="berita-actions">
                    <button class="btn btn-sm btn-like" onclick="beritaSystem.likeBerita(${item.id})">
                        ❤️ ${item.likes}
                    </button>
                    <button class="btn btn-sm btn-comment" onclick="beritaSystem.showComments(${item.id})">
                        💬 ${item.comments.length}
                    </button>
                </div>
            </div>
        `).join('');
    },
    
    likeBerita(id) {
        const berita = this.berita.find(b => b.id === id);
        if (berita) {
            berita.likes++;
            this.simpanBerita();
            this.renderBerita();
        }
    }
};