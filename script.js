
const postersData = [
    { src: "1.jpg", caption: "April 23rd, before we got together." },
    { src: "2.jpg", caption: "The picture Kobi took of us kissing." },
    { src: "3.jpg", caption: "Being silly at your house, freshly together." },
    { src: "4.jpg", caption: "Our first \"photoshoot\" on your mac." },
    { src: "5.jpg", caption: "The best couple vashlovani has ever seen." },
    { src: "6.jpg", caption: "ori loti :)" },
    { src: "7.jpg", caption: "Our \"hike\"." },
    { src: "8.jpg", caption: "Swapping clothes. p.s. nasha xar" },
    { src: "9.jpg", caption: "xute xute chagexute." },
    { src: "10.jpg", caption: "Our trip to kiketi. vgijdebi am potoze." }
];

const wall = document.getElementById('wall');
const letterEl = document.getElementById('letter');
const modal = document.getElementById('poster-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const closeBtn = document.getElementById('close-btn');


function isOverlappingText(x, y, width, height) {
    const letterRect = letterEl.getBoundingClientRect();
    
    // Increased the buffer to 30 to account for larger posters
    const excludeBox = {
        left: letterRect.left - 30,
        right: letterRect.right + 30,
        top: letterRect.top - 30,
        bottom: letterRect.bottom + 30
    };

    const posterBox = { left: x, right: x + width, top: y, bottom: y + height };

    return !(posterBox.right < excludeBox.left || 
             posterBox.left > excludeBox.right || 
             posterBox.bottom < excludeBox.top || 
             posterBox.top > excludeBox.bottom);
}

postersData.forEach((data) => {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'poster-container';

    const posterDiv = document.createElement('div');
    posterDiv.className = 'poster';

    const img = document.createElement('img');
    img.src = data.src;
    posterDiv.appendChild(img);
    wrapperDiv.appendChild(posterDiv);

    const roll = Math.random();
    if (roll > 0.65) {
        wrapperDiv.classList.add('peel-tr');
    } else if (roll > 0.3) {
        wrapperDiv.classList.add('peel-bl');
    }

    const rotation = Math.random() * 32 - 16; 
    
    let x, y;
    let overlapping = true;
    let attempts = 0;
    

    const posterWidth = 220; 
    const posterHeight = 270; 

    
    while (overlapping && attempts < 500) {
        x = Math.random() * (window.innerWidth - posterWidth - 50) + 25;
        y = Math.random() * (wall.scrollHeight - posterHeight - 50) + 25;
        overlapping = isOverlappingText(x, y, posterWidth, posterHeight);
        attempts++;
    }

    wrapperDiv.style.left = `${x}px`;
    wrapperDiv.style.top = `${y}px`;
    wrapperDiv.style.transform = `rotate(${rotation}deg)`;

    wrapperDiv.addEventListener('mouseenter', () => {
        wrapperDiv.style.transform = `scale(1.15) rotate(0deg)`;
    });

    wrapperDiv.addEventListener('mouseleave', () => {
        wrapperDiv.style.transform = `rotate(${rotation}deg)`;
    });

    wrapperDiv.addEventListener('click', () => {
        modalImg.src = data.src;
        modalCaption.textContent = data.caption;
        modal.style.display = 'flex';
    });

    wall.appendChild(wrapperDiv);
});

// --- 3. MODAL DISMISSAL ---
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});