async function startGame() {
  const lines = document.querySelectorAll('.line')
  const winContainer = document.querySelector('.message--win')
  const failContainer = document.querySelector('.message--fail')
  const errorContainer = document.querySelector('.message--error')
  const keys = document.querySelectorAll('.key')
  let queue = 1 // There are 10 lines - we need to keep track which one is the next to draw

  const letters = await fetch(
    'https://random-word-api.herokuapp.com/word?lang=de&number=1'
  )
    .then((response) => response.json())
    .then((data) => Array.from(data[0]))
    .then((word) => {
      return word
    })
    .catch(() => errorContainer.classList.add('message--active'))

  const letterData = letters.map((letter) => ({
    letter: letter,
    found: false,
  }))

  console.log(letterData)

  // Add key event listeners
  keys.forEach((key) => {
    key.addEventListener('click', handleClick)
  })

  blankspace()

  /* Functions */

  function handleClick(event) {
    // Check if game is already over
    if (getGameStatus() !== 'goes on') {
      return
    }

    // Check if letter was right or wrong
    const inputLetter = event.target.value
    let foundLetter = false

    letterData.forEach((item) => {
      if (
        item.found === false &&
        (item.letter === inputLetter ||
          item.letter.toLowerCase() === inputLetter)
      ) {
        item.found = true
        foundLetter = true
        event.target.classList.add('key--disabled')
        event.target.classList.add('key--true')
      }
    })

    if (!foundLetter) {
      event.target.classList.add('key--disabled')
      event.target.classList.add('key--false')
      drawNextLine()
    }

    blankspace()
    // Check & update game status
    switch (getGameStatus()) {
      case 'goes on':
        return
      case 'win':
        winContainer.classList.add('message--active')
        return
      case 'fail':
        failContainer.classList.add('message--active')
        return
    }
  }

  function drawNextLine() {
    lines.forEach((line) => {
      if (line.dataset.lineNr === `${queue}`) {
        line.classList.add('line--active')
      }
    })

    queue++
  }

  function getGameStatus() {
    // Return 'fail' if too many mistakes were made
    if (queue > 10) {
      return 'fail'
    }

    // Return 'win' if all words are found
    let wordsMissing = false

    letterData.forEach((item) => {
      if (item.found === false) {
        wordsMissing = true
      }
    })

    if (!wordsMissing) {
      return 'win'
    }

    // Return 'goes on' if no win and no loss yet
    return 'goes on'
  }

  function blankspace() {
    // list of special chars
    const specialSymbols = ['-', '!', '?', '.', ' ']
    const word = new Array(letters.length)
    const testdiv = document.querySelector('.word').firstElementChild
    for (let index = 0; index < letters.length; index++) {
      // div, where the word is represented
      // check if current letter is one of given special chars
      // if true --> display that special char
      // else    --> display blankspace
      if (letterData[index].found == true) {
        if (index == 0) {
          word[index] = letterData[index].letter.toUpperCase()
        } else {
          word[index] = letterData[index].letter
        }
      } else {
        if (specialSymbols.includes(letters[index])) {
          if (specialSymbols.indexOf[letters[index]] == 4) {
            word[index] = '&nbsp;' + '&nbsp;'
          } else {
            word[index] =
              specialSymbols[specialSymbols.indexOf(letters[index])] + '&nbsp;'
          }
        } else {
          word[index] = '_&nbsp;'
        }
      }
    }
    testdiv.innerHTML = word.join('')
  }
}

startGame()
