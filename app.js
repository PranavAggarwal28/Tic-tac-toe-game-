const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset");
const newBtn = document.querySelector(".newGame");
const msgCont = document.querySelector(".msgContainer");
const msg = document.querySelector(".msg");
const ScoreX = document.querySelector(".x");
const ScoreO = document.querySelector(".o");
const clearBtn = document.querySelector(".clearBtn");

let x = JSON.parse(localStorage.getItem("Xwins")) || 0;
let o = JSON.parse(localStorage.getItem("Owins")) || 0;
let playerO = true;

ScoreO.innerHTML = `Score O : ${o}`;
ScoreX.innerHTML = `Score X : ${x}`;
const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function reset() {
  playerO = true;
  enablebtn();
  msgCont.classList.add("hide");
}

const disablebtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enablebtn = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
  }
};

boxes.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (playerO) {
      btn.innerHTML = "O";
      btn.classList.add("o-color");
      playerO = false;
    } else {
      btn.innerHTML = "X";
      playerO = true;
      btn.classList.remove("o-color");
    }
    btn.disabled = true;
    checkWinner();
  });
});

const showWinner = (winner) => {
  msg.innerHTML = `Congratulations , winner is ${winner}`;
  msgCont.classList.remove("hide");
};

let Player1wins;

function score(player) {
  if (player === "O") {
    o++;
    localStorage.setItem("Owins", JSON.stringify(o));
  } else {
    x++;
    localStorage.setItem("Xwins", JSON.stringify(x));
  }

 ScoreO.innerHTML = `Score O : ${o}`;
  ScoreX.innerHTML = `Score X : ${x}`
}

function checkWinner() {
  for (let winner of winningPattern) {
    let pos1 = boxes[winner[0]].innerHTML;
    let pos2 = boxes[winner[1]].innerHTML;
    let pos3 = boxes[winner[2]].innerHTML;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log("winner", pos1);
        showWinner(pos1);
        disablebtn();
        score(pos1);
      }
    }
  }
}

resetBtn.addEventListener("click", () => {
  reset();
});

newBtn.addEventListener("click", () => {
  reset();
});

// localStorage.setItem("Owins",JSON.stringify(o));

const clearScores = () => {
  localStorage.removeItem("Owins");
  localStorage.removeItem("Xwins");
  x = 0;
  o = 0;
  ScoreO.innerHTML = `Score O : ${o}`;
  ScoreX.innerHTML = `Score X : ${x}`;
};

clearBtn.addEventListener("click",()=>{
  clearScores();
})