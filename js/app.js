"use strict";
//Buttons
const startGameBtn = document.querySelector("#startGame");
const addWordBtn = document.querySelector("#addWord");
const saveWordBtn = document.querySelector("#saveWord");
const cancelWordBtn = document.querySelector("#cancelWord");
const newGameBtn = document.querySelector("#newGame");
const endGameBtn = document.querySelector("#endGame");

//Containers
const startContainer = document.querySelector(".start-game-container");
const addWordsContainer = document.querySelector(".add-words-container");
const gameContainer = document.querySelector(".game-container");
const gameResults = document.querySelector(".game-guess-results");
const gameWrongResults = document.querySelector(".game-wrong-results");
const inputWord = document.querySelector("#inputWord");
const wrongList = document.querySelector(".wrong-words-list");

let boardContainer = document.getElementById("boardHangman");
const board = boardContainer.getContext("2d");

//Global
let wordsArr = makeWordsArr(
  "lunes",
  "martes",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
  "perro",
  "gato",
  "tigre",
  "elefante",
  "jirafa",
  "araña",
  "python",
  "angular",
  "html",
  "twitter",
  "facebook",
  "telegram",
  "whatsapp",
  "google",
  "facebook"
);

let winObj = window;

//Array con las posiciones de las letras
let arrKeys = [];

let keysDictionary = [];

//Contador
let count = 0;

//Errores
let mistakes = 0;

function addWord() {
  //Cambiar vista
  startContainer.classList.add("hide");
  addWordsContainer.classList.remove("hide");

  inputWord.focus();
}

function addWordToArray() {
  let textInput = inputWord.value;

  if (validator(textInput) && textInput != " " && textInput.length >= 3) {
    wordsArr.push(textInput.toUpperCase());

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Palabra agregada con éxito",
      showConfirmButton: false,
      timer: 1500,
    });

    startGame();
  } else {
    inputWord.focus();

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Verifica el texto ingresado",
    });
  }
}

function checkIfWordCompleted(arr) {
  const wordLength = arr.length;
  let count = 0;

  for (let i = 0; i < wordLength; i++) {
    let currentWord = arr[i];
    if (currentWord.textContent.length === 1) {
      count++;
    }
  }

  if (count == wordLength) {
    return true;
  } else {
    return false;
  }
}

function checkNumTimesKeyPressed(arr, key, counter) {
  arr.forEach((element) => {
    if (element === key) {
      counter += 1;
    }
  });

  return counter;
}

function checkKeyIsRepeated(arr, key, counter) {
  if (checkNumTimesKeyPressed(arr, key, counter) > 1) {
    return true;
  } else {
    return false;
  }
}

function checkIfWordMatches(word, key) {
  let wordLength = word.length;
  let arrWordsPosition = [];

  for (let index = 0; index < wordLength; index++) {
    let currentLetter = word[index];

    if (currentLetter == key) {
      arrWordsPosition.push(index);
    }
  }
  return arrWordsPosition;
}

function showWords(indexArray, word, elements) {
  for (let i = 0; i < indexArray.length; i++) {
    let position = indexArray[i];
    let letterBox = elements[position];
    letterBox.innerText = word;
  }
}

function showMistakes(word) {
  drawListElement(word);
}

function captureKeyboardEvent(event, word) {}

function endGame() {}

function startGame() {
  //Cambiar vista
  startContainer.classList.add("hide");
  gameContainer.classList.remove("hide");
  addWordsContainer.classList.add("hide");

  //Controlador de eventos
  const controller = new AbortController();

  //Palabra aleatoria del array de palabras
  let randomWord = makeRandomWord(wordsArr);

  //Tamaño de la palabra elegida
  let wordLength = randomWord.length;

  //Crear los elementos que conforman la palabra
  buildGuessResultsBoxes(wordLength, randomWord);

  //Crear linea del juego
  drawHangManCanvas(board, line, 50, 500, 550, 500);

  //Evento con el teclado
  winObj.addEventListener(
    "keydown",
    function (e) {
      //Capturar la tecla presionada
      let currentKey = e.key.toUpperCase();

      //Si la tecla presionada está permitida, continuar ejecución...
      if (
        validator(currentKey) &&
        currentKey.length == 1 &&
        currentKey != " "
      ) {
        //Seleccionar todos los elementos letter-box
        const letterBoxes = document.querySelectorAll(".line-text");

        //Guardar array con los índices de las coincidencias
        const matches = checkIfWordMatches(randomWord, currentKey);

        //Validar si hay coincidencias, en ese caso, mostrar letras
        if (matches.length > 0) {
          showWords(matches, currentKey, letterBoxes);
          play("https://cdn.pixabay.com/audio/2022/01/18/audio_a29a673ef4.mp3");
        } else {
          showMistakes(currentKey);
          play("https://cdn.pixabay.com/audio/2022/03/22/audio_e350ea2393.mp3");

          mistakes++;

          switch (mistakes) {
            case 1:
              drawHangManCanvas(board, line, 100, 500, 100, 50);
              break;
            case 2:
              drawHangManCanvas(board, line, 100, 50, 400, 50);
              break;
            case 3:
              drawHangManCanvas(board, line, 400, 50, 400, 100);
              break;
            case 4:
              drawHangManCanvas(board, circle, 400, 146);
              break;
            case 5:
              drawHangManCanvas(board, line, 400, 192, 350, 250);
              break;
            case 6:
              drawHangManCanvas(board, line, 400, 192, 450, 250);
              break;
            case 7:
              drawHangManCanvas(board, line, 400, 192, 400, 350);
              break;
            case 8:
              drawHangManCanvas(board, line, 400, 350, 350, 400);
              break;
            case 9:
              drawHangManCanvas(board, line, 400, 350, 450, 400);
            default:
              break;
          }
        }

        //Verificar que ya se terminó de adivinar la palabra
        if (checkIfWordCompleted(letterBoxes)) {
          console.log("¡Felicidades, ganaste!");
          Swal.fire({
            title: "¡Felicidades!",
            text: "🎉Ganaste🎉",
            imageUrl: "https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif",
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: "Custom image",
          });
          controller.abort();
          play("https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3");
        }

        //Si se acabaron las oportunidades, el juego termina.
        if (mistakes == 9) {
          Swal.fire({
            title: "Perdiste",
            text: "🎭Vuelve a intentarlo🎭",
            imageUrl:
              "https://media.giphy.com/media/lMyEespPQdFoWuK4oP/giphy-downsized-large.gif",
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: "Custom image",
          });
          controller.abort();
          play("https://cdn.pixabay.com/audio/2021/08/04/audio_c6ccf3232f.mp3");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Intenta con otra tecla",
        });
      }
    },
    { signal: controller.signal }
  );
}

function restartGame() {
  //Seleccionar todos los elementos letter-box
  const letterBoxes = document.querySelectorAll(".letter-box");

  //Seleciconar todas las letras erroneas
  const errorWords = document.querySelectorAll(".li-error");

  //Eliminar las líneas
  letterBoxes.forEach((element) => {
    gameResults.removeChild(element);
  });

  //Eliminar las palabras erróneas
  errorWords.forEach((element) => {
    wrongList.removeChild(element);
  });

  //Limpiar pizarra
  board.clearRect(0, 0, 600, 600);

  //Limpiar teclas presionadas
  arrKeys = [];

  //Resetear errores
  mistakes = 0;

  //Reiniciar juego
  startGame();
}

function endGame() {
  location.reload();
}

function cancelAddWord() {
  //Cambiar vista
  startContainer.classList.remove("hide");
  addWordsContainer.classList.add("hide");
}

addWordBtn.onclick = addWord;
startGameBtn.onclick = startGame;
newGameBtn.onclick = restartGame;
endGameBtn.onclick = endGame;
saveWordBtn.onclick = addWordToArray;
cancelWordBtn.onclick = cancelAddWord;
