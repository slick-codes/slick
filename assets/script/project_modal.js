function elem(elem){
	return document.createElement(elem)
}

    fetch('assets/script/project.json')
	.then(data => data.json() )
	.then(data => {

function generateCard(container , limit){
	// const container = elem('div')
	let index = 0
	for(singleData of data){

		if(limit && limit === index) break

		const {type , cardImg , cardAlt , title} = singleData

		var projectCard = elem('div')
		projectCard.setAttribute('data-type' ,  type)
		projectCard.className = 'project__card'

		let projectImageContainer = elem('div')
		projectImageContainer.className = 'project__image-container'
		projectCard.appendChild(projectImageContainer)

		let projectImg = elem('img')
	 	projectImg.src = 'assets/img/projects/' + cardImg
	 	projectImg.alt = cardAlt
	 	projectImageContainer.appendChild(projectImg)


	 	const projectImageAction = elem('div')
	 	projectImageAction.setAttribute('data-index' , index)
	 	projectImageAction.className = 'project__image-action'
	 	projectImageContainer.appendChild(projectImageAction)


	 	const li = elem('li')
	 	li.innerHTML = '<i class="fa fa-eye "></i> See'
	 	projectImageAction.appendChild(li)

	 	const txt = elem('div')
	 	txt.innerText = title
	 	txt.className = 'txt'
	 	projectCard.appendChild(txt)


	 	container.appendChild(projectCard)
	 	index++

            try {
            lazyLoading()
            }catch(err){}
	}	

// toggle Project card
    const projectHolder = document.querySelectorAll('.project__card-body .project__card')
    const buttons = document.querySelectorAll('.project__button-container button')
 
    const projectToggle = function (event) {

        buttons.forEach(node => {
            node.classList.remove('active')
        })
        event.target.classList.add('active')

        projectHolder.forEach(node => {
            if (event.target.getAttribute('data-triger') !== null && node.getAttribute('data-type') !== event.target.getAttribute('data-triger')) {
                node.classList.add('disabled')
            } else {
                node.classList.remove('disabled')
            }

        })
    }


    buttons.forEach(node => {
        node.onclick = (event) => projectToggle(event)
    })


}
		// console.log(limit)

        generateCard(document.querySelector('.project__card-body') , limit )


function createModelElement(event){

	const dataIndex = event?  event.target.getAttribute('data-index') : 0
	// const dataIndex = 0
	const {video , images , title , para} = data[dataIndex].modalDetails

	const projectPreviewContainer = elem('div')
	projectPreviewContainer.className = 'project__preview-container';
	document.querySelector('body').appendChild(projectPreviewContainer)
	// const projectPreviewContainer = document.querySelector('.project__preview-container')

	const projectContentContainer = elem('div')
	projectContentContainer.className = 'project__content-container'
	projectPreviewContainer.appendChild(projectContentContainer)
	
	const projectPreviewContent = elem('div')
	projectPreviewContent.className =  'project__preview-content'
	projectContentContainer.appendChild(projectPreviewContent)

	const previewClose = elem('div')
	previewClose.className = 'preview-close'
	projectPreviewContent.appendChild(previewClose)
	//close modal
	previewClose.onclick = () => projectPreviewContainer.remove()

	const previewCounter = elem('div')
	previewCounter.className = 'preview-counter'
	projectPreviewContent.appendChild(previewCounter)

	let imageIndex = 0
	const numToGo = elem('span')
	previewCounter.appendChild(numToGo)
	
	numToGo.innerText = 1
	//increament image counter 
	// const imageIncreament = () => {
	// imageIndex++
	// numToGo.innerText = imageIndex
	// }
	// imageIncreament()

	// const imageDecreament =() => imageIndex--

	let slash = document.createTextNode('/')
	previewCounter.appendChild(slash)

	const numRemaining = elem('span')
	numRemaining.innerText = images.length
	previewCounter.appendChild(numRemaining)


	const projectPreviewImg = elem('div')
	projectPreviewImg.className = 'project__preview-img'
	projectPreviewContent.appendChild(projectPreviewImg)

	const previewControlBtn = elem('div')
	previewControlBtn.className = 'preview-control-btn'
	
	if(images.length > 1) 
		projectPreviewImg.appendChild(previewControlBtn)

	const left = elem('div')
	left.className = 'ArrowLeft'
	left.innerHTML = '<i class="fa fa-chevron-circle-left"></i>'
	const right = elem('div')
	right.className = 'ArrowRight'
	right.innerHTML = '<i class="fa fa-chevron-circle-right"></i>'

	previewControlBtn.appendChild(left)
	previewControlBtn.appendChild(right)


	const previewImageContainer = elem('div')
	previewImageContainer.className = 'preview-image-container'
	projectPreviewImg.appendChild(previewImageContainer)

	const dir = 'assets/img/projects/'
	for(image of  images){

		const imageBody = elem('div')

		if(!image.video){
			const img = elem('img')
			img.src = dir + image.content
			imageBody.appendChild(img)
			// previewImageContainer.appendChild(imageBody)
			// console.log('image')
		}else{
			const video = elem('video')
			video.controls = true
			const source = elem('source')
			source.src = dir+ image.content
			const exten = image.content.split('.')
			source.type = 'video/'+ exten[exten.length -1]
			video.appendChild(source)

			imageBody.appendChild(video)
			video.autoplay = false
		}
			previewImageContainer.appendChild(imageBody)
	}

	const projectPreviewTxt = elem('div')
	projectPreviewTxt.className = 'project__preview-txt'
	projectPreviewTxt.innerHTML = `<h1>${title}</h1>`

	projectPreviewContent.appendChild(projectPreviewTxt)

	const p = elem('p')
	p.innerHTML = para

	projectPreviewTxt.appendChild(p)

	let currentValue = 0
	let numPres = 1

	left.style.display = 'none'

	function slider(event){

		if(event.code === 'ArrowRight') event.preventDefault()	
		const direction = /*(event.code.toLowerCase() === 'arrowright'|| 'arrowleft')? event.code :*/  event.target.className


		if((numPres === images.length && direction.toLowerCase() === 'arrowright') || 
			(numPres === 1 && direction.toLowerCase() === 'arrowleft'))  return 
		
			left.style.display = 'flex'
			right.style.display = 'flex'


		let parentWidth = Number(projectPreviewImg.offsetWidth)
		if(direction.toLowerCase() == 'arrowright'){
			if(numPres === images.length) return 
	
			currentValue += parentWidth
			numPres++
		}else{
			if(numPres === 0) return
			currentValue -= parentWidth
			numPres--
		}
		numToGo.innerText = numPres == 0 ? 1 : numPres
		if(numPres === images.length ) right.style.display = 'none'
		if(numPres === 1) left.style.display = 'none'
		var mode = `-${currentValue}px`
		previewImageContainer.style.transform = `translateX(${mode})`

	}

	left.onclick = slider
	right.onclick = slider
	
	lazyLoading()

}


const seeButton = document.querySelectorAll('.project__image-action')

for(button of seeButton)
	button.addEventListener('click',createModelElement, true)


	window.onkeydown = function(){
			// console.log(event)
			try{
				const code = event.code.toLowerCase()
				// console.log(code)
				if( code !== 'escape' && code !=='arrowright' && code !== 'arrowleft') return

					if(event.code === 'Escape') document.querySelector('.preview-close').click()
					if(code === 'arrowright') document.querySelector('.ArrowRight').click()
				
				else if(code === 'arrowleft') document.querySelector('.ArrowLeft').click()
			event.preventDefault()
			}catch(err){
				// console.error(err)
			}
		}
	})