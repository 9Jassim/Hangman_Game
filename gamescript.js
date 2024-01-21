let difficulty = localStorage.getItem('difficulty')
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
const homeButton = document.querySelector('#home')

let wrong
let word

const setDifficulty = () => {
  if (difficulty === 'easy') {
    wrong = 7
  } else if (difficulty === 'medium') {
    wrong = 5
  } else if (difficulty === 'hard') {
    wrong = 3
  } else {
    wrong = 7
  }
}

const resetHangman = () => {
  setDifficulty()
  hangman.innerHTML = ''
  for (let i = 0; i < wrong + 1; i++) {
    const steps = document.createElement('div')
    steps.setAttribute('class', 'steps')
    if (i === 0) {
      steps.innerHTML = '🕳️'
    } else if (i === wrong) {
      steps.innerHTML = '🏃'
    } else {
      steps.innerHTML = ''
    }
    hangman.appendChild(steps)
  }
}

const movePlayer = () => {
  const stepsDivs = document.querySelectorAll('.steps')
  stepsDivs.forEach((step, i) => {
    if (wrong === 0) {
      stepsDivs[1].innerHTML = '~'
    } else if (wrong === i) {
      step.innerHTML = '🏃'
      stepsDivs[i + 1].innerHTML = '~'
    }
  })
}

const getWord = async () => {
  const response = await axios.get(
    'https://random-word-api.vercel.app/api?words=1'
  )
  const newWord = response.data[0]
  return newWord.toLowerCase()
}

const endGame = () => {
  if (wrong === 0) {
    const wordTitle = document.createElement('h1')
    wordTitle.innerHTML = `You Lost, the word is : ${word} `
    wordDisplay.innerHTML = ''
    wordDisplay.appendChild(wordTitle)
  }
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
    nextButton.setAttribute('id', 'next-enable')
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
  nextButton.setAttribute('id', 'next')
  lettersButtons.forEach((button) => {
    button.classList.remove('letter-pressed')
    button.disabled = false
  })
}

const startRound = async () => {
  resetHangman()
  nextButton.disabled = true
  word = await getWord()

  for (let i = 0; i < word.length; i++) {
    const letter = document.createElement('div')
    letter.setAttribute('class', `letters`)
    letter.setAttribute('id', `${word[i]}`)
    letter.innerHTML = `_`
    wordDisplay.appendChild(letter)
  }
}

startRound()

lettersButtons.forEach((button) => {
  button.addEventListener('click', () => {
    checkLetterExist(button.getAttribute('id'))
    button.disabled = true
    button.classList.toggle('letter-pressed')
  })
})

nextButton.addEventListener('click', () => {
  newRound()
  startRound()
})

homeButton.addEventListener('click', () => {
  difficulty = localStorage.setItem('difficulty', 'easy')
  location.href = 'index.html'
})
