let balls = { x: 200, y: 250, radius: 7, dx: 3, dy: -3 };
let paddle = { x: 160, y: 350, width: 100, height: 30 };
let lockedBlock = { x: 130, y: 180, width: 140, height: 20 };
let lockedBlock2 = { x: 0, y: 180, width: 180, height: 20 };
let listLockedBlocks = [
  { x: 40, y: 180, width: 80, height: 20 },
  { x: 160, y: 180, width: 80, height: 20 },
  { x: 280, y: 180, width: 80, height: 20 },
];
let doors = [
  { x: 0, y: 180, width: 40, height: 20, hp: 8 },
  { x: 120, y: 180, width: 40, height: 20, hp: 8 },
  { x: 240, y: 180, width: 40, height: 20, hp: 8 },
  { x: 360, y: 180, width: 40, height: 20, hp: 8 },
];
let blocks = [];
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 8; j++) {
    blocks.push({
      x: 15 + j * 55,
      y: 15 + i * 25,
      width: 50,
      height: 20,
      hp: 1,
    });
  }
}
export {
  balls,
  paddle,
  lockedBlock,
  listLockedBlocks,
  doors,
  blocks,
  lockedBlock2,
};
