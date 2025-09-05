"use strict";

import { RubiksCube } from "./cube.js";

const rubiksCube = new RubiksCube();

document.addEventListener("keydown", (event) => {
  if (event.code === "Backspace") {
    rubiksCube.scramble();
  }

  let move = event.code.at(-1);
  if (rubiksCube.ROTATIONS_UPPER.indexOf(move) !== -1) {
    move = move.toLocaleLowerCase();
  }
  if (event.shiftKey) {
    move += "'";
  }
  console.log(move);
  if (event.code.slice(0, -1) === "Key" && rubiksCube.isTurn(move)) {
    rubiksCube.turn(move);
  }
  if (event.code.slice(0, -1) === "Key" && rubiksCube.isRotation(move)) {
    rubiksCube.rotate(move);
  }

  for (const element of document.getElementsByClassName("tile")) {
    const side = element.getAttribute("side");
    const x = element.getAttribute("x");
    const y = element.getAttribute("y");
    const color = rubiksCube.getColor(side, x, y);
    element.setAttribute("fill", color);
  }
});
