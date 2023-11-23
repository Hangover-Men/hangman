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
    .catch((error) => errorContainer.classList.add('message--active'))

  console.log(letters)

  // Add key event listeners
  keys.forEach((key) => {
    key.addEventListener('click', handleClick)
  })

  /* Functions */

  function handleClick(event) {
    // Check if game is already over
    if (getGameStatus() !== 'goes on') {
      return
    }

    // Check if letter was right or wrong
    const letter = event.target.value

    if (letters.includes(letter) || letters.includes(letter.toLowerCase())) {
      event.target.classList.add('key--disabled')
      event.target.classList.add('key--true')
    } else {
      event.target.classList.add('key--disabled')
      event.target.classList.add('key--false')
      drawNextLine()
    }

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
    let wordsFound = 0

    keys.forEach((key) => {
      if (key.classList.contains('key--true')) {
        wordsFound++
      }
    })

    if (letters.length === wordsFound) {
      return 'win'
    }

    // Return 'goes on' if no win and no loss yet
    return 'goes on'
  }
}

startGame()
