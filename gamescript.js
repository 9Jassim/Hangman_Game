const difficulty = localStorage.getItem('difficulty')
const player = localStorage.getItem('player')
let correct = 0
let score = 0
const title = document.querySelector('#title')
title.innerHTML += ` ${difficulty} level`

const hangman = document.querySelector('.hangman')

const scoreDisplay = document.querySelector('#score')

const wordDisplay = document.querySelector('.word')

const lettersButtons = document.querySelectorAll('.letter')

const nextButton = document.querySelector('#next')

let wrong
console.log(difficulty)
if (difficulty === 'easy') {
  wrong = 7
} else if (difficulty === 'medium') {
  wrong = 5
} else if (difficulty === 'hard') {
  wrong = 3
} else {
  wrong = 7
}
console.log(wrong)

for (let i = 0; i < wrong + 1; i++) {
  const steps = document.createElement('div')
  steps.setAttribute('class', 'steps')
  if (i === 0) {
    steps.innerHTML = '🕳️'
  } else if (i === wrong) {
    steps.innerHTML = '🏃'
  } else {
    steps.innerHTML = '_'
  }
  hangman.appendChild(steps)
}

const stepsDivs = document.querySelectorAll('.steps')

const movePlayer = () => {
  stepsDivs.forEach((step, i) => {
    if (wrong === 0) {
      stepsDivs[1].innerHTML = '_'
    } else if (wrong === i) {
      step.innerHTML = '🏃'
      stepsDivs[i + 1].innerHTML = '_'
    }
  })
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
    movePlayer()
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
