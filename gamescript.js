const difficulty = localStorage.getItem('difficulty')
const player = localStorage.getItem('player')
let correct = 0

const title = document.querySelector('h1')
title.innerHTML += ` ${difficulty} level`

const playerTitle = document.querySelector('#player-title')
playerTitle.innerHTML = `${player}`

const wordDisplay = document.querySelector('.word')

const lettersButtons = document.querySelectorAll('.letter')

const nextButton = document.querySelector('#next')

const getWord = () => {
  return 'hello'
}

const checkLetterExist = (letter) => {
  const lettersDivs = document.querySelectorAll('.letters')
  lettersDivs.forEach((div) => {
    if (letter === div.getAttribute('id')) {
      div.innerHTML = `${letter.toUpperCase()}`
      correct++
    }
  })
  if (correct === lettersDivs.length) {
    nextButton.disabled = false
  }
}

const newRound = () => {
  wordDisplay.innerHTML = ''
  lettersButtons.forEach((button) => {
    button.disabled = false
  })
}

const startRound = () => {
  nextButton.disabled = true
  let word = getWord()

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
