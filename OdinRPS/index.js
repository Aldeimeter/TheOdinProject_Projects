// Rock paper scissors
const OPTIONS = ["rock", "paper", "scissors"];
function getComputerChoice() {
  return OPTIONS[Math.floor(Math.random() * 3)];
}

function getHumanChoice() {
  const input = prompt("Enter rock, paper or scissors")?.toLowerCase();
  return OPTIONS.includes(input) ? input : getHumanChoice();
}

let computerScore = 0;
let humanScore = 0;

function playRound(computerChoice, humanChoice) {
  const handleWin = (message, winner) => {
    console.log(message);
    if (winner === "human") {
      humanScore++;
    } else {
      computerScore++;
    }
  };
  const combinations = {
    rockpaper: () => {
      handleWin("Human wins! Paper beats rock", "human");
    },
    rockscissors: () => {
      handleWin("Computer wins! Rock beats scissors", "computer");
    },
    scissorspaper: () => {
      handleWin("Computer wins! Scissors beats paper", "human");
    },
    paperrock: () => {
      handleWin("Computer wins! Paper beats rock", "computer");
    },
    scissorsrock: () => {
      handleWin("Human wins! Rock beats scissors", "human");
    },
    paperscissors: () => {
      handleWin("Computer wins! Scissors beats paper", "computer");
    },
  };

  if (computerChoice === humanChoice) {
    console.log("It's a tie!");
  } else {
    combinations[computerChoice + humanChoice.toLowerCase()]();
  }
}

function playGame() {
  for (let i = 0; i < 5; i++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();

    playRound(humanSelection, computerSelection);
  }
  if (humanScore === computerScore) {
    console.log("It's a tie! Nobody wins");
  } else if (humanScore > computerScore) {
    console.log("Human wins!");
  } else {
    console.log("Computer wins!");
  }
}
playGame();
