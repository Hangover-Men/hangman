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
