const dragWindow = document.querySelector('.theme-wrapper');
const titleBar = document.querySelector('.title-bar');

let isDragging = false;
let startMouseX = 0;
let startMouseY = 0;
let startWindowX = 0;
let startWindowY = 0;

titleBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
    startWindowX = dragWindow.offsetLeft;
    startWindowY = dragWindow.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    let newX = startWindowX + (e.clientX - startMouseX);
    let newY = startWindowY + (e.clientY - startMouseY);

    let maxX = window.innerWidth - dragWindow.offsetWidth;
    let maxY = window.innerHeight - dragWindow.offsetHeight;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    dragWindow.style.left = newX + 'px';
    dragWindow.style.top = newY + 'px';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

const closeBtn = document.getElementById('close-btn');
const bsod = document.getElementById('bsod');
closeBtn.addEventListener('click', () => {
    bsod.style.display = 'block';
});

document.addEventListener('keydown', () => {
    if (bsod.style.display === 'block') {
        bsod.style.display = 'none';
    }
})