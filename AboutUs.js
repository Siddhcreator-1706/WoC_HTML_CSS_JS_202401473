window.addEventListener('DOMContentLoaded',()=>{
    glow();
});

function glow(){
    const img = document.querySelector('.About-content h2');
        let glow = true;

        setInterval(() => {
            img.style.textShadow = glow
                ? "0 0 20px rgb(255, 255, 255)"
                : "0 0 15px rgba(0, 0, 0, 0.4)";
            glow = !glow;
        }, 1000);
}

function toggle() {
    const btn = document.getElementById("Learn");
    const txt = document.getElementById("more");

    if (txt.style.display === "none" || txt.style.display === "") {
        txt.style.display = "block";
        btn.innerHTML = 'Show Less <i class="fa-solid fa-arrow-up"></i>';
    } else {
        txt.style.display = "none";
        btn.innerHTML = 'Learn More <i class="fa-solid fa-arrow-right"></i>';
    }
};