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

function iconbarCloser(){
    if(window.innerWidth <= 768){
        document.getElementById('iconbar-tablet').style.display = 'none';
        document.querySelector('body').style.overflowY = 'auto';
    }
    if(window.innerWidth > 768){
        console.log('else');
        document.getElementById('iconbar-tablet').style.display = 'block';
        document.querySelector('body').style.overflowY = 'auto';
    }
}


AOS.init();