const startBtn = document.querySelector('#start')
const  screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const board = document.querySelector('#board')
const boardComp = document.querySelector('#boardComp')
const colors = ['#ab9b90', '#8d3439', '#f5b7b6', '#223a66', '#b48484','#f6d680', '#6c2f49', '#955f42', '#9e787d', '#b4a389', '#b2d76c']

const endBtn = document.querySelector('#end-btn')


const timeEl = document.querySelector('#time')
let time = 0
let score = 0
let scoreComp = 0

startBtn.addEventListener('click', ( event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', ( event) => {
    event.preventDefault()
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        console.log(time)
        screens[1].classList.add('up')
        startGame()
        startGameComp()
    }
})

endBtn.addEventListener('click', ( event) => {

    finishGame()
    event.preventDefault()
    location.reload()
})


boardComp.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        scoreComp++
        event.target.remove()
        createRandomCircleComp()
    }
})
board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}
function startGameComp() {
    setInterval(decreaseTime, 1000)
    createRandomCircleComp()
    winTheGame()
    setTime(time)
}

function decreaseTime() {
    if (time === 0){
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
    boardComp.innerHTML = `<h1>Cчет: <span class="primary">${scoreComp}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    setColor(circle)


    board.append(circle)
}
function createRandomCircleComp() {
    const circleComp = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = boardComp.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circleComp.classList.add('circle')
    circleComp.style.width = `${size}px`
    circleComp.style.height = `${size}px`
    circleComp.style.top = `${y}px`
    circleComp.style.left = `${x}px`
    setColorComp(circleComp)

    boardComp.append(circleComp)

}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


function setColor(circle) {
    const color = getRandomColor()
    circle.style.backgroundColor = color
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}
function setColorComp(circleComp) {
    const color = getRandomColor()
    circleComp.style.backgroundColor = color
    circleComp.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function winTheGame() {
    function kill() {
        const circleComp = document.querySelector('.circle')
        if (circleComp) {
            circleComp.click()
        }
    }
    setInterval(kill, 600)
}

