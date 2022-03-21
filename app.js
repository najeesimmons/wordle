
// this array contains words to be used as answers
const wordsArray = ["movie", "eagle", "scare", "renew", "prime", "slime"]
let randomWord 
let wordGuess

// this function randomly picks a word from wordsArray to be the answer
function wordSelector() {
    let wordIndex = Math.floor(Math.random() * wordsArray.length)
    randomWord = wordsArray[wordIndex]
    console.log(randomWord)
}

// this will check whether the player's guess is the right answer
// it will check each letter and compare against randomWord
// for now it will need to stop any incorrect letter and console log "wrong answer"
function checkAnswer() {
    let randomWordArray = randomWord.split("") 
    wordGuess = prompt("Guess the word!");
    let wordGuessArray = wordGuess.split("")
    for (let i = 0; i < randomWordArray.length; i++) {
        if (randomWordArray[i] !== wordGuessArray[i]) {
            console.log(`The letter ${randomWordArray[i]} is incorrect.`)
        } else {
            console.log(`The letter ${randomWordArray[i]} is correct.`)
            continue
        }
        console.log("Continue Playing")
    }
}

// this function will initate the game and all funcitons needed to play
function startGame() {
    wordSelector()
    checkAnswer()
}

startGame()
