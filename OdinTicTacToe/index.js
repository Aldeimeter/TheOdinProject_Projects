const Player = (name, mark, score) => ({
  name,
  mark,
  score,
  prompt: () => {
    return prompt("Enter coordinates x,y:")
      .split(",")
      .map((el) => Number(el) - 1);
  },
});
const gameboard = (function () {
  let board = [];
  function get() {
    return board;
  }
  function init() {
    board = [];
    for (let i = 0; i < 3; i++) {
      board.push([]);
      for (let j = 0; j < 3; j++) {
        board[i][j] = "";
      }
    }
  }
  function mark(x, y, mark) {
    if (board[y][x] !== "") return console.log("Square already occupied");
    board[y][x] = mark;
  }
  function getState() {
    const checkWin = (a, b, c) => a !== "" && a === b && b === c;
    // Check columns
    for (let i = 0; i < 3; i++) {
      const a = board[0][i];
      const b = board[1][i];
      const c = board[2][i];
      if (checkWin(a, b, c)) {
        return "win";
      }
    }
    // Check rows
    for (let i = 0; i < 3; i++) {
      const a = board[i][0];
      const b = board[i][1];
      const c = board[i][2];
      if (checkWin(a, b, c)) {
        return "win";
      }
    }
    // check left to right, top to bottom diagonal
    if (checkWin(board[0][0], board[1][1], board[2][2])) return "win";
    // check right to left, top to bottom diagonal
    if (checkWin(board[0][2], board[1][1], board[2][0])) return "win";

    if (board.flat().includes("")) return "continue";
    return "draw";
  }
  function isGameFinished() {
    return getState() !== "continue";
  }
  return {
    get,
    init,
    mark,
    getState,
    isGameFinished,
  };
})();

const gameDOM = (function () {
  const boardNodes = [...document.querySelectorAll(".game > span")];
  const infoNode = document.querySelector(".info");
  const scoreNode = document.querySelector("div.score");
  function renderBoard() {
    gameboard
      .get()
      .flat()
      .forEach((el, index) => (boardNodes[index].textContent = el));
  }
  function mark(node, mark) {
    gameboard.mark(
      node.getAttribute("data-x"),
      node.getAttribute("data-y"),
      mark,
    );
  }
  function clear() {
    boardNodes.forEach((el) => (el.textContent = ""));
  }
  function shake(node) {
    node.classList.add("shake");
    setTimeout(() => node.classList.remove("shake"), 1000);
  }
  function displayText(text, timeout) {
    infoNode.textContent = text;
    infoNode.style.opacity = 1;
    if (timeout) {
      setTimeout(() => {
        infoNode.style.opacity = 0;
      }, timeout);
    }
  }
  function displayScore(players) {
    [...scoreNode.querySelectorAll("span.name")].map(
      (el, index) => (el.textContent = players[index].name),
    );
    [...scoreNode.querySelectorAll("span.score")].map(
      (el, index) => (el.textContent = players[index].score),
    );
  }
  function toggleGameMenu() {
    const menuNode = document.querySelector("form");
    const gameNode = document.querySelector(".game-container");
    if (menuNode.classList.contains("hidden")) {
      menuNode.classList.remove("hidden");
    } else {
      menuNode.classList.add("hidden");
    }
    if (gameNode.classList.contains("hidden")) {
      gameNode.classList.remove("hidden");
    } else {
      gameNode.classList.add("hidden");
    }
  }
  return {
    renderBoard,
    mark,
    clear,
    shake,
    displayText,
    displayScore,
    toggleGameMenu,
  };
})();
const game = (function () {
  let players = null;
  function start() {
    gameboard.init();
    gameDOM.displayScore(players);
    gameDOM.toggleGameMenu();
  }
  function restart() {
    gameDOM.displayText("", 0);
    gameDOM.displayScore(players);
    gameDOM.clear();
    gameboard.init();
  }
  const getActualPlayerIndex = (function () {
    let actualPlayerIndex = 0;

    return function () {
      actualPlayerIndex = (actualPlayerIndex + 1) % 2;
      return actualPlayerIndex;
    };
  })();
  document.querySelector(".game").addEventListener("click", (ev) => {
    if (!players) {
      gameDOM.toggleGameMenu();
      return;
    }
    if (gameboard.isGameFinished()) {
      restart();
      return;
    }

    if (ev.target.tagName !== "SPAN") return;

    if (ev.target.textContent !== "") {
      gameDOM.shake(ev.target);
      gameDOM.displayText("This cell is occupied", 1000);
      return;
    }

    const actualPlayer = players[getActualPlayerIndex()];

    gameDOM.mark(ev.target, actualPlayer.mark);
    gameDOM.renderBoard();

    const actualState = gameboard.getState();

    if (actualState === "win") {
      gameDOM.displayText(`Congrats! ${actualPlayer.name} wins.`);
      players[players.indexOf(actualPlayer)].score++;
      gameDOM.displayScore(players);
    }

    if (actualState === "draw") {
      gameDOM.displayText("Nobody wins!");
    }
  });
  document.querySelector("form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const marks = ["X", "O"].sort(() => Math.random() - 0.5);
    const [player1Name, player2Name] = [
      ...ev.target.querySelectorAll("input"),
    ].map((el) => el.value);
    const player1 = Player(player1Name, marks[0], 0);
    const player2 = Player(player2Name, marks[1], 0);
    players = [player1, player2];
    start();
  });
  document.querySelector(".controls").addEventListener("click", (ev) => {
    if (ev.target.tagName !== "BUTTON") return;
    if (ev.target.id === "reset") {
      players = null;
      gameDOM.toggleGameMenu();
    } else if (ev.target.id === "restart") {
      restart();
    }
  });
  return {
    start,
    restart,
  };
})();
