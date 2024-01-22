let games = JSON.parse(localStorage.getItem('games'))

const scoreboard = document.querySelector('.scoreboard')
const homeButton = document.querySelector('#home')

games.forEach((game) => {
  const gameDiv = document.createElement('div')
  gameDiv.innerHTML = `Username: ${game.userName} Score: ${game.score} Difficulty: ${game.difficulty}`
  scoreboard.appendChild(gameDiv)
})

homeButton.addEventListener('click', () => {
  location.href = 'index.html'
})
