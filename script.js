// this array contains words to be used as answers
const wordsArray = ["movie", "eagle", "scare", "renew", "prime", "slime"]
let randomWord = null
let wordGuess = null
let testedLetter = null
let counter = 0
let guesses = 0
let wordGuessArray = []


// this function takes the pressed character and puts its text into the current div

function insertKey(e) {
    //insertKey also needs to handle pushing entry into wordGuessArray
    if (e.key === "Enter" && counter % 5 === 0) {
        console.log("Next, we will run checkAnswer.")
        checkAnswer()
    } 
    if (e.key != "Enter" && counter % 5 != 0) {
        console.log("Keep guessing letters...")
    } 
    if (e.key != "Enter") {
        counter += 1
        
        //make the currentBox variable dynamic/ responsive to insertKey
        let currentBox = document.getElementById(`box${counter}`)

        // if counter >= 31, insertKey must NOT add innerText as there are no more boxes
        if (counter >= "31") {
            return
        }
        wordGuessArray.push(`${e.key}`)
        currentBox.innerText=`${e.key}`
        console.log(counter)
        console.log(`Your guess so far consists of "${wordGuessArray}"`)
        }
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
    if (JSON.stringify(wordGuessArray) === JSON.stringify(randomWordArray)) {
        if (counter === 5) {
            for (let i = 1; i < counter+1; i++) {
                let styleThisBox = document.getElementById(`box${i}`)
                styleThisBox.classList.add("right-guess")
            }
        }
        if (counter === 10) {
            console.log("We're at 10!")
            for (let i = 6; i < counter+1; i++) {
                let styleThisBox = document.getElementById(`box${i}`)
                styleThisBox.classList.add("right-guess")
            }
        }
        alert("You guessed the correct word!")
        console.log("You win!")
        window.removeEventListener('keydown', insertKey) 
        return
    } else {
    for (let i = 0; i < randomWordArray.length; i++) {
        if (randomWordArray[i] !== wordGuessArray[i]) {
            // turn currently examined wrong letter from the randomWordArray into variable testedLetter
            testedLetter = wordGuessArray[i]
            console.log(`The letter ${testedLetter} is not found at this position. Now testing to see if it's in this word at all...`)
            // need to take testedLetter and loop through random word to see if it appears elsewhere
            for (let j = 0; j < randomWordArray.length; j++) {
                // I WANT TO SKIP INDEX IN FOR LOOP "j" WHEN IT IS THE SAME
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
        wordGuessArray = []
        console.log(`Your next guess now consists of "${wordGuessArray}"`)
    }
}

// this function will initate the game by choosing a word
wordSelector()


