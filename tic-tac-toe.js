document.addEventListener("DOMContentLoaded", function () {
  const DEFAULT_MESSAGE =
    "Move your mouse over a square and click to play an X or an O.";

  const WINNING_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];

  const squares = document.querySelectorAll("#board > div");
  const status = document.getElementById("status");
  const newGameBtn = document.querySelector(".btn");

  let gameState = new Array(9).fill(null);
  let currentPlayer = "X";
  let gameOver = false;

  // Exercise 1: style each square
  squares.forEach(function (square, index) {
    square.classList.add("square");

    // Exercise 2 + 6: place X/O on click, but never overwrite a filled square
    square.addEventListener("click", function () {
      if (gameOver || gameState[index] !== null) {
        return;
      }

      gameState[index] = currentPlayer;
      square.textContent = currentPlayer;
      square.classList.add(currentPlayer);

      // Exercise 4: check for a winner
      const winner = checkWinner();
      if (winner) {
        status.textContent = "Congratulations! " + winner + " is the Winner!";
        status.classList.add("you-won");
        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    });

    // Exercise 3: hover styling
    square.addEventListener("mouseover", function () {
      square.classList.add("hover");
    });

    square.addEventListener("mouseout", function () {
      square.classList.remove("hover");
    });
  });

  function checkWinner() {
    for (const [a, b, c] of WINNING_LINES) {
      if (
        gameState[a] !== null &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  }

  // Exercise 5: restart the game
  newGameBtn.addEventListener("click", function () {
    gameState = new Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;

    squares.forEach(function (square) {
      square.textContent = "";
      square.classList.remove("X", "O", "hover");
    });

    status.textContent = DEFAULT_MESSAGE;
    status.classList.remove("you-won");
  });
});
