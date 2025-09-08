"use strict";

import { RubiksCube } from "./cube.js";

const rubiksCube = new RubiksCube();
const [T0, T60, T120, T180, T240, T300] = [0, 60, 120, 180, 240, 300];
const DEGREE_COMPUTE = [
  [[-180, -120], T300],
  [[-120, -60], T0],
  [[-60, 0], T60],
  [[0, 60], T120],
  [[60, 120], T180],
  [[120, 180], T240],
];
const TURN_COMPUTE = [
  // up
  [
    [
      {
        [T120]: "B'",
        [T300]: "B",
        [T60]: "L'",
        [T240]: "L",
      },
      {
        [T120]: "B'",
        [T300]: "B",
        [T60]: "M'",
        [T240]: "M",
      },
      {
        [T120]: "B'",
        [T300]: "B",
        [T60]: "R",
        [T240]: "R'",
      },
    ],
    [
      {
        [T120]: "S",
        [T300]: "S'",
        [T60]: "L'",
        [T240]: "L",
      },
      {
        [T120]: "S",
        [T300]: "S'",
        [T60]: "M'",
        [T240]: "M",
      },
      {
        [T120]: "S",
        [T300]: "S'",
        [T60]: "R",
        [T240]: "R'",
      },
    ],
    [
      {
        [T120]: "F",
        [T300]: "F'",
        [T60]: "L'",
        [T240]: "L",
      },
      {
        [T120]: "F",
        [T300]: "F'",
        [T60]: "M'",
        [T240]: "M",
      },
      {
        [T120]: "F",
        [T300]: "F'",
        [T60]: "R",
        [T240]: "R'",
      },
    ],
  ],
  // front
  [
    [
      {
        [T0]: "L'",
        [T180]: "L",
        [T120]: "U'",
        [T300]: "U",
      },
      {
        [T0]: "M'",
        [T180]: "M",
        [T120]: "U'",
        [T300]: "U",
      },
      {
        [T0]: "R",
        [T180]: "R'",
        [T120]: "U'",
        [T300]: "U",
      },
    ],
    [
      {
        [T0]: "L'",
        [T180]: "L",
        [T120]: "E",
        [T300]: "E'",
      },
      {
        [T0]: "M'",
        [T180]: "M",
        [T120]: "E",
        [T300]: "E'",
      },
      {
        [T0]: "R",
        [T180]: "R'",
        [T120]: "E",
        [T300]: "E'",
      },
    ],
    [
      {
        [T0]: "L'",
        [T180]: "L",
        [T120]: "D",
        [T300]: "D'",
      },
      {
        [T0]: "M'",
        [T180]: "M",
        [T120]: "D",
        [T300]: "D'",
      },
      {
        [T0]: "R",
        [T180]: "R'",
        [T120]: "D",
        [T300]: "D'",
      },
    ],
  ],
  // right
  [
    [
      {
        [T0]: "F'",
        [T180]: "F",
        [T60]: "U",
        [T240]: "U'",
      },
      {
        [T0]: "S'",
        [T180]: "S",
        [T60]: "U",
        [T240]: "U'",
      },
      {
        [T0]: "B",
        [T180]: "B'",
        [T60]: "U",
        [T240]: "U'",
      },
    ],
    [
      {
        [T0]: "F'",
        [T180]: "F",
        [T60]: "E",
        [T240]: "E'",
      },
      {
        [T0]: "S'",
        [T180]: "S",
        [T60]: "E",
        [T240]: "E'",
      },
      {
        [T0]: "B",
        [T180]: "B'",
        [T60]: "E",
        [T240]: "E'",
      },
    ],
    [
      {
        [T0]: "F'",
        [T180]: "F",
        [T60]: "D",
        [T240]: "D'",
      },
      {
        [T0]: "S'",
        [T180]: "S",
        [T60]: "D",
        [T240]: "D'",
      },
      {
        [T0]: "B",
        [T180]: "B'",
        [T60]: "D",
        [T240]: "D'",
      },
    ],
  ],
];
let mouseData = {
  click: { x: undefined, y: undefined },
  sticker: { side: undefined, x: undefined, y: undefined },
};

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
  if (event.code.slice(0, -1) === "Key") {
    rubiksCube.move(move);
  }

  updateStickers();
});

document.addEventListener("mouseup", (event) => {
  const startCoord = mouseData.click;
  const endCoord = { x: event.x, y: event.y };
  const angle =
    (Math.atan2(endCoord.y - startCoord.y, endCoord.x - startCoord.x) * 180) /
    Math.PI;

  const { side, x, y } = mouseData.sticker;
  const cubeAngle = getCubeAngle(angle);

  const move = TURN_COMPUTE[side][y][x][cubeAngle];

  rubiksCube.move(move);
  updateStickers();

  mouseData = {
    click: { x: undefined, y: undefined },
    sticker: { side: undefined, x: undefined, y: undefined },
  };
});

for (const element of document.getElementsByClassName("tile")) {
  const side = element.getAttribute("side");
  const x = element.getAttribute("x");
  const y = element.getAttribute("y");
  element.addEventListener("mousedown", (event) => {
    mouseData = {
      click: { x: event.x, y: event.y },
      sticker: { side, x, y },
    };
  });
}

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
  for (const [[a1, a2], res] of DEGREE_COMPUTE) {
    if (a1 <= angle && angle <= a2) {
      return res;
    }
  }
}
