const texts = ["Login", "Welcome!"];
const texts2 = ["Sign Up", "Welcome!"];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type() {
    if (document.getElementById('typing')) {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        
        document.getElementById('typing').textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 1000);
        } else {
            setTimeout(type, 100);
        }
    }
    else {
        if (count === texts2.length) {
            count = 0;
        }
        currentText = texts2[count];
        letter = currentText.slice(0, ++index);
        document.getElementById('typing2').textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 1000);
        } else {
            setTimeout(type, 100);
        }
    }
})();

function togglePassword(inputId, eyeId, eyeSlashId) {
    const pwd = document.getElementById(inputId);
    const eye = document.getElementById(eyeId);
    const eyeSlash = document.getElementById(eyeSlashId);
    
    if (pwd.type === "password") {
        pwd.type = "text";
        eye.style.display = "inline";
        eyeSlash.style.display = "none";
    } else {
        pwd.type = "password";
        eye.style.display = "none";
        eyeSlash.style.display = "inline";
    }
}

function toggleTheme() {
    document.body.classList.toggle('light');
    const theme = document.body.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    const themeIcon = document.getElementById('theme-icon');
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light');
        document.getElementById('theme-icon').classList.replace('fa-moon', 'fa-sun');
    }
    // Bubbles Animation
    const canvas = document.getElementById('bubble-canvas');
    const ctx = canvas.getContext('2d');
    let bubbles = [];

    function createBubble() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 8 + 2,
            color: `rgba(255, 255, 255, ${Math.random()})`,
            speed: Math.random() * 1 + 0.5
        };
    }

    function setupBubbles() {
        bubbles = [];
        for (let i = 0; i < 50; i++) {
            bubbles.push(createBubble());
        }
    }

    function animateBubbles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bubbles.forEach(bubble => {
            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
            ctx.fillStyle = bubble.color;
            ctx.fill();
            bubble.y -= bubble.speed;
            if (bubble.y < 0) {
                bubble.y = canvas.height;
                bubble.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animateBubbles);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setupBubbles();
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setupBubbles();
    animateBubbles();
});

document.getElementById('Sign_Up')?.addEventListener('submit', function (e) {
    const data = new FormData(this);
    const email = data.get('Email').trim();
    const password = data.get('password');
    const username = data.get('Username').trim();
    if (localStorage.getItem("user_" + username)) {
        e.preventDefault();
        alert("Username already exists!!!!");
        return;
    }
    if (password !== data.get('verify')) {
        e.preventDefault();
        alert("Both PassWords do not match!!!!");
        return;
    }
    if (!(email.endsWith("@gmail.com") || email.endsWith("@yahoo.com") || email.endsWith("@daiict.ac.in"))) {
        e.preventDefault();
        alert("We accept only Gmail, Yahoo or DAIICT mail ID only");
        return;
    }
    const UserData = {
        Email_Id: email,
        Password: password,
        enrolledCourses: {},
        Coins: 5000,
        chatbot: []
    };
    localStorage.setItem("user_" + username, JSON.stringify(UserData));
});

document.getElementById('Login')?.addEventListener('submit', function (e) {
    const data = new FormData(this);
    const username = data.get("Username");
    if (!localStorage.getItem("user_" + username)) {
        e.preventDefault();
        alert("User don't exist");
        this.reset();
        return;
    }
    const userData = JSON.parse(localStorage.getItem(`user_${username}`));
    const email = data.get("Email");
    if (userData.Email_Id!==email){
        e.preventDefault();
        alert("Incorrect Email-Id");
        return;
    }
    const password = data.get("password");
    if(userData.Password!==password){
        e.preventDefault();
        alert("Incorrect password");    
        return;
    }
    localStorage.setItem("LoggedIn",username);
});