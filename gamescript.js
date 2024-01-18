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

const startRound = () => {
  let word = getWord()

  for (let i = 0; i < word.length; i++) {
    const letter = document.createElement('div')
    letter.setAttribute('class', `${word[i]} letters`)
    letter.innerHTML = `_`
    wordDisplay.appendChild(letter)
  }
}

startRound()
