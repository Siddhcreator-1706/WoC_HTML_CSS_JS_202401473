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
    localStorage.removeItem('LoggedIn');
}

AOS.init();