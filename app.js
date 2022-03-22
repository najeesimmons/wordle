
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
function checkAnswer() {
    let randomWordArray = randomWord.split("") 
    wordGuess = prompt("Guess the word!");
    let wordGuessArray = wordGuess.split("")
    for (let i = 0; i < randomWordArray.length; i++) {
        if (randomWordArray[i] !== wordGuessArray[i]) {
            console.log(`The letter ${wordGuessArray[i]} is incorrect.`)
            // need to loop thru other letters in wordGuessArray to see if they are in randomWordArray
            for (let j = 0; j < wordGuessArray.length; j++) {
                if (wordGuessArray[i] === randomWordArray[j]) {
                    console.log(`The letter "${wordGuessArray[i]}" is in this word, but this is not its place.`)
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
