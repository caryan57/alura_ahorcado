"use strict";

function validator(input) {
  //Solo aceptar mayus, minus y ñ. No aceptar ningún otro carácter.
  let regex = /^[a-zA-Z\u00f1\s\u00f1\u00d1]+$/;
  let maxLenght = 8;

  if (regex.test(input) && input.length <= maxLenght) {
    return true;
  } else {
    return false;
  }
}
