

// left button
const left = document.createElement('div');
left.setAttribute('id', 'slide-left');

// right button
const right = document.createElement('div');
right.setAttribute('id', 'slide-right');

// box with slides
const slides = document.getElementById('slides');

// wrapper
const levusSwipeSlider = document.getElementById('levus-swipe-slider');

// slides 
let list = document.querySelectorAll('.slide');

if(list.length > 1) {
    
    // add buttons
    levusSwipeSlider.append(left, right);

    for (let index = 0; index < list.length; index++) {
        
        // clone slides
        document.getElementById('slides').append(list[index].cloneNode(true));
    }

    // shift -100%
    slides.style.left = '-100%';
}

/**
 * click
 */

// left click
document.getElementById('slide-left') && document.getElementById('slide-left').addEventListener('click', leftScroll);

// right click
document.getElementById('slide-right') && document.getElementById('slide-right').addEventListener('click', rightScroll);


/**
 * touch
 */

let startX = null,
    moveX = 0,
    resultX = 0;

list = document.querySelectorAll('.slide');

list.forEach(item => {

    item.addEventListener('touchstart', e => {

        startX = e.targetTouches[0].clientX;

    }, false);

    item.addEventListener('touchmove', e => {

        if(!startX) return false;        

        moveX = e.targetTouches[0].clientX;

        resultX = moveX - startX;

    }, false);

    item.addEventListener('touchend', e => {
        if(resultX > 0){
            
            leftScroll();

        } else {

            rightScroll();
            
        }        
    });
});


function leftScroll(){
    const last = slides.lastElementChild;
    slides.prepend(last);

    slides.style.transition = 'none';
    slides.classList.add('to-right');

    setTimeout(() => {
        slides.classList.remove('to-right');
        slides.style.transition = '.5s';
    }, 50);
}


function rightScroll(){
    const first = slides.firstElementChild;
    slides.append(first);

    slides.style.transition = 'none';
    slides.classList.add('to-left');
    
    setTimeout(() => {
        slides.classList.remove('to-left');
        slides.style.transition = '.5s';
    }, 50);
}