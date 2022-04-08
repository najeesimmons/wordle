// create divs within the board html element
document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    function createSquares() {
        const board = document.getElementById("board")

        for (let i = 0; i < 30; i ++) {
            let square = document.createElement("div")
            square.classList.add("square")
            square.setAttribute("id", i + 1)
            board.appendChild(square);
        }
    }
})

// this array contains words to be used as answers
const wordsArray = ["movie", "scare", "clear", "crime", "slime", "clash", "great", "smear", "snail", "grant", "drain", "quote", "query", "claim", "solve", "prone"]
let randomWord = null
let wordGuess = null
let counter = 0
let guessCounter = 0

// this function will initate the game by choosing a word from wordsArray
function wordSelector() {
    let wordIndex = Math.floor(Math.random() * wordsArray.length)
    randomWord = wordsArray[wordIndex].toUpperCase()
    console.log(`The word is "${randomWord}"`)
}
wordSelector()

// creating nested arrays that will store guess letters
let rows = 6
let guesses = new Array(rows); // create an empty array of "rows"
for (let i = 0; i < rows; i++) {
    guesses[i] = new Array(0); // make each element an array
  }

// keydown event listener added to window
window.addEventListener('keydown', getKey)

function getKey(e) {
    console.log((e.which))
    let pressedKey = e.which
    console.log(pressedKey)
    paintKey(pressedKey)
}

// grabbing all keyboard buttons on the DOM
const keys = document.querySelectorAll('.keyboard-row button')

// looping thru all keys
for (let i = 0; i < keys.length; i++) {
    // the "target parameter is the key press 'on click'
    keys[i].onclick = ({target}) => {
        // assingning "data key" attribute (letter) to a variable 
        const pressedKey = parseInt(target.getAttribute("data-key"))
        console.log(pressedKey)
        target.blur()
        paintKey(pressedKey)
    }
}

// this will check whether the player's guess is the right answer
// it will check each letter of current guesses Array and compare against randomWord
function checkAnswer() {
    let randomWordArray = randomWord.split("")
    console.log(guesses[guessCounter], randomWordArray, guessCounter)
    if (JSON.stringify(guesses[guessCounter]) === JSON.stringify(randomWordArray)) {
        for (let i = counter - 4; i < counter+1; i++) {
                let styleThisBox = document.getElementById(`${i}`)
                styleThisBox.classList.add("right-guess")
            }
        alert("You guessed the correct word! Refresh page to play again!")
        console.log("You win!")
        window.removeEventListener('keydown', paintKey)
    } else {
        let allBoxes = document.querySelectorAll('.square')
        let allBoxesForStyles = Array.from(allBoxes)
        const boxes = getBoxRow(allBoxesForStyles)
        for (let i = 0; i < randomWordArray.length; i++) {
            if (randomWordArray[i] !== guesses[guessCounter][i]) {
                let testedLetter = guesses[guessCounter][i]
                console.log(`The letter ${testedLetter} is not found at this position. Now testing to see if it's in this word at all...`)
                // test letter by looping through random word to see if it appears elsewhere
                for (let j = 0; j < randomWordArray.length; j++) {
                    // I WANT TO SKIP INDEX IN FOR LOOP "j" WHEN IT IS THE SAME
                    if (j === i) {
                        continue;
                    }
                    if (testedLetter === randomWordArray[j]) {
                        console.log(`The letter "${testedLetter}" is in this word, but this is not its' correct place.`)
                        let styleNow = boxes[i]
                        styleNow.classList.add('right-letter-wrong-place')
                    } 
                    if (testedLetter !== randomWordArray[j]) {
                        console.log(`The letter "${testedLetter}" does not belong in this position.`)
                        let styleNow = boxes[i]
                        styleNow.classList.add('wrong-guess')
                    }
                }
            } else {
                console.log(`"${guesses[guessCounter][i]}" is the correct letter, in the correct place.`)
                console.log(`the coutner is at ${counter}`)
                let styleNow = boxes[i]
                styleNow.classList.add('right-guess')
            } 
        }
    }     
}

// this will paint the digitally pressed key "letter" on the DOM at the "current" div
function paintKey (pressedKey) {
    // space bar
    if (pressedKey === 32) {
        return
    }
    // backspace
    if (pressedKey === 8) {
        handleBackspace()
        return
    }
    // enter
    if (pressedKey === 13) {
        handleEnter()
        return
    }
    // if current guess is already full, do NOTHING
    if (guesses[guessCounter].length === 5) {
        return
    }
    // if counter >= 31, insertKey must NOT add innerText as there are no more boxes
    if (counter >= "31") { 
        return
    } 
    if (pressedKey >= 65 && pressedKey <= 90) {
        if (guesses[guessCounter].length === 5) {
            return
            }
            counter += 1
            //make the currentBox variable dynamic/ responsive to insertKey
            let currentBox = document.getElementById(`${counter}`)
            console.log(currentBox)
            guesses[guessCounter].push(`${String.fromCharCode(pressedKey)}`)
            console.log(`Your guess so far consists of "${guesses[guessCounter]}"`)
            currentBox.innerText=`${String.fromCharCode(pressedKey)}`
            } else {
                return
            }
    }

function getBoxRow (boxes) {
        return boxes.slice(counter -5, counter)
    }

function handleBackspace () {
    if (guesses[guessCounter].length === 0) {
        return
    }
    let currentBox = document.getElementById(`${counter}`)
        currentBox.innerText=""
        guesses[guessCounter].pop()
        counter -=1
    }
function handleEnter() {
    if (counter % 5 === 0 && guesses[guessCounter].length === 5) {
        checkAnswer(guesses[guessCounter])
        guessCounter += 1
        console.log(guessCounter)
        return
    }
    if (guesses[guessCounter].length != 5) {
        console.log(guesses[guessCounter] , guesses[guessCounter].length)
        alert("A guess MUST consist of 5 letters -- no more, no less!")
    }
}