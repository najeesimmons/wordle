// this array contains words to be used as answers
const wordsArray = ["movie", "eagle", "scare", "renew", "prime", "slime"]
let randomWord = null
let wordGuess = null
let testedLetter = null
let counter = 0

// this function takes the pressed character and puts its text into the current div

function insertKey(e) {
   counter += 1

// SYNTAX OPTIONS to make the currentBox variable dynamic/ responseive to insertKey
// let currentBox = document.getElementById(`box${counter}`)
// let currentBox = document.getElementById('box'+counter.toString())
   let currentBox = document.getElementById('box'+`${counter}`)
   // if counter >= 31, insertKey must NOT add innerText as there are no more boxes
   if (counter >= "31") {
       return
   }
   currentBox.innerText=`${e.key}`
   console.log(counter)
}

// keydown event listener added to window
window.addEventListener('keydown', insertKey) 


// this function randomly picks a word from wordsArray to be the answer
function wordSelector() {
    let wordIndex = Math.floor(Math.random() * wordsArray.length)
    randomWord = wordsArray[wordIndex]
    console.log(`The word is "${randomWord}"`)
}

// this will check whether the player's guess is the right answer
// it will check each letter and compare against randomWord
function checkAnswer() {
    let randomWordArray = randomWord.split("") 
    wordGuess = prompt("Guess the word!");
    console.log(`Your guess is "${wordGuess}"`)
    let wordGuessArray = wordGuess.split("")
    for (let i = 0; i < randomWordArray.length; i++) {
        if (randomWordArray[i] !== wordGuessArray[i]) {
            // turn currently examined wrong letter from the randomWordArray into variable testedLetter
            testedLetter = wordGuessArray[i]
            console.log(`The letter ${testedLetter} is not found at this position. Now testing to see if it's in this word at all...`)
            // need to take testedLetter and loop through random word to see if it appears elsewhere
            for (let j = 0; j < randomWordArray.length; j++) {
                // I WANT TO SKIP INDEX IN FOR LOOP "j" WHEN IT IS THE SAME
                // AS FOR LOOP HERE "i"
                if (j === i) {
                    continue;
                }
               
                if (testedLetter === randomWordArray[j]) {
                    console.log(`The letter "${testedLetter}" is in this word, but this is not its' correct place.`)
                } 
                if (testedLetter !== randomWordArray[j]) {
                    console.log(`The letter "${testedLetter}" does not belong in this position.`)
                }
            }
        } else {
            console.log(`"${wordGuessArray[i]}" is the correct letter, in the correct place.`)
        }
    }
}

// this function will initate the game and all funcitons needed to play
function startGame() {
    wordSelector()
    checkAnswer()
}

startGame()
