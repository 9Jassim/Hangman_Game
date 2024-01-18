const difficulty = localStorage.getItem('difficulty')
const player = localStorage.getItem('player')

const title = document.querySelector('h1')
title.innerHTML += ` ${difficulty} level`

const playerTitle = document.querySelector('#player-title')
playerTitle.innerHTML = `${player}`

const wordDisplay = document.querySelector('.word')

const getWord = () => {
  return 'hello'
}

const checkLetterExist = (letter) => {
  const lettersDivs = document.querySelectorAll('.letters')
  lettersDivs.forEach((div) => {
    if (letter === div.getAttribute('id')) {
      div.innerHTML = `${letter.toUpperCase()}`
    }
  })
}

const startRound = () => {
  let word = getWord()

  for (let i = 0; i < word.length; i++) {
    const letter = document.createElement('div')
    letter.setAttribute('class', `letters`)
    letter.setAttribute('id', `${word[i]}`)
    letter.innerHTML = `_`
    wordDisplay.appendChild(letter)
  }

  const lettersButtons = document.querySelectorAll('.letter')

  lettersButtons.forEach((button) => {
    button.addEventListener('click', () => {
      checkLetterExist(button.getAttribute('id'))
      button.setAttribute('disabled', true)
    })
  })
}

startRound()
