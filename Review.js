let reviews = JSON.parse(localStorage.getItem('reviews')) || [
    {
        describe: 'All the faculties are extremely supportive and knowledgeable. They patiently addressed every doubt I had, ensuring I understood concepts thoroughly. The teaching methods are student-friendly, with clear explanations and practical examples. However, I felt some advanced topics could have been covered in more depth.',
        rating: 4,
        author: 'Shivam Thanki'
    },
    {
        describe: 'The courses are exceptionally well-structured, progressing logically from fundamentals to advanced applications. Each module builds on the previous one, making even complex topics easy to grasp. The material is up-to-date, with real-world case studies that bridge theory and practice. The instructor\'s clarity and engaging delivery make this a standout course.',
        rating: 5,
        author: 'Riya Shah'
    },
    {
        describe: 'The faculty goes above and beyond to help students. The study material is comprehensive and well-organized, covering all necessary concepts with appropriate examples. The additional practice problems and reference materials provided were particularly helpful for exam preparation.',
        rating: 4,
        author: 'Aditya Patel'
    },
    {
        describe: 'The flexible schedule options are convenient for working professionals. The support team is responsive to doubts, though response times could be faster during peak hours. The course content is good, but some modules could benefit from more interactive elements.',
        rating: 3,
        author: 'Megha Rao'
    },
    {
        describe: 'Excellent value for money! The course offers premium content at an affordable price point. The quality of video lectures, study notes, and practice materials exceeds expectations. Particularly impressed with how complex topics are broken down into simple, digestible lessons.',
        rating: 5,
        author: 'Karan Desai'
    }
];

window.addEventListener('DOMContentLoaded', () => {
    const reviewContent = document.querySelector('.Review-content');

    let rotationInterval = setInterval(() => {
        rotate('front');
    }, 4000);

    reviewContent.addEventListener('mouseenter', () => {
        clearInterval(rotationInterval);
    });

    reviewContent.addEventListener('mouseleave', () => {
        rotationInterval = setInterval(() => {
            rotate('front');
        }, 6000);
    });
});

function rotate(string) {
    let index = Number(localStorage.getItem("review")) || 0;
    let animate;
    if (string === 'front') {
        index = (index + 1) % reviews.length;
        animate = 'review-animate-back';
    } else if (string === 'back') {
        animate = 'review-animate';
        index = (index - 1 + reviews.length) % reviews.length;
    }

    localStorage.setItem("review", index);
    const review = reviews[index];
    const descriptionBox = document.querySelector('.Description');

    descriptionBox.classList.add(animate);
    document.getElementById('Described').textContent = review.describe;
    document.getElementById('Rating').innerHTML = '';

    for (let i = 1; i <= parseInt(review.rating); i++) {
        const star = document.createElement('i');
        star.className = 'fa-solid fa-star';
        document.getElementById('Rating').appendChild(star);
    }

    document.getElementById('author').textContent = review.author;
    setTimeout(() => {
        descriptionBox.classList.remove(animate);
    }, 600);
}

function modifyData(form) {
    const data = new FormData(form);
    const described = data.get('Description');
    const Rated = data.get('Rating');
    const name = data.get('name');

    const newReview = { describe: described, rating: Rated, author: name };

    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    localStorage.setItem('review', reviews.length - 1);
}

function showform(string1, string2, string3) {
    const show = document.querySelectorAll(string1);
    const hide = document.querySelectorAll(string2);

    show.forEach(el => {
        el.style.display = 'flex';
        el.setAttribute('data-aos', string3);
        el.setAttribute('data-aos-easing', 'none');
        el.setAttribute('data-aos-duration', 'none');
        el.classList.remove('aos-animate');
        void el.offsetWidth;
        el.classList.add('aos-animate');
    });

    hide.forEach(el => el.style.display = 'none');
}