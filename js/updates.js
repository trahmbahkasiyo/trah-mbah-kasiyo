document.addEventListener('DOMContentLoaded', () => {
    const updateContainer = document.querySelector('.update-info');
    
    fetch('/data/updates.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const updates = data.updates.map(update => `
                <div class="info-item">
                    <p class="date">${update.date}</p>
                    <p class="title">${update.title}</p>
                    <p class="content">${update.content}</p>
                </div>
            `).join('');
            
            updateContainer.innerHTML = `
                <h3>UPDATE INFO TERBARU</h3>
                ${updates}
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            updateContainer.innerHTML = '<p class="error-notice">Gagal memuat data</p>';
        });
});