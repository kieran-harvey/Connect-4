const playerRed = "R";
const playerYellow = "Y";
let currentPlayer = playerRed;

let gameOver = false;
let board = [];
let curCols = [5, 5, 5, 5, 5, 5, 5];

let rows = 6;
let columns = 7;

window.onload = function () {
  setGame();
};

function setGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(" ");
      let tile = document.createElement("div");
      tile.id = `${r.toString()}-${c.toString()}`;
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }
  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  let ogR = r;
  r = curCols[c];
  if (r < 0) {
    return;
  }
  board[r][c] = currentPlayer;
  let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
  if (currentPlayer === playerRed) {
    let height = curCols[c];
    let numFall = height - ogR;
    animation(ogR, c);
    var elems = document.querySelectorAll(".red-piece-animation");
    [].forEach.call(elems, (el) => {
      el.classList.remove("red-piece-animation");
    });
    setTimeout(() => {
      tile.classList.add("red-piece");
      currentPlayer = playerYellow;
    }, numFall * 500);
  } else {
    let height = curCols[c];
    let numFall = height - ogR;
    animation(ogR, c);
    var elems = document.querySelectorAll(".yellow-piece-animation");
    [].forEach.call(elems, (el) => {
      el.classList.remove("yellow-piece-animation");
    });
    setTimeout(() => {
      tile.classList.add("yellow-piece");
      currentPlayer = playerRed;
    }, numFall * 500);
  }
  r -= 1;
  curCols[c] = r;

  checkWinner();
}

function animation(ogR, ogC) {
  let height = curCols[ogC];
  let numFall = height - ogR;
  let arr = [];
  for (ogR; ogR < numFall; ogR++) {
    arr.push(ogR);
  }
  arr.forEach((item, index) => {
    let tile = document.getElementById(`${item.toString()}-${ogC.toString()}`);
    setTimeout(() => {
      if (currentPlayer === playerRed) {
        tile.classList.add("red-piece-animation");
      } else {
        tile.classList.add("yellow-piece-animation");
      }
    }, 500 * index);
  });

  // for (ogR; ogR < numFall; ogR++) {
  //   let tile = document.getElementById(`${ogR.toString()}-${ogC.toString()}`);
  //   tile.classList.add("red-piece");
  //   setTimeout(() => {
  //     tile.classList.remove("red-piece");
  //   }, 100 * ogR);
  // }
}

function checkWinner() {
  //horizontal win
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] !== " ") {
        if (
          board[r][c] === board[r][c + 1] &&
          board[r][c + 1] === board[r][c + 2] &&
          board[r][c + 2] === board[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  //vertical win
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] !== " ") {
        if (
          board[r][c] === board[r + 1][c] &&
          board[r + 1][c] === board[r + 2][c] &&
          board[r + 2][c] === board[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  //anti-diagonal

  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] !== " ") {
        if (
          board[r][c] === board[r + 1][c + 1] &&
          board[r + 1][c + 1] === board[r + 2][c + 2] &&
          board[r + 2][c + 2] === board[r + 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  //diagonally

  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] !== " ") {
        if (
          board[r][c] === board[r - 1][c + 1] &&
          board[r - 1][c + 1] == board[r - 2][c + 2] &&
          board[r - 2][c + 2] === board[r - 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}
function setWinner(r, c) {
  let winner = document.getElementById("winner");
  if (board[r][c] === playerRed) {
    winner.innerText = "Red Wins";
  } else {
    winner.innerText = "Yellow Wins";
  }
  gameOver = true;
}
