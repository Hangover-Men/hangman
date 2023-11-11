let queue = 1
const lines = document.querySelectorAll('.line')
const nextLine = getNextLine(queue, lines)

console.log('NEXT LINE: ', nextLine)

/* Functions */

/**
 * @param  {number} queue
 * @param  {NodeList} lines
 * @returns {Node} next line in queue
 */
function getNextLine(queue, lines) {
  lines.forEach((line) => {
    if (line.dataset.lineNr === `${queue}`) {
      return line
    }
  })
}
