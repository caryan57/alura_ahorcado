function makeWordsArr(...words) {
  const list = words.map((word) => word.toUpperCase());
  return list;
}

function makeRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function makeRandomWord(arr) {
  const arrLenght = arr.length;
  const randNum = makeRandomNumber(arrLenght);
  return arr[randNum];
}

function makeArrayOfKeys(key, arr) {
  arr.push(key);
  return arr;
}

function line(board, x1, y1, x2, y2) {
  board.moveTo(x1, y1);
  board.lineTo(x2, y2);
  board.stroke();
}

function circle(board, x, y) {
  const radius = 45;
  const startAngle = 0;
  const endAngle = 2 * Math.PI;

  board.arc(x, y, radius, startAngle, endAngle);
  board.stroke();
}

function drawHangManCanvas(board, fn, x1, y1, x2 = 0, y2 = 0) {
  board.beginPath();
  board.lineWidth = 5;
  board.strokeStyle = "#0a3871";
  board.lineCap = "round";
  fn(board, x1, y1, x2, y2);
}

async function play(url) {
  const audio = await new Audio(url);
  audio.play();
}
