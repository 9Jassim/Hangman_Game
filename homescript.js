const difficulties = document.querySelectorAll('.difficulties')
const userName = document.querySelector('#username')
const start = document.querySelector('#start')
let difficulty = ''

difficulties.forEach((button) => {
  button.addEventListener('click', () => {
    difficulty = button.getAttribute('id')
  })
})

start.addEventListener('click', () => {})
