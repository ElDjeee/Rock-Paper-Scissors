const choices = ["rock", "paper", "scissors"];
const emojiOfChoices = {"rock": "👊", "paper": "🖐️", "scissors": "✌️"};
const probabilitiesOfChoices = {"rock": 0.2, "paper": 0.3, "scissors": 0.5}; //Sum of all probabilities should be 1

let playerScore = 0;
let computerScore = 0;

function computerPlay() {
  const random = Math.random();
  let range = 0;

  for(choice of choices) {
    if(random >= range && random < range + probabilitiesOfChoices[choice]) return choice;
    range += probabilitiesOfChoices[choice];
  }

  console.log("Something went wrong");
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
  });
});
