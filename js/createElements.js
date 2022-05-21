"use strict";
function drawTextBox(letter) {
  //Div con la clase letter-box
  let box = document.createElement("div");
  box.classList.add("letter-box");

  if (letter != " ") {
    let textContent = drawLetter("");
    let lineContent = drawLine();

    box.appendChild(textContent);
    box.appendChild(lineContent);
  } else {
    let textContent = drawLetter(" ");
    box.appendChild(textContent);
  }

  return box;
}

function drawLine() {
  let line = document.createElement("span");
  line.classList.add("line");

  return line;
}

function drawLetter(letter) {
  let paragraph = document.createElement("p");
  paragraph.classList.add("line-text");

  paragraph.textContent = letter;

  return paragraph;
}

function drawListElement(content) {
  let listEl = document.createElement("li");
  listEl.classList.add("li-error");
  listEl.textContent = content;

  wrongList.appendChild(listEl);
}

function buildGuessResultsBoxes(value, word) {
  //Crear el total de cajas por cada letra de la palabra
  for (let i = 0; i < value; i++) {
    let newTextBox = drawTextBox(word[i]);
    gameResults.appendChild(newTextBox);
  }
}
