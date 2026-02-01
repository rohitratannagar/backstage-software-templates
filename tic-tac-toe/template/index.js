const setup = document.getElementById('setup');
const boardEl = document.querySelector('.board');
const startBtn = document.getElementById('start');
const errorText = document.getElementById('error');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const cells = document.querySelectorAll('.cell');

let PLAYER_ONE, PLAYER_TWO;
let currentPlayer;
let board = Array(9).fill("");
let gameActive = false;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

startBtn.addEventListener('click', () => {
  const s1 = document.getElementById('symbol1').value.trim();
  const s2 = document.getElementById('symbol2').value.trim();

  if (!s1 || !s2) {
    errorText.textContent = "Both players must choose a symbol.";
    return;
  }

  if (s1 === s2) {
    errorText.textContent = "Symbols must be different.";
    return;
  }

  PLAYER_ONE = { name: PLAYER_ONE_NAME, symbol: s1 };
  PLAYER_TWO = { name: PLAYER_TWO_NAME, symbol: s2 };
  currentPlayer = PLAYER_ONE;

  setup.style.display = 'none';
  boardEl.style.display = 'grid';
  restartBtn.style.display = 'inline-block';
  gameActive = true;

  statusText.textContent =
    `${currentPlayer.name}'s turn (${currentPlayer.symbol})`;
});

cells.forEach(cell =>
  cell.addEventListener('click', e => {
    if (!gameActive) return;

    const idx = e.target.dataset.index;
    if (board[idx]) return;

    board[idx] = currentPlayer.symbol;
    e.target.textContent = currentPlayer.symbol;

    checkResult();
  })
);

function checkResult() {
  const won = winningCombinations.some(([a,b,c]) =>
    board[a] &&
    board[a] === board[b] &&
    board[a] === board[c]
  );

  if (won) {
    statusText.textContent = `${currentPlayer.name} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw 🤝";
    gameActive = false;
    return;
  }

  currentPlayer =
    currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;

  statusText.textContent =
    `${currentPlayer.name}'s turn (${currentPlayer.symbol})`;
}

restartBtn.addEventListener('click', () => {
  board = Array(9).fill("");
  cells.forEach(c => c.textContent = "");
  currentPlayer = PLAYER_ONE;
  gameActive = true;
  statusText.textContent =
    `${currentPlayer.name}'s turn (${currentPlayer.symbol})`;
});
