"use strict";

export class RubiksCube {
  SIDES = 6;
  SIZE = 3;
  COUNT_MOD = 4;
  COLORS = ["white", "green", "red", "yellow", "blue", "orange"];
  SCRAMBLE_TURNS = "UDFBRL";
  ROTATIONS_UPPER = "XYZ";
  ROTATIONS = {
    x: ["R", "M'", "L'"],
    y: ["U", "E'", "D'"],
    z: ["F", "S", "B'"],
  };
  TURNS = {
    U: [
      [
        [0, 0, 0],
        [0, 0, 2],
        [0, 2, 2],
        [0, 2, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 2],
        [0, 2, 1],
        [0, 1, 0],
      ],
      [
        [1, 0, 0],
        [5, 0, 2],
        [4, 0, 2],
        [2, 0, 0],
      ],
      [
        [1, 0, 1],
        [5, 0, 1],
        [4, 0, 1],
        [2, 0, 1],
      ],
      [
        [1, 0, 2],
        [5, 0, 0],
        [4, 0, 0],
        [2, 0, 2],
      ],
    ],
    E: [
      [
        [1, 1, 0],
        [2, 1, 0],
        [4, 1, 2],
        [5, 1, 2],
      ],
      [
        [1, 1, 1],
        [2, 1, 1],
        [4, 1, 1],
        [5, 1, 1],
      ],
      [
        [1, 1, 2],
        [2, 1, 2],
        [4, 1, 0],
        [5, 1, 0],
      ],
    ],
    D: [
      [
        [3, 0, 0],
        [3, 2, 0],
        [3, 2, 2],
        [3, 0, 2],
      ],
      [
        [3, 0, 1],
        [3, 1, 0],
        [3, 2, 1],
        [3, 1, 2],
      ],
      [
        [1, 2, 0],
        [2, 2, 0],
        [4, 2, 2],
        [5, 2, 2],
      ],
      [
        [1, 2, 1],
        [2, 2, 1],
        [4, 2, 1],
        [5, 2, 1],
      ],
      [
        [1, 2, 2],
        [2, 2, 2],
        [4, 2, 0],
        [5, 2, 0],
      ],
    ],
    F: [
      [
        [1, 0, 0],
        [1, 0, 2],
        [1, 2, 2],
        [1, 2, 0],
      ],
      [
        [1, 0, 1],
        [1, 1, 2],
        [1, 2, 1],
        [1, 1, 0],
      ],
      [
        [0, 2, 0],
        [2, 0, 0],
        [3, 2, 2],
        [5, 2, 0],
      ],
      [
        [0, 2, 1],
        [2, 1, 0],
        [3, 2, 1],
        [5, 1, 0],
      ],
      [
        [0, 2, 2],
        [2, 2, 0],
        [3, 2, 0],
        [5, 0, 0],
      ],
    ],
    S: [
      [
        [0, 1, 0],
        [2, 0, 1],
        [3, 1, 2],
        [5, 2, 1],
      ],
      [
        [0, 1, 1],
        [2, 1, 1],
        [3, 1, 1],
        [5, 1, 1],
      ],
      [
        [0, 1, 2],
        [2, 2, 1],
        [3, 1, 0],
        [5, 0, 1],
      ],
    ],
    B: [
      [
        [4, 0, 0],
        [4, 2, 0],
        [4, 2, 2],
        [4, 0, 2],
      ],
      [
        [4, 0, 1],
        [4, 1, 0],
        [4, 2, 1],
        [4, 1, 2],
      ],
      [
        [0, 0, 0],
        [5, 2, 2],
        [3, 0, 2],
        [2, 0, 2],
      ],
      [
        [0, 0, 1],
        [5, 1, 2],
        [3, 0, 1],
        [2, 1, 2],
      ],
      [
        [0, 0, 2],
        [5, 0, 2],
        [3, 0, 0],
        [2, 2, 2],
      ],
    ],
    R: [
      [
        [2, 0, 0],
        [2, 0, 2],
        [2, 2, 2],
        [2, 2, 0],
      ],
      [
        [2, 0, 1],
        [2, 1, 2],
        [2, 2, 1],
        [2, 1, 0],
      ],
      [
        [0, 0, 2],
        [4, 2, 2],
        [3, 2, 2],
        [1, 0, 2],
      ],
      [
        [0, 1, 2],
        [4, 1, 2],
        [3, 1, 2],
        [1, 1, 2],
      ],
      [
        [0, 2, 2],
        [4, 0, 2],
        [3, 0, 2],
        [1, 2, 2],
      ],
    ],
    M: [
      [
        [0, 0, 1],
        [1, 0, 1],
        [3, 2, 1],
        [4, 2, 1],
      ],
      [
        [0, 1, 1],
        [1, 1, 1],
        [3, 1, 1],
        [4, 1, 1],
      ],
      [
        [0, 2, 1],
        [1, 2, 1],
        [3, 0, 1],
        [4, 0, 1],
      ],
    ],
    L: [
      [
        [5, 0, 0],
        [5, 2, 0],
        [5, 2, 2],
        [5, 0, 2],
      ],
      [
        [5, 0, 1],
        [5, 1, 0],
        [5, 2, 1],
        [5, 1, 2],
      ],
      [
        [0, 0, 0],
        [1, 0, 0],
        [3, 2, 0],
        [4, 2, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [3, 1, 0],
        [4, 1, 0],
      ],
      [
        [0, 2, 0],
        [1, 2, 0],
        [3, 0, 0],
        [4, 0, 0],
      ],
    ],
  };

  constructor() {
    this.cube = [];
    this.solve();
  }

  solve() {
    this.cube.length = 0;
    for (let t = 0; t < this.COLORS.length; t++) {
      this.cube.push([]);
      for (let i = 0; i < this.SIZE; i++) {
        this.cube[t].push([]);
        for (let j = 0; j < this.SIZE; j++) {
          this.cube[t][i].push(this.COLORS[t]);
        }
      }
    }
  }

  scramble() {
    for (let i = 0; i < this.SIZE ** 3; i++) {
      let count = Math.floor(Math.random() * 3) + 1;
      let moves = this.SCRAMBLE_TURNS;
      let side = moves[Math.floor(Math.random() * moves.length)];
      this.turn(side + String(count));
    }
  }

  move(move) {
    if (this.isTurn(move)) {
      this.turn(move);
    } else if (this.isRotation(move)) {
      this.rotate(move);
    }
  }

  turn(move) {
    const count = this.getCount(move);
    const indexes = this.TURNS[move.at(0)];
    for (let k = 0; k < count; k++) {
      for (const [
        [t1, i1, j1],
        [t2, i2, j2],
        [t3, i3, j3],
        [t4, i4, j4],
      ] of indexes) {
        [
          this.cube[t1][i1][j1],
          this.cube[t2][i2][j2],
          this.cube[t3][i3][j3],
          this.cube[t4][i4][j4],
        ] = [
          this.cube[t4][i4][j4],
          this.cube[t1][i1][j1],
          this.cube[t2][i2][j2],
          this.cube[t3][i3][j3],
        ];
      }
    }
  }

  rotate(move) {
    const count = this.getCount(move);
    const turns = this.ROTATIONS[move.at(0)];
    for (let k = 0; k < count; k++) {
      for (const turn of turns) {
        this.turn(turn);
      }
    }
  }

  getCount(move) {
    let count = Number.parseInt(move.slice(1));
    if (!Number.isInteger(count)) {
      count = 1;
    }
    count %= this.COUNT_MOD;
    if (move.at(-1) === "'") {
      count = this.COUNT_MOD - count;
    }
    return count;
  }

  getColor(side, x, y) {
    return this.cube[side][y][x];
  }

  isTurn(move) {
    return (
      move !== undefined &&
      typeof move === "string" &&
      move.length &&
      Object.keys(this.TURNS).includes(move.at(0))
    );
  }

  isRotation(move) {
    return (
      move !== undefined &&
      typeof move === "string" &&
      move.length &&
      Object.keys(this.ROTATIONS).includes(move.at(0))
    );
  }
}
