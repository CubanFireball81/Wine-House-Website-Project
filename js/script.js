// Set Dynamic variables
let counter1 = 0;
let counter2 = 1;
let bool = true;

// Set static variables
const sections = document.querySelectorAll('section');
const progress = document.querySelector('.progress h2');
const circles = document.querySelectorAll('.circle');
const menu = document.querySelector('.menu');
const section1wrapper = document.querySelector('.section-1-wrapper');
const section5wrapper = document.querySelector('.section-5-wrapper');

// Set scale for Section 1 wrapper
section1wrapper.style.transform = "scale(1)";

// Update progress circles based on counter2
const progressCounter = () => {
    progress.textContent = `${counter2}/${sections.length}`;
    Array.from(circles).forEach(circle => {
        circle.style.backgroundColor = 'transparent';
    });
    document.querySelector(`.circle-${counter2}`).style.backgroundColor = '#ddd';
};

// Dynamically change scale of background image
const pageController = () => {
    bool = true;
    if(counter1 === 5) {
        Array.from(sections).forEach((section) => {
            section.style.left = '0';
        });
        counter1 = 0;
        counter2 = 1;
        section1wrapper.style.transform = 'scale(1)';
        section5wrapper.style.transform = 'scale(1.5)';
        progressCounter();
        bool = false;
    }
    if(counter1 === -1) {
        Array.from(sections).forEach((section) => {
            if(section.classList[0] === 'section-5') {
                return;
            }
            section.style.left = '-100vw';
        });
        counter1 = 4;
        counter2 = 5;
        section1wrapper.style.transform = 'scale(1.5)';
        section5wrapper.style.transform = 'scale(1)';
        progressCounter();
        bool = false;
    }
    progressCounter();
    return bool;
}

// Wheel/Scroll event listener to change page +/-
window.addEventListener('wheel', (e) => {
    const deltaY = e.deltaY > 0;
    if(deltaY > 0) {
        counter1++;
        counter2++;
    } else {
        counter1--;
        counter2--;
    }
    pageController();
    progressCounter();
    if(bool) {
        document.querySelector(
        `.section-${deltaY ? counter1 : counter2}`
        ).style.left = `${deltaY ? "-100vw" : "0"}`;
        document.querySelector(
            `.section-${deltaY ? counter1 : counter2}-wrapper`
            ).style.transform = `scale(${deltaY ? '1.5' : '1'})`;
        document.querySelector(
            `.section-${deltaY ? counter1 + 1 : counter2 + 1}-wrapper`
            ).style.transform = `scale(${deltaY ? '1' : '1.5'})`;
    }
});

// Left button click goes back to previous page or cycle backwards
document.querySelector('.left-btn').addEventListener('click', () => {
    counter1--;
    counter2--;
    pageController() && 
    (document.querySelector(`.section-${counter2}`).style.left = '0');
    if(bool) {
        document.querySelector(`.section-${counter2}-wrapper`).style.transform = "scale(1)";
        document.querySelector(`.section-${counter2 + 1}-wrapper`).style.transform = "scale(1.5)";
    }
});
// Right button click moves ahead a page or continues to beginning
document.querySelector('.right-btn').addEventListener('click', () => {
    counter1++;
    counter2++;
    pageController() && 
    (document.querySelector(`.section-${counter1}`).style.left = '-100vw');
    if(bool) {
        document.querySelector(`.section-${counter2}-wrapper`).style.transform = "scale(1)";
        document.querySelector(`.section-${counter1}-wrapper`).style.transform = "scale(1.5)";
    }
});

// Change scale of grapes img on hover (preserve img quality)
document.querySelector('.grapes-img').addEventListener('mouseover', () => {
    document.querySelector('.section-3-wrapper').style.opacity = '.5';
});

// Change opacity of grapes img on hover
document.querySelector('.grapes-img').addEventListener('mouseout', () => {
    document.querySelector('.section-3-wrapper').style.opacity = '1';
});

// Hamburger menu show/hide by adding change class
menu.addEventListener('click', () => {
    document.querySelector('.navbar').classList.toggle('change');
});