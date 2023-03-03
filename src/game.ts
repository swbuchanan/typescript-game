// Define a variable to hold the random number
let randomNumber: number;

// Define a variable to hold the number of guesses
let numberOfGuesses: number = 0;

// Generate a random number between 1 and 100
randomNumber = Math.floor(Math.random() * 100) + 1;

// Get a guess from the player
let guess: number = Number(prompt("Guess a number between 1 and 100"));

// Check the guess against the random number
while (numberOfGuesses < 10) {
  numberOfGuesses++;
  if (guess === randomNumber) {
    alert(`You guessed the number in ${numberOfGuesses} tries!`);
    break;
  } else if (guess < randomNumber) {
    guess = Number(prompt("Too low. Guess again."));
  } else {
    guess = Number(prompt("Too high. Guess again."));
  }
}

if (numberOfGuesses === 10) {
  alert(`You ran out of guesses. The number was ${randomNumber}.`);
}

