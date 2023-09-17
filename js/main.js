let hamburger = document.getElementById("hamburger");
let aside = document.getElementById("aside");


hamburger.addEventListener("click", () => {
    if (aside.style.width != "0%") {
        aside.setAttribute("style", "width: 0%; opacity: 0");
    } else {
        aside.setAttribute("style", "width: max(300px,35%); opacity: 1");
    }
})