"use strict";

import { RubiksCube } from "./cube.js";

const rubiksCube = new RubiksCube();
const [T0, T60, T120, T180, T240, T300] = [0, 60, 120, 180, 240, 300];
const degreeCompute = [
  [[-180, -120], T300],
  [[-120, -60], T0],
  [[-60, 0], T60],
  [[0, 60], T120],
  [[60, 120], T180],
  [[120, 180], T240],
];
let startCoord = { x: 0, y: 0 };

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
  if (event.code.slice(0, -1) === "Key" && rubiksCube.isTurn(move)) {
    rubiksCube.turn(move);
  }
  if (event.code.slice(0, -1) === "Key" && rubiksCube.isRotation(move)) {
    rubiksCube.rotate(move);
  }

  updateStickers();
});

document.addEventListener("mousedown", (event) => {
  startCoord = { x: event.x, y: event.y };
});

document.addEventListener("mouseup", (event) => {
  const endCoord = { x: event.x, y: event.y };
  const angle =
    (Math.atan2(endCoord.y - startCoord.y, endCoord.x - startCoord.x) * 180) /
    Math.PI;

  console.log(angle);
});

function updateStickers() {
  for (const element of document.getElementsByClassName("tile")) {
    const side = element.getAttribute("side");
    const x = element.getAttribute("x");
    const y = element.getAttribute("y");
    const color = rubiksCube.getColor(side, x, y);
    element.setAttribute("fill", color);
  }
}

function getCubeAngle(angle) {
  for (const [[a1, a2], res] of degreeCompute) {
    if (a1 <= angle && angle <= a2) {
      return res;
    }
  }
}
