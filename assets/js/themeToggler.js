const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const boxTitle = document.getElementById("titleBox")
const toggleBtn = document.getElementById("toggleButton")

function getSystemTheme() {
    return prefersDarkScheme.matches ? 'dark' : 'light';
}

function applyTheme(themeName) {
    const theme = themeName === 'dark' ? 'dark' : 'light';
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(theme + '-theme');

    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '<span>☀️</span>' : '<span>🌙</span>';
        themeToggle.setAttribute(
            'aria-label',
            theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
        );
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('themeMode');
    const activeTheme = savedTheme === 'dark' || savedTheme === 'light' ?
        savedTheme :
        getSystemTheme();

    localStorage.setItem('themeMode', activeTheme);
    applyTheme(activeTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        const currentMode = localStorage.getItem('themeMode') || getSystemTheme();
        const nextTheme = currentMode === 'dark' ? 'light' : 'dark';
        
        localStorage.setItem('themeMode', nextTheme);
        applyTheme(nextTheme);
    });
    toggleBtn.addEventListener('click', () => {
        boxTitle.classList.toggle("titleToggle")
    })
}

const systemListener = (event) => {
    const savedTheme = localStorage.getItem('themeMode');

    if (!savedTheme) {
        applyTheme(event.matches ? 'dark' : 'light');
    }
};

if (typeof prefersDarkScheme.addEventListener === 'function') {
    prefersDarkScheme.addEventListener('change', systemListener);
} else if (typeof prefersDarkScheme.addListener === 'function') {
    prefersDarkScheme.addListener(systemListener);
}

initializeTheme();