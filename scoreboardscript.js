let games = JSON.parse(localStorage.getItem('games'))

const scoreboard = document.querySelector('.scoreboard')
const homeButton = document.querySelector('#home')
if (games !== null) {
  games.sort((gameA, gameB) => gameB.score - gameA.score)

  games.forEach((game) => {
    if (game.score !== 0) {
      const gameDiv = document.createElement('tr')
      gameDiv.innerHTML = `<td>${game.userName}</td>
  <td>${game.score}</td>
  <td>${game.difficulty}</td>`
      scoreboard.appendChild(gameDiv)
    }
  })
}
homeButton.addEventListener('click', () => {
  location.href = 'index.html'
})
