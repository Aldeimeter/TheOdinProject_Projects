// Rock paper scissors
const OPTIONS = ["rock", "paper", "scissors"];

const resultEl = document.querySelector(".result");

document
  .querySelector(".container.buttons")
  .addEventListener("click", handleClick);
document.querySelector("#reset").addEventListener("click", resetGame);
const buttons = [...document.querySelector(".container.buttons").children];

let computerScore = 0;
let humanScore = 0;
updateScore();

function getComputerChoice() {
  return OPTIONS[Math.floor(Math.random() * 3)];
}

function getHumanChoice() {
  const input = prompt("Enter rock, paper or scissors")?.toLowerCase();
  return OPTIONS.includes(input) ? input : getHumanChoice();
}

function playRound(computerChoice, humanChoice) {
  const handleWin = (message, winner) => {
    resultEl.textContent = message;
    if (winner === "human") {
      humanScore++;
    } else {
      computerScore++;
    }
    updateScore();
    if (humanScore === 5 || computerScore === 5) {
      if (humanScore === 5) {
        resultEl.textContent = "Game over! Human wins!";
      } else if (computerScore === 5) {
        resultEl.textContent = "Game over! Computer wins!";
      }
      humanScore = 0;
      computerScore = 0;
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
      handleWin("Computer wins! Scissors beats paper", "computer");
    },
    paperrock: () => {
      handleWin("Computer wins! Paper beats rock", "computer");
    },
    scissorsrock: () => {
      handleWin("Human wins! Rock beats scissors", "human");
    },
    paperscissors: () => {
      handleWin("Human wins! Scissors beats paper", "human");
    },
  };

  if (computerChoice === humanChoice) {
    resultEl.textContent = "It's a tie!";
  } else {
    combinations[computerChoice + humanChoice]();
  }
}

function handleClick(ev) {
  if (!OPTIONS.includes(ev.target.id)) return;
  document
    .querySelector(".container.buttons")
    .removeEventListener("click", handleClick);

  const humanChoice = ev.target.id;
  const computerChoice = getComputerChoice();
  highlightButtons(computerChoice, humanChoice);
  setTimeout(() => {
    playRound(computerChoice, humanChoice);

    document
      .querySelector(".container.buttons")
      .addEventListener("click", handleClick);
  }, 300);
}
function updateScore() {
  document.querySelector(".score#human").textContent = `${humanScore}`;
  document.querySelector(".score#computer").textContent = `${computerScore}`;
}

function resetGame() {
  humanScore = computerScore = 0;
  updateScore();
  highlightButtons();
  resultEl.textContent = "Click any button to start game";
}
function highlightButtons(computerChoice, humanChoice) {
  for (const button of buttons) {
    button.classList.remove("human-choice", "computer-choice", "tie");
    if ([computerChoice, humanChoice].includes(button.id)) {
      if (computerChoice === humanChoice) {
        button.classList.add("tie");
      } else if (computerChoice === button.id) {
        button.classList.add("computer-choice");
      } else {
        button.classList.add("human-choice");
      }
    }
  }
}
