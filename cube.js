"use strict";

export class RubiksCube {
  SIDES = 6;
  SIZE = 3;
  COLORS = ["white", "green", "red", "yellow", "blue", "orange"];
  MOVES = {
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
      let moves = Object.keys(this.MOVES);
      let side = moves[Math.floor(Math.random() * moves.length)];
      this.rotate(side + String(count));
    }
  }

  rotate(move) {
    if (move === undefined || typeof move !== "string" || !move.length) {
      return;
    }
    let count = Number.parseInt(move.slice(1));
    if (!Number.isInteger(count)) {
      count = 1;
    }
    count %= this.SIZE;
    if (move.at(-1) === "'") {
      count = this.SIZE - count;
    }
    const indexes = this.MOVES[move.at(0)];
    [
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    ];
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

  getColor(side, x, y) {
    return this.cube[side][y][x];
  }
}
