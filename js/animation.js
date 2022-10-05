const INCREASE_NUMBER_ANIMATION_SPEED = 30;
let animationInited = false;
function increaseNumberAnimationStep(i, element, endNumber) {
    if(i <= endNumber) {
        if (i === endNumber) {
            element.innerText = i + '+';
        }
        else {
            element.innerText = i;
        }
        i+=100;
        console.log(i);
        setTimeout(function() { increaseNumberAnimationStep(i,element,endNumber) },INCREASE_NUMBER_ANIMATION_SPEED); 
    }
}
    
function initIncreaseNumberAnimation() {
    let element = document.querySelector("div .features__clients-count");
    increaseNumberAnimationStep(0,element,5000)
}

document.querySelector('#budget').addEventListener('change', function handleSelectChange(event) {
    if (event.target.value === 'other') {
        // Должны добавить еще одно текстовое поле
        let formContainer = document.createElement("div");
        formContainer.classList.add("form__group");
        formContainer.classList.add("form__other-input");
        let input = document.createElement("input");
        input.placeholder = "Введите ваш вариант";
        input.type = "text";
        formContainer.appendChild(input);
        document.querySelector('.form form').insertBefore(formContainer, document.querySelector('.form__submit'));
    }

    let otherInput = document.querySelector(".form__other-input");
    if (event.target.value !== 'other' && Boolean(otherInput)) {
        // Удаляем ранее добавленное текстовое поле, если оно есть в DOM
        let otherInput = document.querySelector(".form__other-input");
        document.querySelector(".form form").removeChild(otherInput);
    }
})

function updateScroll() {
    if (window.scrollY > 0) {
        let header = document.querySelector("header");
        header.classList.add("header__scrolled")
    } else {
        let header = document.querySelector("header");
        header.classList.remove("header__scrolled")
    }
    let windowBottomPosition = window.scrollY + window.innerHeight;
    let countElementPosition = document.querySelector('.features__clients-count').offsetTop;
    if(windowBottomPosition > countElementPosition && !animationInited) { 
        animationInited = true;
        initIncreaseNumberAnimation();
    }
}
window.addEventListener('scroll', updateScroll);


function addSmoothScroll(anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });

}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    addSmoothScroll(anchor);
});

addSmoothScroll(document.querySelector(".more-button"));