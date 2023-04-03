console.log("hello");

// Select HTML elements
const $gameboard = document.querySelector("#gameboard");
const $infoDisplay = document.querySelector("#info");
const $resetButton = document.querySelector("#reset");

// Initialize game variables
const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle";
let isGameOver = false;

// Set initial info message
$infoDisplay.textContent = "Circle goes first";

// Create game board
const createBoard = () => {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    $gameboard.append(cellElement);
  });
};

// Add go to a cell
const addGo = (e) => {
  // Create go element and add it to the clicked cell
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);

  // Update game variables
  go = go === "circle" ? "cross" : "circle";
  $infoDisplay.textContent = `It is now ${go}'s turn.`;
  e.target.removeEventListener("click", addGo);

  // Check if the game is over
  checkScore();
  checkTie();
};

// Check for a win
const checkScore = () => {
  const allSquare = document.querySelectorAll(".square");

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquare[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      $infoDisplay.textContent = "Circle Wins!";
      isGameOver = true;
      return;
    }
  });

  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquare[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      $infoDisplay.textContent = "Cross Wins!";
      isGameOver = true;
      return;
    }
  });
};

// Check for a tie
const checkTie = () => {
  const allSquare = document.querySelectorAll(".square");
  const isTie = Array.from(allSquare).every(
    (square) => square.firstChild !== null
  );

  if (isTie && !isGameOver) {
    $infoDisplay.textContent = "It's a tie! Reset the game to start over.";
  }
};

// Reset the game
const resetGame = () => {
  const allSquare = document.querySelectorAll(".square");
  allSquare.forEach((square) => {
    square.innerHTML = "";
    square.addEventListener("click", addGo);
  });
  go = "circle";
  isGameOver = false;
  $infoDisplay.textContent = "Circle goes first";
};

// Add event listeners
createBoard();
$resetButton.addEventListener("click", resetGame);
