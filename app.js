
// this array contains words to be used as answers
const wordsArray = ["movie", "eagle", "scare", "renew", "prime", "slime"]
let randomWord 
let wordGuess
let testedLetter 

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
    console.log(wordGuess)
    let wordGuessArray = wordGuess.split("")
    for (let i = 0; i < randomWordArray.length; i++) {
        if (randomWordArray[i] !== wordGuessArray[i]) {
            // turn currently examined wrong letter from the randomWordArray into variable testedLetter
            testedLetter = wordGuessArray[i]
            console.log(testedLetter)
            console.log(wordGuessArray)
            console.log(`The letter ${testedLetter} is not found at this position. Now testing to see if it's in this word at all...`)
            // need to take testedLetter and loop through random word to see if it appears elsewhere
            for (let j = 0; j < randomWordArray.length; j++) {
                // I need to figure out how to skip index 
                if ([j] === [i]) {
                    console.log(`${testedLetter}`)
                    continue;
                }
                
                
                ////// I believe everything above this line is correct! I hope!
                if (testedLetter === randomWordArray[j]) {
                    console.log(`The letter "${testedLetter}" is in this word, but this is not its' correct place.`)
                } 
                if (testedLetter !== randomWordArray[j]) {
                    console.log(`The letter "${testedLetter}" does not belong in this position.`)
                }
            }
        } else {
            console.log(`"${testedLetter}" is the correct letter, in the correct place.`)
        }
    }
}

// this function will initate the game and all funcitons needed to play
function startGame() {
    wordSelector()
    checkAnswer()
}

startGame()
