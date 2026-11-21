const taskbar = document.querySelector('.taskbar');
const windows = document.querySelectorAll('.theme-wrapper');
const startBtn = document.querySelector('.start-btn');
const startMenu = document.getElementById('start-menu');

let activeWindow = null;
let isDragging = false;
let startMouseX = 0;
let startMouseY = 0;
let startWindowX = 0;
let startWindowY = 0;

windows.forEach(win => {
    const titleBar = win.querySelector('.title-bar');
    const startDrag = (e) => {
        isDragging = true;
        activeWindow = win;
        startMouseX = e.clientX;
        startMouseY = e.clientY;
        startWindowX = win.offsetLeft;
        startWindowY = win.offsetTop;
        
        document.querySelectorAll('.theme-wrapper').forEach(w => w.style.zIndex = 100);
        win.style.zIndex = 2000;
    };

    titleBar.addEventListener('pointerdown', startDrag);
});

const dragMove = (e) => {
    if (!isDragging || !activeWindow) return;

    let newX = startWindowX + (e.clientX - startMouseX);
    let newY = startWindowY + (e.clientY - startMouseY);

    let maxX = window.innerWidth - activeWindow.offsetWidth;
    let maxY = window.innerHeight - activeWindow.offsetHeight - taskbar.offsetHeight;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    activeWindow.style.left = newX + 'px';
    activeWindow.style.top = newY + 'px';
};

document.addEventListener('pointermove', dragMove);

const dragEnd = () => {
    isDragging = false;
    activeWindow = null;
};

document.addEventListener('pointerup', dragEnd);

const closeBtn = document.getElementById('close-btn');
const bsod = document.getElementById('bsod');
closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    bsod.style.display = 'block';
});

document.addEventListener('keydown', () => {
    if (bsod.style.display === 'block') {
        bsod.style.display = 'none';
    }
});

bsod.addEventListener('click', () => {
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

let popupSpawnCount = 0;

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

        document.body.appendChild(newWindow);

        popupSpawnCount++;
        let cascadeOffset = (popupSpawnCount % 10) * 20;
        let idealX = (window.innerWidth > 768 ? window.innerWidth * 0.35 : window.innerWidth * 0.05) + cascadeOffset;
        let idealY = (window.innerWidth > 768 ? window.innerHeight * 0.30 : window.innerHeight * 0.1) + cascadeOffset;
        
        let maxX = window.innerWidth - newWindow.offsetWidth;
        let maxY = window.innerHeight - newWindow.offsetHeight - taskbar.offsetHeight;
        
        newWindow.style.left = Math.max(0, Math.min(idealX, maxX)) + 'px';
        newWindow.style.top = Math.max(0, Math.min(idealY, maxY)) + 'px';

        newWindow.querySelector('.title-buttons button').addEventListener('click', () => {
            newWindow.remove();
        });

        const titleBar = newWindow.querySelector('.title-bar');
        const startDragPopup = (e) => {
            isDragging = true;
            activeWindow = newWindow;
            startMouseX = e.clientX;
            startMouseY = e.clientY;
            startWindowX = newWindow.offsetLeft;
            startWindowY = newWindow.offsetTop;
            
            document.querySelectorAll('.theme-wrapper').forEach(w => w.style.zIndex = 100);
            newWindow.style.zIndex = 2000;
        };

        titleBar.addEventListener('pointerdown', startDragPopup);

        document.querySelectorAll('.theme-wrapper').forEach(w => w.style.zIndex = 100);
        newWindow.style.zIndex = 2000;
    });
});

startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (startMenu.style.display === 'flex') {
        startMenu.style.display = 'none';
    } else {
        startMenu.style.display = 'flex';
    }
});

document.addEventListener('click', (e) => {
    if (startMenu.style.display === 'flex' && !startMenu.contains(e.target)) {
        startMenu.style.display = 'none';
    }
});

const menuAbout = document.getElementById('menu-about');
const aboutWindow = document.getElementById('about-me-window');
const closeAboutBtn = document.getElementById('close-about-btn');

menuAbout.addEventListener('click', () => {
    aboutWindow.style.display = 'block';
    startMenu.style.display = 'none';
    
    document.querySelectorAll('.theme-wrapper').forEach(w => w.style.zIndex = 100);
    aboutWindow.style.zIndex = 2000;
});

closeAboutBtn.addEventListener('click', () => {
    aboutWindow.style.display = 'none';
});

const menuExperience = document.getElementById('menu-experience');
const experienceWindow = document.getElementById('experience-window');
const closeExperienceBtn = document.getElementById('close-experience-btn');

menuExperience.addEventListener('click', () => {
    experienceWindow.style.display = 'block';
    startMenu.style.display = 'none';
    
    document.querySelectorAll('.theme-wrapper').forEach(w => w.style.zIndex = 100);
    menuExperience.style.zIndex = 2000;
});

closeExperienceBtn.addEventListener('click', () => {
    experienceWindow.style.display = 'none';
});

const menuProjects = document.getElementById('menu-projects');
const projectsWindow = document.getElementById('projects-window');
const closeProjectsBtn = document.getElementById('close-projects-btn');

menuProjects.addEventListener('click', () => {
    projectsWindow.style.display = 'block';
    startMenu.style.display = 'none';
    
    document.querySelectorAll('.theme-wrapper').forEach(w => w.style.zIndex = 100);
    menuProjects.style.zIndex = 2000;
});

closeProjectsBtn.addEventListener('click', () => {
    projectsWindow.style.display = 'none';
});