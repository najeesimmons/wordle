
// this array contains words to be used as answers
let wordsArray = ["movie", "eagle", "scare", "renew", "prime", "slime"]
let randomWord 

// this function randomly picks a word from wordsArray to be the answer
function wordSelector() {
    let wordIndex = Math.floor(Math.random() * wordsArray.length)
    randomWord = wordsArray[wordIndex]
    console.log(randomWord)
}

// this function will check whether the player's guess is the right answer
// it will need to check the letters of the word one by one and compare against randomWord
// for now it will need to stop any incorrect letter and console log "wrong answer"
function checkAnswer() {
    let randomWordArray = randomWord.split("") 
    console.log(randomWordArray)
}

// this function will initate the game and all funcitons needed to play
function startGame() {
    wordSelector()
    checkAnswer()
}

startGame()
