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
const hintButton = document.querySelector('#hint')
const hintDisplay = document.querySelector('#showHint')

let ended = false
let wrong
let word
let definition
let games = []
let keyPressed = []

if (localStorage.getItem('games') === null) {
  localStorage.setItem('games', JSON.stringify(games))
}

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

const createGameObject = () => {
  return {
    userName: player,
    score: score,
    difficulty: difficulty
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

const getDefinition = async (word) => {
  const response = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  )
  const definition = response.data[0].meanings[0].definitions[0].definition
  return definition
}

const endGame = () => {
  if (wrong === 0) {
    const wordTitle = document.createElement('h1')
    wordTitle.innerHTML = `You Lost, the word is : ${word} `
    wordDisplay.innerHTML = ''
    wordDisplay.appendChild(wordTitle)
    const game = createGameObject()
    let games = JSON.parse(localStorage.getItem('games'))
    games.push(game)
    localStorage.setItem('games', JSON.stringify(games))
  }
  ended = true
  keyPressed = []
  lettersButtons.forEach((button) => {
    button.disabled = true
  })
}

const checkLetterExist = (letter) => {
  const lettersDivs = document.querySelectorAll('.letters')
  let show = false
  lettersDivs.forEach((div) => {
    if (letter === div.getAttribute('value')) {
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

  if (wrong === 2) {
    hintButton.disabled = false
    hintButton.setAttribute('id', 'hint-enable')
  }
}

const newRound = () => {
  ended = false
  scoreDisplay.innerHTML = `Score: ${score}`
  wordDisplay.innerHTML = ''
  hintDisplay.innerHTML = ''
  correct = 0
  nextButton.setAttribute('id', 'next')
  hintButton.setAttribute('id', 'hint')
  lettersButtons.forEach((button) => {
    button.classList.remove('letter-pressed')
    button.disabled = false
  })
}

const startRound = async () => {
  resetHangman()
  nextButton.disabled = true
  hintButton.disabled = true
  word = await getWord()
  definition = await getDefinition(word)

  for (let i = 0; i < word.length; i++) {
    const letter = document.createElement('div')
    letter.setAttribute('class', `letters`)
    letter.setAttribute('value', `${word[i]}`)
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

addEventListener('keypress', (event) => {
  if (!ended) {
    letter = event.key
    if (
      !keyPressed.some((key) => {
        return letter === key
      })
    ) {
      checkLetterExist(letter.toLowerCase())
    }
    keyPressed.push(letter)
    const keyButton = document
      .querySelector('.letters-button')
      .querySelector(`#${letter.toLowerCase()}`)
    keyButton.disabled = true
    keyButton.classList.add('letter-pressed')
  }
})

nextButton.addEventListener('click', () => {
  newRound()
  startRound()
})

homeButton.addEventListener('click', () => {
  difficulty = localStorage.setItem('difficulty', 'easy')
  location.href = 'index.html'
})

hintButton.addEventListener('click', () => {
  hintDisplay.innerHTML = definition
})
