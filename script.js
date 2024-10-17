let restbtn = document.querySelector(".rest-btn");
let allbox = document.querySelectorAll(".box");
let newgame = document.querySelector(".New-btn");
let msgContainer = document.querySelector(".hide");
let msg = document.querySelector(".msg");
let blockdisplay = document.querySelector(".block");

const winPrtrn = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let turn = true;
// Add click event to each box
allbox.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn == true) {
      box.innerHTML = "X";
      turn = false;
    } else {
      box.innerHTML = "O";
      turn = true;
    }
    box.disabled = true;
    checkwinner();
  });
});

// Enable all boxes and clear their content
const enablebox = () => {
  for (let box of allbox) {
    box.disabled = false;
    box.innerHTML = "";
  }
};

// Reset the game
const restgame = () => {
  turn = true;
  enablebox();
  msgContainer.style.display = "none";
};

// Disable all boxes
const disabledbox = () => {
  for (let box of allbox) {
    box.disabled = true;
  }
};

// Show the winne
const showWinner = (winner) => {
  msg.innerHTML = `Congratulations, Winner is ${winner}`;
  msgContainer.style.display = "block";
  disabledbox();
};

// Check for a winner
const checkwinner = () => {
  for (let pattern of winPrtrn) {
    let pos1val = allbox[pattern[0]].innerHTML;
    let pos2val = allbox[pattern[1]].innerHTML;
    let pos3val = allbox[pattern[2]].innerHTML;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val == pos2val && pos2val == pos3val) {
        showWinner(pos1val);
        blockdisplay.style.display = "none";
      }
    }
  }
  let drawMatch = true;

  // Show draw message
  const showDraw = () => {
    msg.innerHTML = "It's a draw!";
    blockdisplay.style.display = "none";
    disabledbox(); // Disable all boxes
  };

  // Check if all boxes are filled
  allbox.forEach((box) => {
    if (box.innerHTML === "") {
      drawMatch = false; // If any box is empty, it's not a draw
    }
  });
  // If all boxes are filled and no winner, it's a draw
  if (drawMatch) {
    showDraw();
  }
};

// Event listeners for
newgame.addEventListener("click", restgame);
restbtn.addEventListener("click", restgame);
newgame.addEventListener("click", () => {
  blockdisplay.style.display = "flex";
});
