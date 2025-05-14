window.addEventListener('DOMContentLoaded', () => {
    searchStart();

    //Courses Enrolled restored
    const courseElements = document.querySelectorAll('.Courses > div[data-course]');
    courseElements.forEach((el) => {
        const courseName = el.getAttribute('data-course');
        const username = localStorage.getItem("LoggedIn");
        const UserData = JSON.parse(localStorage.getItem("user_" + username));
        if (UserData.enrolledCourses[courseName] >= 0) {
            const button = el.querySelector('div.Enroll');
            button.firstElementChild.style.display = 'none';
            const enrolledDiv = button.firstElementChild.parentElement.nextElementSibling;
            const coin = button.firstElementChild.parentElement.previousElementSibling;
            enrolledDiv.style.display = 'flex';
            coin.style.display = 'none';
        }
    });

    updateCoin();
});

function searchStart() {
    const search = document.getElementById('search-bar');
    const query2 = localStorage.getItem('searchQuery');

    if (search && query2) {
        search.value = query2;
        localStorage.removeItem('searchQuery');
        setTimeout(() => {
            search.dispatchEvent(new Event('input'));
        }, 1800);
    }
}

function searchfilter(search) {
    const query = search.value.toLowerCase().trim();
    const queryWords = query.split(/\s+/);
    const courses = document.querySelectorAll('.Courses > div');

    courses.forEach(course => {
        const title = course.querySelector('h2').textContent.toLowerCase().trim();
        const titleWords = title.split(/\s+/);
        const isMatch = queryWords.every(qw =>
            titleWords.some(tw => tw.startsWith(qw))
        );
        course.style.display = isMatch ? 'flex' : 'none';
    });
}

function enrollmentfilter(filter) {
    const filterValue = filter.value;
    const courses = document.querySelectorAll('.Courses > div');

    courses.forEach(course => {
        const enrolledDiv = course.querySelector('div[id^="Enrolling"]');
        const isEnrolled = window.getComputedStyle(enrolledDiv).display !== 'none';

        if (filterValue === 'all') {
            course.style.display = 'flex';
        } else if (filterValue === 'enrolled' && isEnrolled) {
            course.style.display = 'flex';
        } else if (filterValue === 'not-enrolled' && !isEnrolled) {
            course.style.display = 'flex';
        } else if (filterValue === 'free' && course.getAttribute('data-value') === "0" && !isEnrolled) {
            course.style.display = 'flex';
        } else {
            course.style.display = 'none';
        }
    });
}

function sortCourses(criteria) {
    const container = document.querySelector(".Courses");
    const courseDivs = Array.from(container.children);

    if (criteria === "straight") {
        courseDivs.sort((a, b) => a.dataset.course.localeCompare(b.dataset.course));
    } else if (criteria === "reverse") {
        courseDivs.sort((a, b) => b.dataset.course.localeCompare(a.dataset.course));
    } else if (criteria === "low") {
        courseDivs.sort((a, b) => parseInt(a.dataset.value) - parseInt(b.dataset.value));
    } else if (criteria === "high") {
        courseDivs.sort((a, b) => parseInt(b.dataset.value) - parseInt(a.dataset.value));
    }

    container.innerHTML = "";
    courseDivs.forEach(course => container.appendChild(course));
}

function updateCoin() {
    const coin = document.getElementById('background');
    const username = localStorage.getItem("LoggedIn");
    const UserData = JSON.parse(localStorage.getItem("user_" + username));
    coin.textContent = UserData.Coins;
    const border = document.querySelector('.Coins');
    border.style.background = `conic-gradient(rgb(0, 156, 16) 0deg,rgb(0, 42, 250) ${(UserData.Coins / 500) * 36}deg,white ${(UserData.Coins / 500) * 36}deg`;
}

function buy(button) {
    const username = localStorage.getItem("LoggedIn");
    const UserData = JSON.parse(localStorage.getItem("user_" + username));
    const cost = button.parentElement.parentElement.getAttribute('data-value');
    if (UserData.Coins < cost) {
        alert("Insufficient Balance!!! You Cannot Buy the Course.");
        return;
    }
    if (confirm(`Are sure you want to buy this course? 
Cost: ${cost}`) ? true : alert("Purchase cancelled.")) {
        alert("Your Purchase is confirmed.")
        button.style.display = 'none';
        const enrolledDiv = button.parentElement.nextElementSibling;
        const coin = button.parentElement.previousElementSibling;
        enrolledDiv.style.display = 'flex';
        coin.style.display = 'none';
        const courseName = button.parentElement.parentElement.getAttribute('data-course');
        UserData.Coins -= cost;
        UserData.enrolledCourses[courseName] = '0';
        localStorage.setItem("user_" + username, JSON.stringify(UserData));
        updateCoin();
    }
}

function AddMoney() {
    const username = localStorage.getItem("LoggedIn");
    const UserData = JSON.parse(localStorage.getItem("user_" + username));
    const money = parseInt(document.getElementById('Amount').value);
    if (isNaN(money)) {
        alert("No money entered");
        return;
    }
    if (money < 0) {
        alert("Please enter a valid positive number");
        return;
    }
    let value = parseInt(UserData.Coins);
    UserData.Coins = value + money;
    localStorage.setItem("user_" + username, JSON.stringify(UserData));
    updateCoin();
    ClosePop();
}

function PopUp() {
    document.querySelector(".PopUp").style.display = 'flex';
    document.querySelector('body').style.overflowY = 'hidden';
}

function ClosePop() {
    document.querySelector(".PopUp").style.display = 'none';
    document.querySelector('body').style.overflowY = 'auto';
}

function getCourseVideos(courseName) {
    switch (courseName) {
        case "Tally":
            return [
                "Introduction to Tally",
                "Creating Company Profile",
                "Managing Inventory in Tally",
                "Generating Financial Reports",
                "Advanced Accounting Features"
            ];

        case "XERO":
            return [
                "XERO Platform Overview",
                "Setting Up Your Chart of Accounts",
                "Bank Reconciliation in XERO",
                "Managing Payroll",
                "Advanced Reporting Features",
                "XERO Mobile App Guide"
            ];

        case "MYOB":
            return [
                "MYOB Software Introduction",
                "Setting Up Your Business File",
                "Basic Invoicing and Payments",
                "Inventory Management",
                "End of Month Procedures"
            ];

        case "QBOOKS":
            return [
                "QuickBooks Dashboard Tour",
                "Setting Up Customers and Vendors",
                "Tracking Expenses and Income",
                "Bank Feeds and Reconciliation",
                "Generating Tax Reports",
                "QuickBooks Mobile Features"
            ];

        case "SAGE":
            return [
                "SAGE 50 Overview",
                "Company Setup and Configuration",
                "Accounts Receivable Management",
                "Accounts Payable Management",
                "Inventory Control",
                "Advanced Financial Reporting"
            ];

        case "Python Programming":
            return [
                "Python Installation and Setup",
                "Variables and Data Types",
                "Control Structures and Loops",
                "Functions and Modules",
                "Working with Files",
                "Object-Oriented Programming",
                "Popular Python Libraries"
            ];

        case "Data Science Fundamentals":
            return [
                "Introduction to Data Science",
                "Python for Data Analysis",
                "Pandas DataFrames",
                "Data Visualization with Matplotlib",
                "Statistical Analysis Basics",
                "Machine Learning Introduction"
            ];

        case "Web Development Bootcamp":
            return [
                "HTML5 Fundamentals",
                "CSS3 Styling Techniques",
                "JavaScript Basics",
                "Responsive Design Principles",
                "Introduction to React.js",
                "Backend with Node.js",
                "Deploying Your First Website"
            ];

        case "Graphic Design":
            return [
                "Design Principles",
                "Adobe Photoshop Basics",
                "Adobe Illustrator Fundamentals",
                "Color Theory in Design",
                "Typography Essentials",
                "Creating Brand Identity"
            ];

        case "Mobile App Development":
            return [
                "Introduction to Flutter",
                "Dart Programming Basics",
                "UI Design for Mobile",
                "State Management",
                "Working with APIs",
                "Publishing to App Stores"
            ];

        case "Cybersecurity Essentials":
            return [
                "Cybersecurity Fundamentals",
                "Network Security Basics",
                "Encryption Techniques",
                "Ethical Hacking Introduction",
                "Security Best Practices",
                "Incident Response"
            ];

        case "Cloud Computing":
            return [
                "Cloud Services Overview",
                "AWS Fundamentals",
                "Azure Basics",
                "Google Cloud Platform",
                "Containerization with Docker",
                "Serverless Architecture"
            ];

        case "Artificial Intelligence":
            return [
                "AI Concepts and History",
                "Machine Learning Basics",
                "Neural Networks",
                "Natural Language Processing",
                "Computer Vision",
                "AI Ethics and Future"
            ];

        case "Blockchain Technology":
            return [
                "Blockchain Fundamentals",
                "Cryptocurrency Basics",
                "Smart Contracts",
                "Ethereum Development",
                "Decentralized Applications",
                "Blockchain Security"
            ];

        case "UI/UX Design":
            return [
                "User Research Methods",
                "Wireframing Techniques",
                "Prototyping Tools",
                "Usability Testing",
                "Design Systems",
                "Accessibility in Design"
            ];

        case "Digital Photography":
            return [
                "Camera Settings Explained",
                "Composition Techniques",
                "Lighting Fundamentals",
                "Photo Editing Basics",
                "Portrait Photography",
                "Landscape Photography"
            ];

        case "Content Writing":
            return [
                "Writing for Digital Media",
                "SEO Writing Techniques",
                "Copywriting Fundamentals",
                "Blog Writing Strategies",
                "Social Media Content",
                "Editing and Proofreading"
            ];

        case "Video Editing":
            return [
                "Premiere Pro Interface",
                "Basic Editing Techniques",
                "Color Correction",
                "Audio Editing",
                "Motion Graphics Basics",
                "Exporting for Different Platforms"
            ];

        case "Quant Computing":
            return [
                "Quantitative Analysis Basics",
                "Financial Modeling",
                "Algorithmic Trading",
                "Risk Management",
                "Python for Quants",
                "Advanced Statistical Methods"
            ];

        default:
            return ["Course content coming soon!"];
    }
}

function getCourseVideoLinks(courseName) {
    switch (courseName) {
        case "Tally":
            return [
                "https://youtu.be/xbjK6fJhXXw", // Introduction to Tally
                "https://youtu.be/2dUG-9x0o7E", // Creating Company Profile
                "https://youtu.be/7KqkFQkR-dY", // Managing Inventory
                "https://youtu.be/9ZQ8G02xw8E", // Financial Reports
                "https://youtu.be/0YwqXQfzL1w"  // Advanced Accounting
            ];

        case "XERO":
            return [
                "https://youtu.be/4wOQ7P3FQx4", // XERO Overview
                "https://youtu.be/4jq2h1LJmc4", // Chart of Accounts
                "https://youtu.be/6tqMc0qKXW0", // Bank Reconciliation
                "https://youtu.be/9pD7G0oJq0E", // Managing Payroll
                "https://youtu.be/7mO5Q2q3w4M", // Reporting Features
                "https://youtu.be/3yKj2XQYQ7k"  // Mobile App Guide
            ];

        case "MYOB":
            return [
                "https://youtu.be/3E7Z_Kt0-7k", // MYOB Introduction
                "https://youtu.be/7JkL7Q2Q3Qk", // Business Setup
                "https://youtu.be/9KkL5Q3Q2Qk", // Invoicing/Payments
                "https://youtu.be/5JkL7Q2Q3Qk", // Inventory Management
                "https://youtu.be/3JkL8Q2Q3Qk"  // Month End Procedures
            ];

        case "QBOOKS":
            return [
                "https://youtu.be/4JkL7Q2Q3Qk", // QuickBooks Dashboard
                "https://youtu.be/5KkL7Q2Q3Qk", // Customers/Vendors
                "https://youtu.be/6JkL7Q2Q3Qk", // Expense Tracking
                "https://youtu.be/7KkL7Q2Q3Qk", // Bank Reconciliation
                "https://youtu.be/8JkL7Q2Q3Qk", // Tax Reports
                "https://youtu.be/9KkL7Q2Q3Qk"  // Mobile Features
            ];

        case "SAGE":
            return [
                "https://youtu.be/5JkL7Q2Q3Qk", // SAGE 50 Overview
                "https://youtu.be/6JkL7Q2Q3Qk", // Company Setup
                "https://youtu.be/7KkL7Q2Q3Qk", // Accounts Receivable
                "https://youtu.be/8JkL7Q2Q3Qk", // Accounts Payable
                "https://youtu.be/9KkL7Q2Q3Qk", // Inventory Control
                "https://youtu.be/0LkL7Q2Q3Qk"  // Financial Reporting
            ];

        case "Python Programming":
            return [
                "https://youtu.be/rfscVS0vtbw", // Installation/Setup
                "https://youtu.be/khKv-8q7YmY", // Variables/Data Types
                "https://youtu.be/6iSF8P6l3NM", // Control Structures
                "https://youtu.be/9Os7ELw6z1I", // Functions/Modules
                "https://youtu.be/Uh2ebFW8OYM", // File Handling
                "https://youtu.be/JeznW_7DlB0", // OOP
                "https://youtu.be/3mwFC4SHJ-Y"  // Libraries
            ];

        case "Data Science Fundamentals":
            return [
                "https://youtu.be/ua-CiDNNj30", // Data Science Intro
                "https://youtu.be/dq2D4x5dFQ8", // Python for Analysis
                "https://youtu.be/daefaLgNkw0", // Pandas DataFrames
                "https://youtu.be/3N5PZ3Ue3Y4", // Matplotlib
                "https://youtu.be/r-uOLxNrNk8", // Statistical Analysis
                "https://youtu.be/7eh4d6sabA0"  // ML Introduction
            ];

        case "Web Development Bootcamp":
            return [
                "https://youtu.be/pQN-pnXPaVg", // HTML5
                "https://youtu.be/yfoY53QXEnI", // CSS3
                "https://youtu.be/PkZNo7MFNFg", // JavaScript
                "https://youtu.be/srvUrASNj0s", // Responsive Design
                "https://youtu.be/w7ejDZ8SWv8", // React.js
                "https://youtu.be/fBNz5xF-Kx4", // Node.js
                "https://youtu.be/SBvmnHTQIPY"  // Deployment
            ];

        case "Graphic Design":
            return [
                "https://youtu.be/YqQx75OPRa0", // Design Principles
                "https://youtu.be/IyR_uYsRdPs", // Photoshop
                "https://youtu.be/IBouhf4seWQ", // Illustrator
                "https://youtu.be/_2LLXnUdUIc", // Color Theory
                "https://youtu.be/sByzHoiYFX0", // Typography
                "https://youtu.be/lk9OVR6fJtw"  // Brand Identity
            ];

        case "Mobile App Development":
            return [
                "https://youtu.be/VPvVD8t02U8", // Flutter Intro
                "https://youtu.be/5xlVP04905w", // Dart Basics
                "https://youtu.be/1ukSR1GRtMU", // UI Design
                "https://youtu.be/vtGCteMAQ6I", // State Management
                "https://youtu.be/4oWA2xXisYw", // Working with APIs
                "https://youtu.be/4yWXBOiwN_0"  // App Publishing
            ];

        case "Cybersecurity Essentials":
            return [
                "https://youtu.be/inWWhr5tnEA", // Cybersecurity Basics
                "https://youtu.be/qiQQq6m5bMU", // Network Security
                "https://youtu.be/zqSD4WwdBO0", // Encryption
                "https://youtu.be/3Kq1MIfTWCE", // Ethical Hacking
                "https://youtu.be/8VxDGKzXHP0", // Security Practices
                "https://youtu.be/1U0y2KbHdEs"  // Incident Response
            ];

        case "Cloud Computing":
            return [
                "https://youtu.be/mxT233EdY5c", // Cloud Services
                "https://youtu.be/ulprqHHWlng", // AWS Fundamentals
                "https://youtu.be/tDuruX7XSac", // Azure Basics
                "https://youtu.be/3CiMlD1r9bE", // Google Cloud
                "https://youtu.be/pTFZFxd4hOI", // Docker
                "https://youtu.be/vxJobGtqKVM"  // Serverless
            ];

        case "Artificial Intelligence":
            return [
                "https://youtu.be/JMUxmLyrhSk", // AI Concepts
                "https://youtu.be/ukzFI9rgwfU", // ML Basics
                "https://youtu.be/aircAruvnKk", // Neural Networks
                "https://youtu.be/8S3qHHUKqYk", // NLP
                "https://youtu.be/2qbm5X6P_2I", // Computer Vision
                "https://youtu.be/E5fJMB7m2Z0"  // AI Ethics
            ];

        case "Blockchain Technology":
            return [
                "https://youtu.be/qOVAbKKSH10", // Blockchain Basics
                "https://youtu.be/1PU0l2F8Qsk", // Cryptocurrency
                "https://youtu.be/ZE2HxTmxfrI", // Smart Contracts
                "https://youtu.be/coQ5dg8wM2o", // Ethereum
                "https://youtu.be/99pYGpTWcXM", // DApps
                "https://youtu.be/7l3NVRQH_0k"  // Blockchain Security
            ];

        case "UI/UX Design":
            return [
                "https://youtu.be/_Hp_dI0DzY4", // User Research
                "https://youtu.be/QRxd9kPU__A", // Wireframing
                "https://youtu.be/BLRvBfXwL2g", // Prototyping
                "https://youtu.be/9ZtqB8LrR1U", // Usability Testing
                "https://youtu.be/l-S2Y3SF3mM", // Design Systems
                "https://youtu.be/86eGO8clAq8"  // Accessibility
            ];

        case "Digital Photography":
            return [
                "https://youtu.be/NaTpcXDr0U0", // Camera Settings
                "https://youtu.be/7ZVyNjKSr0M", // Composition
                "https://youtu.be/u9prcUCHlqM", // Lighting
                "https://youtu.be/7QhvC6G4_NQ", // Photo Editing
                "https://youtu.be/QH7GyQVBX0I", // Portrait
                "https://youtu.be/Zc7Tf0eB_0s"  // Landscape
            ];

        case "Content Writing":
            return [
                "https://youtu.be/ZFg6qJk9jnk", // Digital Writing
                "https://youtu.be/QikUjq6emUw", // SEO Writing
                "https://youtu.be/2HVOTTnKZ5I", // Copywriting
                "https://youtu.be/9BB7O5z7P5Y", // Blog Writing
                "https://youtu.be/4w3Tk2Yt1WY", // Social Media
                "https://youtu.be/5V9odNEvJX0"  // Editing
            ];

        case "Video Editing":
            return [
                "https://youtu.be/aeY6l3c2xJ0", // Premiere Pro
                "https://youtu.be/8ZodtYzwNDY", // Basic Editing
                "https://youtu.be/6tVYvU3J5dI", // Color Correction
                "https://youtu.be/9zFfG3T3X2I", // Audio Editing
                "https://youtu.be/7ZVyNjKSr0M", // Motion Graphics
                "https://youtu.be/8ZodtYzwNDY"  // Exporting
            ];

        case "Quant Computing":
            return [
                "https://youtu.be/9zFfG3T3X2I", // Quant Analysis
                "https://youtu.be/7ZVyNjKSr0M", // Financial Modeling
                "https://youtu.be/8ZodtYzwNDY", // Algorithmic Trading
                "https://youtu.be/6tVYvU3J5dI", // Risk Management
                "https://youtu.be/aeY6l3c2xJ0", // Python for Quants
                "https://youtu.be/5V9odNEvJX0"  // Advanced Stats
            ];

        default:
            return ["https://youtu.be/dQw4w9WgXcQ"]; // Default fallback
    }
}

function checkboxes(checkbox, courseName) {
    let i = 1;
    const videos = getCourseVideos(courseName);
    while (i != checkbox.id && i <= videos.length) {
        const checkbox2 = document.getElementById(i);
        if (!checkbox2.checked) {
            alert("Watch videos in line only");
            checkbox.checked = false;
            return;
        }
        i++;
    }
    const username = localStorage.getItem("LoggedIn");
    const UserData = JSON.parse(localStorage.getItem("user_" + username));
    document.getElementById(parseInt(UserData.enrolledCourses[courseName]) + 1).parentElement.style.backgroundColor = 'rgba(256,256,256,0)';
    const pro = document.querySelector('.Progress');
    const progressPercent = ((checkbox.id) / videos.length) * 100;
    pro.style.background = `linear-gradient(to right,rgb(26, 255, 0) ${progressPercent}%, aqua ${progressPercent}% 100%)`;
    UserData.enrolledCourses[courseName] = checkbox.id;
    document.getElementById('Watched').textContent = checkbox.id;
    if (progressPercent != 100) {
        document.getElementById(parseInt(UserData.enrolledCourses[courseName]) + 1).parentElement.style.backgroundColor = 'yellow';
    }
    else {
        document.getElementById('Completed').style.display = 'flex';
    }
    localStorage.setItem("user_" + username, JSON.stringify(UserData));
}

function PopUpCourse(button) {
    document.querySelector(".PopUpCourse").style.display = 'flex';
    document.querySelector('body').style.overflowY = 'hidden';
    const pop = document.querySelector('.PopUpCourse .Course');
    pop.innerHTML = `<button type="button" onclick="ClosePopCourse()">Back to Courses</button>
                <div class="Progress"></div>
                <br>
                <div id="Completed">Congratulation!!! You completed the course.🎉</div><br>
                <button type="button" id="Reset" onclick="ResetCourse()">Reset Progress</button>
            `;
    const back = pop.firstElementChild;
    const CourseElement = button.closest('[data-course]');
    const courseName = CourseElement.getAttribute('data-course');
    const username = localStorage.getItem("LoggedIn");
    const UserData = JSON.parse(localStorage.getItem("user_" + username));
    const pro = document.querySelector('.Progress');
    const videos = getCourseVideos(courseName);
    const videosLink = getCourseVideoLinks(courseName);
    const title = document.createElement("h1");
    title.id = "Title";
    title.textContent = courseName;
    title.style.textAlign = "center";
    back.after(title);
    videos.forEach((video, index) => {
        const label = document.createElement('label');
        label.textContent = video;
        label.setAttribute('for', index + 1);
        const link = document.createElement('a');
        link.setAttribute('href', videosLink[index]);
        link.textContent = '[Link]';
        link.className = 'Videos';
        link.setAttribute('target', '_blank');
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.style.accentColor = 'rgba(133,122,113,0.5)';
        checkbox.id = `${index + 1}`;
        const division = document.createElement('div');
        checkbox.addEventListener('change', function (e) {
            e.preventDefault();
            if (this.checked === false) {
                this.checked = true;
                alert("You have watched this videos. To restart progress use Reset button");
            }
            else {
                checkboxes(this, courseName);
            }
        });
        if (checkbox.id <= UserData.enrolledCourses[courseName]) {
            checkbox.checked = true;
        }
        division.append(checkbox, label, "  ", link, document.createElement("br"));
        pro.before(division);
    });
    const progressPercent = (UserData.enrolledCourses[courseName] / videos.length) * 100;
    if (progressPercent === 100) {
        document.getElementById('Completed').style.display = 'flex';
    } else {
        document.getElementById(parseInt(UserData.enrolledCourses[courseName]) + 1).parentElement.style.backgroundColor = 'yellow';
    }
    pro.style.background = `linear-gradient(to right, rgb(26, 255, 0)  ${progressPercent}%,aqua ${progressPercent}% 100%)`;
    pro.before(document.createElement("br"));
    const watched = document.createElement('span');
    watched.id = 'Watched';
    watched.textContent = UserData.enrolledCourses[courseName];
    pro.after(watched, "/", videos.length, " Videos Watched");
    const resetbtn = document.getElementById('Reset');
    resetbtn.addEventListener('click', function () {
        ResetCourse(courseName);
    });
    document.querySelector('body').style.overflow = 'hidden';
}

function ResetCourse(courseName) {
    let i = 1;
    const videos = getCourseVideos(courseName);
    while (i <= videos.length) {
        const checkbox = document.getElementById(i);
        checkbox.checked = false;
        i++;
    }
    const username = localStorage.getItem("LoggedIn");
    const UserData = JSON.parse(localStorage.getItem("user_" + username));
    if ((parseInt(UserData.enrolledCourses[courseName]) + 1) <= videos.length) {
        document.getElementById(parseInt(UserData.enrolledCourses[courseName]) + 1).parentElement.style.backgroundColor = 'rgba(256,256,256,0)';
    }
    const pro = document.querySelector('.Progress');
    pro.style.background = `linear-gradient(to right, rgb(26, 255, 0) 0%,  aqua 0% 100%)`;
    UserData.enrolledCourses[courseName] = 0;
    document.getElementById(parseInt(UserData.enrolledCourses[courseName]) + 1).parentElement.style.backgroundColor = 'yellow';
    document.getElementById('Completed').style.display = 'none';
    localStorage.setItem("user_" + username, JSON.stringify(UserData));
}

function ClosePopCourse() {
    document.querySelector(".PopUpCourse").style.display = 'none';
    document.querySelector('body').style.overflowY = 'auto';
}
