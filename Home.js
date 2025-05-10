const mainque = "Hi! Hope you're doing well😊. Tell me the course name and I can help you with important information about that course. Here is the list of available courses:<br>- Tally<br>- XERO<br>- MYOB<br>- QBOOKS<br>- SAGE<br>- Python Programming<br>- Data Science Fundamentals<br>- Web Development Bootcamp<br>- Graphic Design<br>- Mobile App Development<br>- Cybersecurity Essentials<br>- Cloud Computing<br>- Artificial Intelligence<br>- Blockchain Technology<br>- UI/UX Design<br>- Digital Photography<br>- Content Writing<br>- Video Editing<br>- Quant Computing<br><br>Which course would you like information about🤔?<br>Write 'Question' to get list again.<br>Click 'Clear' to restart the chat from beginning.";

const mainres = 'The course you are looking for is not available😞. Please check the list of courses.';

const answer = 'Thanks for chatting with us. Hope you enjoyed it.😁';

const courses = [
    { name: 'Tally', cost: '500', time: 4, contact: '+91 98765 43210' },
    { name: 'XERO', cost: '1000', time: 6, contact: '+91 98765 43211' },
    { name: 'MYOB', cost: '0', time: 1, contact: '+91 98765 43212' },
    { name: 'QBOOKS', cost: '500', time: 5, contact: '+91 98765 43213' },
    { name: 'SAGE', cost: '750', time: 7, contact: '+91 98765 43214' },
    { name: 'Python Programming', cost: '600', time: 8, contact: '+91 98765 43215' },
    { name: 'Data Science Fundamentals', cost: '850', time: 9, contact: '+91 98765 43216' },
    { name: 'Web Development Bootcamp', cost: '250', time: 10, contact: '+91 98765 43217' },
    { name: 'Graphic Design', cost: '0', time: 4, contact: '+91 98765 43218' },
    { name: 'Mobile App Development', cost: '900', time: 7, contact: '+91 98765 43219' },
    { name: 'Cybersecurity Essentials', cost: '950', time: 6, contact: '+91 98765 43220' },
    { name: 'Cloud Computing', cost: '800', time: 5, contact: '+91 98765 43221' },
    { name: 'Artificial Intelligence', cost: '1000', time: 8, contact: '+91 98765 43222' },
    { name: 'Blockchain Technology', cost: '1100', time: 7, contact: '+91 98765 43223' },
    { name: 'UI/UX Design', cost: '700', time: 5, contact: '+91 98765 43224' },
    { name: 'Digital Photography', cost: '550', time: 4, contact: '+91 98765 43225' },
    { name: 'Content Writing', cost: '400', time: 3, contact: '+91 98765 43226' },
    { name: 'Video Editing', cost: '650', time: 6, contact: '+91 98765 43227' },
    { name: 'Quant Computing', cost: '0', time: 4, contact: '+91 98765 43228' }
];

window.addEventListener('DOMContentLoaded', () => {
    flip();
    dynamicImage();
    progress('progressValue2', 'progressRing2', 3, 3000, '1');
    progress('progressValue', 'progressRing', 5, 5000, '2');
    messageinitials(mainque, 'Question');
    initializeChatbot();
    document.getElementById('Queryin').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            document.getElementById('Send').click();
        }
    });
});

function dynamicImage() {
    const images = [
        "images/dynamic1.jpg",
        "images/dynamic2.jpg",
    ];

    let index = 0;
    const img = document.getElementById("dynamicImage");

    img.style.transition = "all 0.6s ease-in-out";

    setInterval(() => {
        img.style.opacity = 0;
        img.style.transform = "scale(0.95)";

        setTimeout(() => {
            index = (index + 1) % images.length;
            img.src = images[index];

            img.style.opacity = 1;
            img.style.transform = "scale(1)";

            setTimeout(() => {
                img.style.transform = "scale(1.02)";
                setTimeout(() => {
                    img.style.transform = "scale(1)";
                }, 100);
            }, 50);

        }, 600);

    }, 5000);

    img.addEventListener('mouseenter', () => {
        img.style.filter = "brightness(1.5)";
    });

    img.addEventListener('mouseleave', () => {
        img.style.filter = "brightness(1)";
    });
}

function progress(string1, string2, inc, max, string3) {
    const progressValue = document.getElementById(string1);
    const progressRing = document.getElementById(string2);

    const target = parseInt(max);
    let progress = 0;

    setInterval(() => {
        progress += parseInt(inc);
        const percent = (progress / target) * 100;
        const angle = percent * 3.6;

        if (progress > target) {
            progressValue.textContent = max + "+";
        } else {
            progressValue.textContent = progress;
        }
        if (string3 === '1') {
            progressRing.style.backgroundImage = `linear-gradient(${angle}deg,rgb(${Math.floor((percent / 100) * 255)},${Math.floor(((100 - percent) / 100) * 255)},200),rgb(73, 188, 216))`;
            progressValue.style.color = `rgb(${Math.floor(((100 - percent) / 100) * 255)},255,${Math.floor((percent / 100) * 255)})`;
        }
        else if (string3 === '2') {
            progressRing.style.backgroundImage = `linear-gradient(${angle}deg,rgb(${Math.floor(((100 - percent) / 100) * 255)},${Math.floor((percent / 100) * 255)},200), #ffae01)`;
            progressValue.style.color = `rgb(${Math.floor(((100 - percent) / 100) * 255)},${Math.floor((percent / 100) * 255)},200)`;
        }
    }, progress);
}

function flip() {
    document.querySelectorAll('.flipper').forEach(card => {
        let flipTimeout;

        card.addEventListener('mouseenter', () => {
            clearTimeout(flipTimeout);
            card.style.transform = 'rotateY(180deg)';
        });

        card.addEventListener('mouseleave', () => {
            flipTimeout = setTimeout(() => {
                card.style.transform = '';
            }, 300);
        });
    });
}

function chaton() {
    const chat = document.getElementById('chatter');
    chat.style.display = 'none';
    const background = document.querySelector('.chat');
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = 'flex';
    background.style.display = 'flex';
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('.chatinterface').scrollTo(0, document.querySelector('.chatinterface').scrollHeight);
}

function chatoff() {
    const chat = document.getElementById('chatter');
    chat.style.display = 'block';
    const background = document.querySelector('.chat');
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = 'none';
    background.style.display = 'none';
    document.querySelector('body').style.overflowY = 'scroll';
}

function message(msg, messenger) {
    const div = document.createElement('div');
    div.className = messenger;
    div.innerHTML = msg;
    document.querySelector('.chatinterface').appendChild(div);
    const username = localStorage.getItem('LoggedIn');
    const Data = JSON.parse(localStorage.getItem(`user_${username}`));
    Data.chatbot.push({ message: msg, messenger: messenger });
    localStorage.setItem(`user_${username}`, JSON.stringify(Data));
}

function Send() {
    const mess = document.getElementById('Queryin').value;
    document.getElementById('Queryin').value = '';
    message(mess, 'Answer');
    reply(mess.toLowerCase());
}

function reply(ans) {
    localStorage.setItem('Answer', ans);
    if (ans.toLowerCase() === 'question') {
        message(mainque, 'Question');
        localStorage.removeItem('Answer');
        document.querySelector('.chatinterface').scrollTo(0, document.querySelector('.chatinterface').scrollHeight);
        return;
    }
    else if (ans.toLowerCase() === 'thanks') {
        localStorage.removeItem('Answer');
        message(answer, 'Question');
        document.querySelector('.chatinterface').scrollTo(0, document.querySelector('.chatinterface').scrollHeight);
        return;
    }
    for (const course of courses) {
        if (course.name.toLowerCase() === ans) {
            const mess = `The course ${course.name} ${getcost(course.cost)} and can be completed in ${course.time} months. Would you like to get more information about the same?`;
            message(mess, 'Question');
            document.querySelector('.chatinterface').scrollTo(0, document.querySelector('.chatinterface').scrollHeight);
            setTimeout(() => {
                document.querySelector('.buttons').style.display = 'flex';
                document.getElementById('Queryin').style.pointerEvents = 'none';
                document.getElementById('Send').style.pointerEvents = 'none';
                document.getElementById('Clear').style.pointerEvents = 'none';
                document.querySelector('.chatinterface').scrollTo(0, document.querySelector('.chatinterface').scrollHeight);
            }, 1000);
            return;
        }
    };
    localStorage.removeItem('Answer');
    message(mainres, 'Question');
    document.querySelector('.chatinterface').scrollTo(0, document.querySelector('.chatinterface').scrollHeight);
}

function getcost(cost) {
    if (parseInt(cost) === 0) {
        return 'is free';
    }
    else {
        return `costs ${cost} coins`;
    }
}

function submitAns(msg) {
    document.querySelector('.buttons').style.display = 'none';
    message(msg, 'Answer');
    document.querySelector('.chatinterface').scrollTo(0, document.querySelector('.chatinterface').scrollHeight);
    if (msg === 'Yes') {
        for (const course of courses) {
            if (course.name.toLowerCase() === localStorage.getItem('Answer').toLowerCase()) {
                const msg = 'You can cotact the instructor at ' + course.contact + ' for more information.';
                message(msg, 'Question');
            }
        }
    }
    else {
        message(answer, 'Question');
    }
    localStorage.removeItem('Answer');
    document.getElementById('Queryin').style.pointerEvents = 'auto';
    document.getElementById('Send').style.pointerEvents = 'auto';
    document.getElementById('Clear').style.pointerEvents = 'auto';
    document.querySelector('.chatinterface').scrollTo(0, document.querySelector('.chatinterface').scrollHeight);
}

function initializeChatbot() {
    const username = localStorage.getItem('LoggedIn');
    const Data = JSON.parse(localStorage.getItem(`user_${username}`));
    if (Data.chatbot !== null) {
        Data.chatbot.forEach(course => {
            messageinitials(course.message, course.messenger);
        });
    }
}

function messageinitials(msg, messenger) {
    const div = document.createElement('div');
    div.className = messenger;
    div.innerHTML = msg;
    document.querySelector('.chatinterface').appendChild(div);
}

function Clear() {
    const username = localStorage.getItem('LoggedIn');
    const Data = JSON.parse(localStorage.getItem(`user_${username}`));
    Data.chatbot = [];
    localStorage.setItem(`user_${username}`, JSON.stringify(Data));
    document.querySelector('.chatinterface').innerHTML = '';
    setTimeout(() => {
        messageinitials(mainque, 'Question');
    }, 1000);
}