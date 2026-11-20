const taskbar = document.querySelector('.taskbar');
const windows = document.querySelectorAll('.theme-wrapper');

let activeWindow = null;
let isDragging = false;
let startMouseX = 0;
let startMouseY = 0;
let startWindowX = 0;
let startWindowY = 0;

windows.forEach(win => {
    const titleBar = win.querySelector('.title-bar');
    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        activeWindow = win;
        startMouseX = e.clientX;
        startMouseY = e.clientY;
        startWindowX = win.offsetLeft;
        startWindowY = win.offsetTop;
        
        // Bring the clicked window to the front
        windows.forEach(w => w.style.zIndex = 100);
        win.style.zIndex = 2000;
    });
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging || !activeWindow) return;
    let newX = startWindowX + (e.clientX - startMouseX);
    let newY = startWindowY + (e.clientY - startMouseY);

    let maxX = window.innerWidth - activeWindow.offsetWidth;
    let maxY = window.innerHeight - activeWindow.offsetHeight - taskbar.offsetHeight;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    activeWindow.style.left = newX + 'px';
    activeWindow.style.top = newY + 'px';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    activeWindow = null;
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
});

function updateTime() {
    const clock = document.getElementById('clock');
    const now = new Date();
    clock.innerText = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit'});
}

updateTime();
setInterval(updateTime, 1000);

const appLinks = document.querySelectorAll('.app-link');
const popupTemplate = document.getElementById('coming-soon-popup');

appLinks.forEach(link => {
    link.addEventListener('click', () => {
        const appName = link.querySelector('span').innerText;
        
        const popupId = 'popup-' + appName.replace(/\s+/g, '-').toLowerCase();

        const existingPopup = document.getElementById(popupId);
        if (existingPopup) {
            existingPopup.remove();
        }

        const newWindow = popupTemplate.cloneNode(true);
        newWindow.id = popupId;
        newWindow.style.display = 'block';
        
        newWindow.querySelector('.title-text').innerText = appName + '.exe';
        newWindow.querySelector('main p').innerHTML = `<b>${appName}</b> is not available right now.<br><br>Coming soon!`;

        const openWindows = document.querySelectorAll('.theme-wrapper').length;
        newWindow.style.left = (35 + (openWindows * 2)) + '%';
        newWindow.style.top = (30 + (openWindows * 2)) + '%';

        newWindow.querySelector('.title-buttons button').addEventListener('click', () => {
            newWindow.remove();
        });

        const titleBar = newWindow.querySelector('.title-bar');
        titleBar.addEventListener('mousedown', (e) => {
            isDragging = true;
            activeWindow = newWindow;
            startMouseX = e.clientX;
            startMouseY = e.clientY;
            startWindowX = newWindow.offsetLeft;
            startWindowY = newWindow.offsetTop;
            
            document.querySelectorAll('.theme-wrapper').forEach(w => w.style.zIndex = 100);
            newWindow.style.zIndex = 2000;
        });

        document.querySelectorAll('.theme-wrapper').forEach(w => w.style.zIndex = 100);
        newWindow.style.zIndex = 2000;
        document.body.appendChild(newWindow);
    });
});