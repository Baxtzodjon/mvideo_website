let tabs = document.querySelectorAll(".scrollable-tabs-container a")
let rightArrow = document.querySelector(".scrollable-tabs-container .right-arrow svg")
let leftArrow = document.querySelector('.scrollable-tabs-container .left-arrow svg')
let tabsList = document.querySelector('.scrollable-tabs-container ul')
let leftArrowContiner = document.querySelector('.scrollable-tabs-container .left-arrow')
let rightArrowContainer = document.querySelector('.scrollable-tabs-container .right-arrow')

let removeAllActiveClasses = () => {
    tabs.forEach(tab => {
        tab.classList.remove('active')
    })
}

tabs.forEach(tab => {
    tab.onclick = () => {
        removeAllActiveClasses()
        tab.classList.add('active')
    }
})

let manageIcons = () => {
    if(tabsList.scrollLeft >= 20) {
        leftArrowContiner.classList.add('active')
    } else {
        leftArrowContiner.classList.remove('active')
    }

    let maxScrollValue = tabsList.scrollWidth - tabsList.clientHeight - 20
    console.log('scroll width: ', tabsList.scrollWidth)
    console.log('client width: ', tabsList.clientHeight)

    if (tabsList.scrollLeft >= maxScrollValue) {
        rightArrowContainer.classList.remove('active')
    } else {
        rightArrowContainer.classList.add('active')
    }
}

rightArrow.onclick = () => {
    tabsList.scrollLeft += 200
    manageIcons()
}

leftArrow.onclick = () => {
    tabsList.scrollLeft -= 200
    manageIcons()
}

let drag = (e) => {
    if (!dragging) return
    tabsList.classList.add('dragging')
    tabsList.scrollLeft -= e.movementX
}

tabsList.addEventListener('scroll', manageIcons);

tabsList.addEventListener('mousedown', () => {
    dragging = true
});

tabsList.addEventListener('mousedown', drag)

document.addEventListener('mousedown', () => {
    dragging = false
    tabsList.classList.remove('dragging')
})

// Slider js
let list = document.querySelector('.slider .list')
let items = document.querySelectorAll('.slider .list .item')
let dots = document.querySelectorAll('.slider .dots li')
let prev = document.getElementById('prev')
let next = document.getElementById('next')

let active = 0
let lengthItems = items.length - 1

next.onclick = function() {
    if (active + 1 > lengthItems) {
        active = 0
    } else {
        active = active + 1 
    }
    reloadSlider()
}

prev.onclick = function() {
    if (active - 1 < 0) {
        active = lengthItems
    } else {
        active = active - 1
    }
    reloadSlider()
}

let refreshSlider = setInterval(() => {next.click()}, 3000)

function reloadSlider() {
    let checkLeft = items[active].offsetLeft
    list.style.left = -checkLeft + 'px'

    let lastActiveDot = document.querySelector('.slider .dots li.active')
    lastActiveDot.classList.remove('active')
    dots[active].classList.add('active')
    clearInterval(refreshSlider)
    refreshSlider = setInterval(() => {next.click()}, 5000)
}
dots.forEach((li, key) => {
    li.addEventListener('click', function() {
        active = key
        reloadSlider()
    })
})