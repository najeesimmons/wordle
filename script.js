
// create divs within the board html element
document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    function createSquares() {
        const gameboard = document.getElementById("board")

        for (let i = 0; i < 30; i ++) {
            let square = document.createElement("div")
            square.classList.add("square")
            square.setAttribute("id", i + 1)
            gameboard.appendChild(square);
        }
    }
})

// adding functionlality for on screen keyboard to collect letter data
const keys = document.querySelectorAll('.keyboard-row button')

for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({target}) => {
        const key = target.getAttribute("data-key")
        console.log(key)
    }
}

// this array contains words to be used as answers
const wordsArray = ["movie", "scare", "clear", "crime", "slime", "clash"]
let randomWord = null
let wordGuess = null
let counter = 0
let guessCounter = 0
// I will use guesslength to toggle length of guesses
let guesslength

// creating nested arrays that will store guess letters
let rows = 6
let guesses = new Array(rows); // create an empty array of "rows"
for (let i = 0; i < rows; i++) {
    guesses[i] = new Array(0); // make each element an array
  }

// this function will initate the game by choosing a word
wordSelector()

// this function randomly picks a word from wordsArray to be the answer
function wordSelector() {
    let wordIndex = Math.floor(Math.random() * wordsArray.length)
    randomWord = wordsArray[wordIndex]
    console.log(`The word is "${randomWord}"`)
}

// keydown event listener added to window
window.addEventListener('keydown', insertKey) 

// this function takes the pressed character and puts its text into the current div
function insertKey(e) {
    //insertKey also needs to handle pushing entry into the nested array for the current guess
    if (e.key === "Backspace") {
        handleBackspace()
        return   
    }
    if (e.key === "Enter") {
        handleEnter()
    }
    if (e.key != "Enter") {
        if (guesses[guessCounter].length === 5) {
            return
        }
        counter += 1
        //make the currentBox variable dynamic/ responsive to insertKey
        let currentBox = document.getElementById(`${counter}`)
        // if counter >= 31, insertKey must NOT add innerText as there are no more boxes
        if (counter >= "31") {
            window.removeEventListener('keydown', insertKey) 
            return
        } else {
            guesses[guessCounter].push(`${e.key}`)
            console.log(`Your guess so far consists of "${guesses[guessCounter]}"`)
        }
        currentBox.innerText=`${e.key}`
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
        window.removeEventListener('keydown', insertKey)
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