

    const body = document.querySelector('#preload')

    class PreLoader {
        constructor(word) {
            this.word = word.toUpperCase()
            this.createSpan = document.createElement('span')
        }

        addElement(val){
            return document.createElement(val);
        }


        wordToArray(){
            this.newWord = []

            for(let i = 0; i < this.word.length; i++)
                this.newWord.push(this.word[i])

            return this.newWord
        }

        setElements(){

            //Create The Canvas Div Element
            this.canvas = this.addElement('body')
            let canvas = this.canvas
            canvas.classList.add('canvas')
            body.appendChild(canvas)


            //Create the topSection child div of the Canvas
            const topSection = this.addElement('div')
            topSection.classList.add('topSection')
            canvas.appendChild(topSection)


            //Create an Horizontal Line
            const hr = this.addElement('hr')
            canvas.appendChild(hr)

            //Create the BottomSection child div of the Canvas
            const bottomSection = this.addElement('div')
            bottomSection.classList.add('bottomSection')
            canvas.appendChild(bottomSection)

            this.wordToArray().forEach( (node , index) => { 
            //Add the Span and Word to the Top and Bottom Section Child of the Convas Area
                let elem = this.addElement('span')
                topSection.appendChild(elem)
                elem.innerText = node
                elem.setAttribute('style', `animation-delay:${0.1 * (index + 1) }s`)

                let secElem = this.addElement('span')
                bottomSection.appendChild(secElem);
                secElem.innerText = node
                secElem.setAttribute('style', `animation-delay:${0.1 * (index + 1) }s`)
            })

            const containerWidth = topSection.offsetWidth + 'px'
            hr.style.width = containerWidth
            // console.log(containerWidth , 'widthing')

            hr.style.display = 'none'
        }

       async runPreloader(){

            let checkCanvas = document.querySelector('.canvas')
            if(checkCanvas) checkCanvas.remove()


            this.wordToArray()
            await this.setElements()
            checkCanvas = document.querySelector('.canvas')
            setTimeout( () => checkCanvas.remove() , 3000 )
        }
as



 }

const myLoader = new PreLoader('slick');

myLoader.runPreloader()


