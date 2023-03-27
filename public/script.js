const SERVER_URL = 'http://localhost:3000';

const choices = ["rock", "paper", "scissors"];
const emojiOfChoices = {"rock": "👊", "paper": "🖐️", "scissors": "✌️"};
const probabilitiesOfChoices = {"rock": 0.2, "paper": 0.3, "scissors": 0.5};

let playerScore = 0;
let computerScore = 0;

let answers = [];

function computerPlay() {
  const random = Math.random();
  let range = 0;

  for(choice of choices) {
    if(random >= range && random < range + probabilitiesOfChoices[choice]) return choice;
    range += probabilitiesOfChoices[choice];
  }

  console.log("Something went wrong in computerPlay()!");
  return "scissors";
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "It's a tie!";
      } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
      ) {
        playerScore++;
        document.getElementById("player-score").textContent = playerScore;
        return `You win! ${emojiOfChoices[playerSelection]} beats ${emojiOfChoices[computerSelection]}.`;
      } else {
        computerScore++;
        document.getElementById("computer-score").textContent = computerScore;
        return `Computer wins! ${emojiOfChoices[computerSelection]} beats ${emojiOfChoices[playerSelection]}.`;
      }         
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerSelection = button.id;
    const computerSelection = computerPlay();
    const result = playRound(playerSelection, computerSelection);

    document.getElementById("computer-choice").textContent =
    emojiOfChoices[playerSelection] + " x " + emojiOfChoices[computerSelection];
    document.getElementById("result").textContent = result;

    answers.push([choices.indexOf(playerSelection), choices.indexOf(computerSelection)]);
    if(answers.length === 50) {
      if(playerScore > computerScore) {
        document.getElementById("result").textContent = "Game over! You won the game!";
      } else if(playerScore < computerScore) {
        document.getElementById("result").textContent = "Game over! Computer won the game!";
      } else {
        document.getElementById("result").textContent = "Game over! It's a tie!";
      }

      buttons.forEach((button) => {
        button.disabled = true;
        button.style.backgroundColor = "grey";
        button.style.opacity = "0.5";
        button.style.cursor = "not-allowed";
      });

      fetch(SERVER_URL + '/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers)
      }).then(response => {
        console.log('Answers sent to the backend:', response);
      }).catch(error => {
        console.error('Error sending answers to the backend:', error);
      });
    }
  });
});
