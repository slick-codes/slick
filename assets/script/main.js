


    class SideIcon {
        constructor(iconContainer, hideIcon) {
            this.iconContainer = iconContainer
            this.isHidden = true
            this.hideIcon = hideIcon
        }

        getContainerScroll() {

        }

        hide(node) {
            node.classList.remove('active')
            this.iconContainer.classList.add('active')
            this.isHidden = false
        }

        show(node) {
            node.classList.add('active')
            this.iconContainer.classList.remove('active')
            this.isHidden = true
        }


        setClick(event) {
            let target = event.target

            if (this.isHidden) {
                this.hide(traget)
            } else {
                this.show(target)
            }
            //console.log('clicked')
        }

        scrollEfect() {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            let scrollHeight = document.body.scrollHeight - document.body.clientHeight || document.documentElement.scrollHeight - document.documentElement.clientHeight
            let calc = (scrollTop / scrollHeight) * 100

            if (calc >= 20) this.hide(this.hideIcon)
            if (calc < 20) this.show(this.hideIcon)

            let newCalc = (scrollHeight - window.innerHeight) / 2               
            const upButton = document.querySelector('button.go-up')
            
            if(upButton != undefined)
                if(scrollTop >= newCalc){
                   upButton.classList.add('show')
                }else{
                    upButton.classList.remove('show')
                }
        }

    }


    const hideIconBtn = document.querySelector('.social-media-icon-container ul:last-child li')
    const iconBody = document.querySelector('.social-media-icon-container')

    const mySideIcon = new SideIcon(iconBody, hideIconBtn)


    hideIconBtn.onclick = (event) => mySideIcon.setClick(event)


    let progressBar = document.querySelector('.progress_bar .bar')




    //Scroll progress Bar effect
    const scrollBar = function(){

        const scr = document.body.scrollTop || document.documentElement.scrollTop;
        const t = document.body.scrollHeight - document.body.clientHeight || document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const totalTop = (scr / t) * 100;
        // console.log(totalTop)
        progressBar.style.width = totalTop + '%'
    }
    scrollBar()   




    window.onscroll = () => {
        scrollBar()
        mySideIcon.scrollEfect()
    }

    const navigationContainer = document.querySelector('.navigation')
    const navIcon = document.querySelector('.navigation__navbar-container')
    const navigationList = document.querySelectorAll('.navigation__list-container li a')

    let isMenuOut = false



    const logoContainer = document.querySelector('.logo_svg')
    
    const toggle = function (val) {

        if (val === false) isMenuOut = true

        if (!isMenuOut) {
            navigationContainer.classList.add('active')
            logoContainer.classList.add('active')
            isMenuOut = true
        } else {
            navigationContainer.classList.remove('active')
            logoContainer.classList.remove('active')
            isMenuOut = false
        }

        // Top Scrolling when menu is out 
        if (isMenuOut) document.querySelector('body').style.overflow = 'hidden'
        if (!isMenuOut) document.querySelector('body').style.overflow = 'auto'

    }






    navIcon.onclick = () => toggle()


    navigationList.forEach(node => {
        node.onclick = () => toggle(false)
    })


    window.onload = () => myLoader.canvas.classList.add('deactivate')

