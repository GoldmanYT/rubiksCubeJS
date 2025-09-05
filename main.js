"use strict";

import { RubiksCube } from "./cube.js";

const rubiksCube = new RubiksCube();

document.addEventListener("keydown", (event) => {
  const move = event.code.at(-1);
  if (event.code.slice(0, -1) === "Key" && Object.keys(rubiksCube.MOVES).indexOf(move) !== -1) {
    rubiksCube.rotate(move);
    console.log(rubiksCube.cube);
  }

  for (const element of document.getElementsByClassName("tile")) {
    const side = element.getAttribute("side");
    const x = element.getAttribute("x");
    const y = element.getAttribute("y");
    const color = rubiksCube.getColor(side, x, y);
    element.setAttribute("fill", color);
  }
});
