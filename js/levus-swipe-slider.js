// 20-05-2021 | 21-06-2021 upgrade
{
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

    // quantity
    const length = list.length;

    // nav buttons
    const nav = document.createElement('div');
    nav.setAttribute('id', 'levus-nav');

    // check number button
    let flag = 1;

    let buttons = '';

    if(length > 1) {
        
        // add buttons
        levusSwipeSlider.append(left, right, nav);

        for (let index = 0; index < length; index++) {

            // nav buttons
            const span = document.createElement('span');
            span.setAttribute('data-id', index);
            
            // clone slides
            slides.append(list[index].cloneNode(true));

            // add buttons
            nav.append(span);
            
        }

        // shift -100%
        slides.style.left = '-100%';

        buttons = document.querySelectorAll('#levus-nav span');

        buttons.forEach(item => {
    
            // lighting 2 slide 
            buttons[1].classList.add('active');
    
            item.addEventListener('click', function() {
                const id = this.dataset.id;
    
                buttons.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
    
                if(flag > id){ // клікнуто зліва від активної кнопки
    
                    const length = flag - id;
    
                    for(let i = 0; i < length; i++){
                        
                        leftScroll();
                    }
                } 
                
                if(flag < id){ // клікнуто справа від активної кнопки
    
                    const length = id - flag;
    
                    for(let i = 0; i < length; i++){
                        
                        rightScroll();
                    }
                }
    
                flag = id;
            });
        });

        // auto-scroll if the length is more than 1 element
        autoScroll();

    }

    /**
     * click
     */

    // left click
    left && left.addEventListener('click', leftScroll);

    // right click
    right && right.addEventListener('click', rightScroll);

    /**
     * swipe
     */

    let startX = null,
        moveX = 0,
        resultX = 0;

    list = document.querySelectorAll('.slide');

    if(list.length > 1){    
        list.forEach(item => {
        
            // touch
            item.addEventListener('touchstart', e => touchStart(e), false);
            item.addEventListener('touchmove', e => touchMove(e), false);
            item.addEventListener('touchend', touchEnd, false);

            // click
            item.addEventListener('mousedown', e => touchStart(e), false);
            item.addEventListener('mousemove', e => touchMove(e), false);
            item.addEventListener('mouseup', touchEnd, false);

            // image preventDefault
            item.querySelectorAll('img').forEach(image => {
                image.addEventListener('dragstart', e => e.preventDefault());
            });

        });
    }

    function touchStart(e){

        // mobile/deskop check
        if(e.type.includes('mouse')){
            startX = e.pageX;
        } else {
            startX = e.targetTouches[0].clientX;
        }
        
    }

    function touchMove(e){
        if(!startX) return false;

        // mobile/deskop check
        if(e.type.includes('mouse')){
            moveX = e.pageX;
        } else {
            moveX = e.targetTouches[0].clientX;
        }

        resultX = moveX - startX;
    }

    function touchEnd(){
        if(resultX > 0) leftScroll();
        else rightScroll();
    }

    // autoscroll 
    // TODO: hover stop
    function autoScroll(){

        setInterval(() => {

            // нарощуємо на 1
            if(flag === length - 1){
                flag = 0;
            } else {
                flag++;
            }

            const first = slides.firstElementChild;
            slides.append(first);

            slides.style.transition = 'none';
            slides.classList.add('to-left');
            
            setTimeout(() => {
                slides.classList.remove('to-left');
                slides.style.transition = '.5s';
            }, 0);

            buttonLight();

        }, 4000);


    }

    function leftScroll(){

        // якщо не менше кількості слайдів, то віднімаємо 1
        if(flag === 0){
            flag = length - 1;
        } else {
            flag--;
        }

        const last = slides.lastElementChild;
        slides.prepend(last);

        slides.style.transition = 'none';
        slides.classList.add('to-right');

        setTimeout(() => {
            slides.classList.remove('to-right');
            slides.style.transition = '.5s';
        }, 0);

        buttonLight();

    }

    function rightScroll(){

        // нарощуємо на 1
        if(flag === length - 1){
            flag = 0;
        } else {
            flag++;
        }

        const first = slides.firstElementChild;
        slides.append(first);

        slides.style.transition = 'none';
        slides.classList.add('to-left');
        
        setTimeout(() => {
            slides.classList.remove('to-left');
            slides.style.transition = '.5s';
        }, 0);

        buttonLight();

    }

    // buttons highlights
    function buttonLight(){
        buttons.forEach(item => item.classList.remove('active'));
        buttons[flag].classList.add('active');
    }

}