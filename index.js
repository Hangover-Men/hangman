/**
 * API code
 * @author Armin Saderi
 */

let letters = getRandomWord()
console.log('HIER =>', letters)

function getRandomWord() {
  let letters = []
  // api call
  const request = new XMLHttpRequest()
  /** Parameters of api call
   * language = deutsch
   * number of given words = 1
   * */
  request.open(
    'GET',
    'https://random-word-api.herokuapp.com/word?lang=de&number=1'
  )
  request.onload = function () {
    //console.log(request);
    if (request.status === 200) {
      //console.log(request.responseText);
      //console.log(request.responseText.replace(/[\[\]"]/g, ''));

      // sanitize breakets and explanation marks: ["Test"] => Test
      const randomWord = request.responseText.replace(/[\[\]"]/g, '')

      // push letter of word into array
      for (let i = 0; i < randomWord.length; i++) {
        letters.push(randomWord.charAt(i))
      }
      console.log('im onload = ' + letters)
    } else {
      console.log(
        'Error ' +
          request.status +
          ' = ' +
          request.statusText +
          'while fetching ' +
          request.responseURL
      )
      console.log('Trying again...')
      getRandomWord()
    }
  }
  request.send()
  console.log('Kurz vor Ende der func = ' + letters)
  return letters
}

/**
 * Keyboard code
 * @author Mehmet Balkan
 */

const keyboard = document.querySelectorAll('.key')
console.log('hier der queryselector')
console.log(keyboard)
console.log(keyboard.button)

keyboard.forEach((key) => {
  key.addEventListener('click', function (e) {
    console.log(e.target.value.toLowerCase())
  })
})

/**
 * SVG lines code
 * @author Savas Tireng
 */

/* Program */

const lines = document.querySelectorAll('.line')
const winContainer = document.querySelector('.message--win')
const failContainer = document.querySelector('.message--fail')
let queue = 1 // There are 10 lines - we need to keep track which one is the next to draw

// Add key event listeners
keyboard.forEach((key) => {
  key.addEventListener('click', handleClick)
})

/* Functions */

function handleClick(event) {
  // Check if game is already over
  if (getGameStatus() !== 'goes on') {
    return
  }

  // Check if letter was right or wrong
  const letter = event.target.value.toLowerCase()

  if (letters.includes(letter)) {
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

  keyboard.forEach((key) => {
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
