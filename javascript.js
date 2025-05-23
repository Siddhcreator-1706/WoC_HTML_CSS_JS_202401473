function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    const toast = document.getElementById('toast');
    document.getElementById('toast').style.display = 'block';
    setTimeout(() => {
        const toast = document.getElementById('toast');
        document.getElementById('toast').style.display = 'none';
    }, 800);
}

function goto(string) {
    localStorage.setItem('searchQuery', string);
    window.location.href = 'Courses.html';
}

function clearData() {
    window.open('Login.html', '_self');
    localStorage.removeItem('LoggedIn');
}

function iconbarActive() {
    const iconbar = document.getElementById('iconbar-tablet').style.display;
    if (iconbar === 'block') {
        document.querySelector('body').style.overflowY = 'auto';
        document.getElementById('iconbar-tablet').style.display = 'none';
    }
    else if (iconbar === 'none' || iconbar === '') {
        document.querySelector('body').style.overflowY = 'hidden';
        document.getElementById('iconbar-tablet').style.display = 'block';
    }
}

function iconbarCloser() {
    if (window.innerWidth <= 768) {
        document.getElementById('iconbar-tablet').style.display = 'none';
    }
    else if (window.innerWidth > 768) {
        document.getElementById('iconbar-tablet').style.display = 'block';
    }
    if (document.querySelector(".PopUp") || document.querySelector(".PopUpCourse")) {
        if (document.querySelector(".PopUpCourse").style.display === 'flex' || document.querySelector(".PopUp").style.display === 'flex') {
            document.querySelector('body').style.overflowY = 'hidden';
        }
    }
    else if (document.querySelector(".chat")) {
        if (document.querySelector(".chat").style.display === 'flex') {
            document.querySelector('body').style.overflowY = 'hidden';
        }
    }
    else {
        document.querySelector('body').style.overflowY = 'auto';
    }
}

window.addEventListener('resize', function () {
    iconbarCloser();
});

AOS.init();