// this array contains words to be used as answers
const wordsArray = ["movie", "eagle", "scare", "renew", "prime", "slime"]
let randomWord = null
let wordGuess = null
let counter = 0
let guessCounter = 0

let rows = 6
let guesses = new Array(rows); // create an empty array of "rows"
for (let i = 0; i < rows; i++) {
    guesses[i] = new Array(0); // make each element an array
  }
  console.log(guesses); //  Output: [ [ <5 empty items> ], [ <5 empty items> ], [ <5 empty items> ], [ <5 empty items> ] ]

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
    //insertKey also needs to handle pushing entry into wordGuessArray
    if (e.key === "Enter" && counter % 5 === 0) {
        console.log("Next, we will run checkAnswer.")
        checkAnswer(guesses[guessCounter])
        guessCounter += 1
    }
    if (e.key === "Enter" && counter % 5 != 0) {
        console.log("A guess MUST consist of 5 letters -- no more, no less!")
    } 
    if (e.key === "Backspace") {
        console.log(counter)
        let currentBox = document.getElementById(`box${counter}`)
        currentBox.innerText=""
        guesses[guessCounter].pop()
        counter -=1
        console.log(counter)
        return   
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
            window.removeEventListener('keydown', insertKey) 
            return
        } else {
            guesses[guessCounter].push(`${e.key}`)
            console.log(`Your guess so far consists of "${guesses[guessCounter]}"`)
        }
        currentBox.innerText=`${e.key}`
        console.log(counter)
        
        // currentBox.dataset.guess = `${e.key}_${guessCounter}_${wordGuessArray.length - 1}` 
        }
    }

// this will check whether the player's guess is the right answer
// it will check each letter and compare against randomWord
function checkAnswer() {
    let randomWordArray = randomWord.split("") 
    console.log(guesses[guessCounter], randomWordArray, guessCounter)
    if (JSON.stringify(guesses[guessCounter]) === JSON.stringify(randomWordArray)) {
        if (counter === 5) {
            for (let i = 1; i < counter+1; i++) {
                let styleThisBox = document.getElementById(`box${i}`)
                styleThisBox.classList.add("right-guess")
            }
        }
        if (counter === 10) {
            for (let i = 6; i < counter+1; i++) {
                let styleThisBox = document.getElementById(`box${i}`)
                styleThisBox.classList.add("right-guess")
            }
        }
        if (counter === 15) {
            for (let i = 11; i < counter+1; i++) {
                let styleThisBox = document.getElementById(`box${i}`)
                styleThisBox.classList.add("right-guess")
            }
        }
        if (counter === 20) {
            for (let i = 16; i < counter+1; i++) {
                let styleThisBox = document.getElementById(`box${i}`)
                styleThisBox.classList.add("right-guess")
            }
        }
        if (counter === 25) {
            for (let i = 21; i < counter+1; i++) {
                let styleThisBox = document.getElementById(`box${i}`)
                styleThisBox.classList.add("right-guess")
            }
        }
        if (counter === 30) {
            for (let i = 26; i < counter+1; i++) {
                let styleThisBox = document.getElementById(`box${i}`)
                styleThisBox.classList.add("right-guess")
            }
        }
        alert("You guessed the correct word!")
        console.log("You win!")
        window.removeEventListener('keydown', insertKey) 
        return
    } else {
        let allBoxes = document.querySelectorAll('.box')
        let allBoxesForStyles = Array.from(allBoxes)
        console.log(allBoxesForStyles)
        const boxes = getBoxRow(allBoxesForStyles)
        console.log(boxes)
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
        console.log(`Your next guess now consists of "${guesses[guessCounter]}"`)
        }     
}

function getBoxRow (boxes) {
    if (guessCounter === 0) {
        return boxes.slice(0,5)
    }
    if (guessCounter === 1) {
        return boxes.slice(5,10)
    }
    if (guessCounter === 2) {
        return boxes.slice(10,15)
    }
    if (guessCounter === 3) {
        return boxes.slice(15,20)
    }
    if (guessCounter === 4) {
        return boxes.slice(20,25)
    }
    if (guessCounter === 5) {
        return boxes.slice(25)
    }
}







