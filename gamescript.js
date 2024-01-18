const title = document.querySelector('h1')
title.innerHTML += ` ${localStorage.getItem('difficulty')} level`

const playerTitle = document.querySelector('#player-title')
playerTitle.innerHTML = `${localStorage.getItem('player')}`
