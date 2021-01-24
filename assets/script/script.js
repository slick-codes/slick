
function lazyLoading(){
    let images = document.querySelectorAll('img')
    for(image of images) image.setAttribute('loading' , 'lazy')    
}






  class Slider { // Reusable slider
        constructor(content, pause, ledContainer, interval, delay) {
            this.index = -1
            this.content = content
            this.interval = interval
            this.delay = delay
            this.ledContainer = ledContainer
            this.pause = pause
            this.setInterval = null
        }

        generateLed() {
            //console.log(this.ledContainer)
            if (!this.ledContainer) return

            this.ledContainer.querySelectorAll('.led').forEach(node => node.remove())

            for (let i = 0; i < this.content.length; i++) {
                const div = document.createElement('div')
                div.classList.add('led')
                div.setAttribute('data-value', i)


                this.ledContainer.appendChild(div)


                div.onclick = () => this.slideSetup('led');
            }
        }

        slideSetup(dir) {

            if (!dir && !this.pause) this.index++
            if (dir === 'left') this.index = this.index - 1
            if (dir === 'right') this.index = this.index + 1
            if (typeof dir == 'string') {
                this.stopInterval()
                this.startInterval()
            }


            if (dir === 'led')
                this.index = parseInt(event.target.getAttribute('data-value'))
            if (this.index >= this.content.length)
                this.index = 0
            if (this.index < 0) this.index = this.content.length - 1
            //console.log('initial index', this.index)
            const led = this.ledContainer.querySelectorAll('.led');
            led.forEach(node => {
                node.classList.remove('active')
            })
            led[this.index].classList.add('active')
            this.content.forEach(node => {
                node.classList.remove('active')
            })
            this.content[this.index].classList.add('active')
        }
        startInterval(dir = false) {
            this.setInterval = setInterval(interate, this.interval)
            let then = this

            function interate(dir) {
                then.slideSetup(dir)
            }
        }
        stopInterval() {
            clearInterval(this.setInterval)
        }
    }

    const landingPreviewProject = document.querySelectorAll('.landing__preview-project');
    const landingIndicator = document.querySelector('.preview__led-container')
    const landingControlBtnLeft = document.querySelector('.preview__slide-btn-container div:first-child')
    const landingControlBtnRight = document.querySelector('.preview__slide-btn-container div:last-child')


    const showCaseProject = new Slider(landingPreviewProject, false, landingIndicator, 7000, 0);

    landingControlBtnLeft.onclick = () => showCaseProject.slideSetup('left')
    landingControlBtnRight.onclick = () => showCaseProject.slideSetup('right')

    showCaseProject.generateLed()
    showCaseProject.slideSetup(false);


        landingIndicator.querySelectorAll('.led').forEach(node => {
            node.onclick = () => {
                showCaseProject.slideSetup('led');
            };
        });

    (() => { 
        let pause = false;

        let btn = document.querySelector('.preview__led-container .pause')

        btn.onclick = function () {
            if (pause) {
                event.target.classList.add('fa-pause')
                event.target.classList.remove('fa-play')
                showCaseProject.startInterval()
                pause = false
            } else {
                event.target.classList.remove('fa-pause')
                event.target.classList.add('fa-play')
                pause = true
                showCaseProject.stopInterval()
            }

            showCaseProject.pause = pause

        }

    })()


     const testimonySlide = document.querySelectorAll('.testimonial__card')
        const testimonyLedContainer = document.querySelector('.testimonial__led-container')
        const testimonyLeftBtn = document.querySelector('.testimonial__led-indicator div:first-child')
        const testimonyRightBtn = document.querySelector('.testimonial__led-indicator div:nth-child(3)')


        const testimonial = new Slider(testimonySlide, false, testimonyLedContainer, 5000, 0, 0)

    function testimonySlider() {
   
        testimonial.generateLed()

        testimonial.startInterval(false)

        testimonyLeftBtn.onclick = () => testimonial.slideSetup('left')
        testimonyRightBtn.onclick = () => testimonial.slideSetup('right')
    }

    myLoader.runPreloader()

    window.onload = () => {
            myLoader.canvas.classList.add('deactivate')
            console.log(myLoader.canvas)

        if (window.innerWidth <= 600) {
            showCaseProject.startInterval(false);
            testimonySlider()
        }
    }
    window.onresize = () => {
        if(window.innerWidth <= 600){
            testimonial.stopInterval()
            testimonySlider()
        }
    }





    /*Form Validation */
(() => {
    class GoogleValidate {
        constructor(label, fill) {
            this.label = label
            this.fill = fill
        }
        googleEffect(event) {
            let value = event.target.id
            //console.log(value)
            this.label.forEach(node => {
                if (node.getAttribute('for') == value) node.classList.add('active')
            })
        }
        undoGoogleEffect(event) {
            let value = event.target.id
            if (event.target.value.trimRight() === '') {
                this.label.forEach(node => {
                    if (node.getAttribute('for') == value) node.classList.remove('active')
                })
                event.target.value = event.target.value.trimRight()
            }
        }
        validateEmail(email) {
            const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return reg.test(String(email).toLowerCase())
        }
        sendData() {
            for (let i = 0; i < this.fill.length; i++) {
                if (fill[i].value.trimRight() === '') {
                    label.forEach(label => {
                        if (label.getAttribute('for') == this.fill[i].id) {
                            label.innerHTML = ` please add an ${this.fill[i].id}`
                        }
                    })
                    //break;
                    fill[i].focus()
                    return false
                }
            }
            const email = fill[0].value
            if (!this.validateEmail(email)) {

                label.forEach(label => {
                    if (label.getAttribute('for') == this.fill[0].id) {
                        label.innerHTML = ` this is not a valid ${this.fill[0].id} `
                    }
                })
                return false
            }
            return true
        }
    }

    const label = document.querySelectorAll('.contact__form-container label')
    const fill = document.querySelectorAll('.contact__form-container input , .contact__form-container textarea')
    const sendBtn = document.querySelector('.contact__form-container button');


    
    const contactForm = new GoogleValidate(label, fill);

    fill.forEach(node => {
        node.onfocus = (event) => contactForm.googleEffect(event)
        node.onblur = (event) => contactForm.undoGoogleEffect(event)
    })
    sendBtn.onclick = (event) => contactForm.sendData(event);




    /* Set copyright time*/

    let date = new Date()
    let outputYear = document.querySelector('footer span')

    outputYear.innerText = date.getFullYear()

    function getYear(passYear) {
        return date.getFullYear() - Number(passYear)
    }

    //console.log(getYear(2017))

})()

