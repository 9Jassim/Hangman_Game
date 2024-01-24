# **_Hangman Game_**

## Date:1/17/2024

### By: Jassim Ahmed

#### [GitHub](https://github.com/9Jassim) | [LinkedIn](https://www.linkedin.com/in/jassim-mohammed-4ab7b7210/)

---

### **_Description_**

#### Building a hangman game. It's a game that require the player to complete random hidden words by guessing one letter at a time

#### The game is developed by HTML, CSS, and Javascript coding to create dynamic, nice looking, and enjoyable word guessing game

#### Made this game as a project for GA Software Engineering Immersive Course

---

### **_Technologies Used_**

- Javascript
  - API
- HTML
- CSS

---

### **_Getting Started_**

##### Select difficulty for number of wrong guesses. Easy(7), Medium(5), or Hard(3)

##### Type your user name then press play to start.

##### Pick a letter from the available selection.

##### Try guessing the word, each wrong guess get you closer to the trap.

##### When two guesses left you can show a hint!

##### A Trello board was used to keep track of development progress and can be viewed [Hangman](https://trello.com/b/WMz7BGI0/hangman).

##### The project was deployed and can be viewed here [Hangman](https://hangmanga.surge.sh/).

---

### **_Screenshots_**

##### Home Page

![Home page](/home%20page.png)

###### When user enters the game, it shows a home page where the user can select difficulty and type user name. A start button for starting the game. There is a scoreboard button which takes the user to the scoreboard page

##### Game Page

![Game Page](/game%20page.png)

###### When user starts a game a random word is hidden. the user can guess a letter by clicking the letter button or pressing the key on the keyboard. With each wrong answer the player get closer to the hole. when the user has two guesses left the hint button is enabled, the hint is the definition of the hidden word. When all the letters are shown, the user can go to the next round (new hidden word). when the player fall into the hole the user lose.

##### Scoreboard Page

![Scoreboard Page](/scoreboard.png)

###### The scoreboard shows the recorded games, showing the username, the score and at which difficulty was played.

---

### **_The Code Behind The Game:_**

```
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
```

###### The checkLetterExist function works everytime the user guesses a letter. It checks if the letter exists in the current hidden word. If the letter exist, the letter is shown on the page at the correct position. Also, it checks if the word is complete to enable the the next round button. Otherwise, if the letter dose not exisit, the player move towards the hole. Finally, it checks the number of wrong guesses left. If two guesses left, the hint button is enabled. Or if the user runs out of guesses, the round ends.

### **_Future Updates_**

- [x] style home page
- [x] style game page
- [x] add scoreboard
- [x] deploy the game

---

### **_Credits_**

##### [Random word API](https://random-word-api.vercel.app/)

##### [Word definition API](https://dictionaryapi.dev/)

##### [Background Image](https://www.shutterstock.com)

##### [Font](https://fonts.google.com/specimen/Fredericka+the+Great)

---
