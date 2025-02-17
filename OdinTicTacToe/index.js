const game = (function () {
  const player = (name, mark, score) => ({
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
    const board = [];
    function get() {
      return board;
    }
    function init() {
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
    return {
      get,
      init,
      mark,
      getState,
    };
  })();
  const players = [player("Artem", "X", 0), player("Alena", "O", 0)];
  gameboard.init();
  let actualPlayer = 0;
  while (gameboard.getState() === "continue") {
    const coords = players[actualPlayer].prompt();
    gameboard.mark(...coords, players[actualPlayer].mark);
    console.table(gameboard.get());
    actualPlayer = actualPlayer === 0 ? 1 : 0;
  }
  console.table(gameboard.get());
})();
