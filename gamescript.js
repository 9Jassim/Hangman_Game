const difficulty = localStorage.getItem('difficulty')
const player = localStorage.getItem('player')
let correct = 0
let score = 0
const title = document.querySelector('#title')
title.innerHTML += ` ${difficulty} level`

const playerTitle = document.querySelector('#player-title')
playerTitle.innerHTML = `${player}`

const scoreDisplay = document.querySelector('#score')

const wordDisplay = document.querySelector('.word')

const lettersButtons = document.querySelectorAll('.letter')

const nextButton = document.querySelector('#next')

let wrong
switch (difficulty) {
  case 'easy':
    wrong = 7
    break
  case 'medium':
    wrong = 5
    break
  case 'hard':
    wrong = 3
  default:
    wrong = 7
    break
}

const getWord = async () => {
  const response = await axios.get(
    'https://random-word-api.vercel.app/api?words=1'
  )
  const word = response.data[0]
  return word.toLowerCase()
}

const endGame = () => {
  lettersButtons.forEach((button) => {
    button.disabled = true
  })
}

const checkLetterExist = (letter) => {
  const lettersDivs = document.querySelectorAll('.letters')
  let show = false
  lettersDivs.forEach((div) => {
    if (letter === div.getAttribute('id')) {
      div.innerHTML = `${letter.toUpperCase()}`
      correct++
      show = true
    }
  })

  if (correct === lettersDivs.length) {
    nextButton.disabled = false
    score++
    endGame()
  } else if (!show) {
    wrong--
  }

  if (wrong === 0) {
    endGame()
  }
}

const newRound = () => {
  scoreDisplay.innerHTML = `Score: ${score}`
  wordDisplay.innerHTML = ''
  correct = 0
  lettersButtons.forEach((button) => {
    button.disabled = false
  })
}

const startRound = async () => {
  nextButton.disabled = true
  let word = await getWord()

  for (let i = 0; i < word.length; i++) {
    const letter = document.createElement('div')
    letter.setAttribute('class', `letters`)
    letter.setAttribute('id', `${word[i]}`)
    letter.innerHTML = `_`
    wordDisplay.appendChild(letter)
  }
}

lettersButtons.forEach((button) => {
  button.addEventListener('click', () => {
    checkLetterExist(button.getAttribute('id'))
    button.setAttribute('disabled', true)
  })
})

nextButton.addEventListener('click', () => {
  newRound()
  startRound()
})

startRound()
