let games = JSON.parse(localStorage.getItem('games'))

const scoreboard = document.querySelector('.scoreboard')
const homeButton = document.querySelector('#home')

games.forEach((game) => {
  const gameDiv = document.createElement('tr')
  gameDiv.innerHTML = `<td>${game.userName}</td>
  <td>${game.score}</td>
  <td>${game.difficulty}</td>`
  scoreboard.appendChild(gameDiv)
})

homeButton.addEventListener('click', () => {
  location.href = 'index.html'
})
