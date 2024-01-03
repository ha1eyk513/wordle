정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;
const 시작_시간 = new Date();

function appStart() {
  function gameoverTrue() {
    window.removeEventListener("keydown", handleKeydown);
    clearInterval(timer);
    const gameoverDisplay = document.querySelector(".gameoverDisplay");
    gameoverDisplay.style.display = "flex";
  }
  function gameoverFalse() {
    window.removeEventListener("keydown", handleKeydown);
    clearInterval(timer);
    const gameoverDisplay = document.querySelector(".gameoverDisplay");
    gameoverDisplay.style.display = "flex";
    gameoverDisplay.style.background = "red";
  }
  function nextLine() {
    if (attempts === 5) return gameoverFalse();
    index = 0;
    attempts++;
  }

  function handleBackspace() {
    if (index > 0) {
      const preblock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preblock.innerText = "";
      preblock.style.borderColor = "#d3d6da";
    }
    if (index !== 0) {
      index--;
    }
  }
  function handleEnterkey() {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수++;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
      }
      block.style.color = "white";

      const keyblock = document.querySelector(
        `.keyboard-column[data-index='${입력한_글자}']`
      );
      if (입력한_글자 === 정답_글자) {
        keyblock.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) {
        keyblock.style.background = "#C9B458";
      } else {
        keyblock.style.background = "#787C7E";
      }
      keyblock.style.color = "white";
    }

    if (맞은_갯수 === 5) {
      gameoverTrue();
    } else {
      nextLine();
    }
  }
  function handleKeydown(event) {
    const key = event.key;
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") {
      handleBackspace();
    } else if (index === 5) {
      if (event.key === "Enter") {
        handleEnterkey();
      } else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key.toUpperCase();
      index++;
    }
  }
  function handleMouse(event) {
    const clickedColumn = event.currentTarget;
    const dataIndexValue = clickedColumn.dataset.index;

    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (index < 5) {
      thisBlock.innerText = dataIndexValue;
      index++;
    }
  }
  const enterKey = document.querySelector(".keyboard-ENTER");
  enterKey.addEventListener("click", function () {
    if (index === 5) {
      handleEnterkey();
    }
  });

  const backspaceKey = document.querySelector(".keyboard-BACK");
  backspaceKey.addEventListener("click", function () {
    handleBackspace();
  });
  function startTimer() {
    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector(".time");
      timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  }
  startTimer();
  window.addEventListener("keydown", handleKeydown);
  const keyboardColumns = document.querySelectorAll(".keyboard-column");
  keyboardColumns.forEach((keyboardColumn) => {
    keyboardColumn.addEventListener("click", handleMouse);
  });
}

appStart();
