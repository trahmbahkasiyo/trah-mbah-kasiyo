document.addEventListener('DOMContentLoaded', function() {
    const familyDiagram = document.querySelector('.family-diagram');
    
    if (familyDiagram) {
        familyDiagram.addEventListener('click', function() {
            const popup = document.createElement('div');
            popup.className = 'popup-overlay';
            
            const popupContent = document.createElement('div');
            popupContent.className = 'popup-content';
            
            const popupImg = document.createElement('img');
            popupImg.src = this.src;
            
            popupContent.appendChild(popupImg);
            popup.appendChild(popupContent);
            document.body.appendChild(popup);
            
            popup.style.display = 'block';
            
            popup.onclick = function() {
                popup.remove();
            };
        });
    }
});