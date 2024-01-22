const difficulties = document.querySelectorAll('.difficulties')
const userName = document.querySelector('#username')
const start = document.querySelector('#start')
const difficultyDisplay = document.querySelector('h3')
let difficulty = ''

difficulties.forEach((button) => {
  button.addEventListener('click', () => {
    difficulty = button.getAttribute('id')
    localStorage.setItem('difficulty', difficulty)
    difficultyDisplay.innerHTML = `Difficulty: ${difficulty.toUpperCase()}`
  })
})

start.addEventListener('click', () => {
  if (userName.value) {
    let player = userName.value
    localStorage.setItem('player', player)
    location.href = 'game.html'
  }
})
