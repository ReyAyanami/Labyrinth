const WALL = 0;
const PATH = 1;
const START = 2;
const END = 3;

const labyrinth = [
  [0, 2, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [1, 1, 1, 0, 1, 3],
  [1, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 0],
];

const startCoordinates = {y: 0, x: 1};

const pointer = {y: startCoordinates.y, x: startCoordinates.x};

const move = direction => {
  switch (direction) {
    case 'right':
      if (checkPath(pointer.y, pointer.x + 1)) {
        pointer.x++;
      }
      break;
    case 'left':
      if (checkPath(pointer.y, pointer.x - 1)) {
        pointer.x--;
      }
      break;
    case 'top':
      if (checkPath(pointer.y - 1, pointer.x)) {
        pointer.y--;
      }
      break;
    case 'bottom':
      if (checkPath(pointer.y + 1, pointer.x)) {
        pointer.y++;
      }
      break;
  }
};

const checkPath = (y, x) => labyrinth[y] !== undefined && labyrinth[y][x] !== WALL;
const checkFinish = (y, x) => labyrinth[y][x] === END;

const findPath = (y, x) => ([
  ['right', checkPath(y, x + 1)],
  ['left', checkPath(y, x - 1)],
  ['top', checkPath(y - 1, x)],
  ['bottom', checkPath(y + 1, x)],
]);

let inGame = true;

while (inGame) {
  const possiblePaths = findPath(pointer.y, pointer.x);
  const message = possiblePaths.filter(it => it[1]).map(it => it[0]).join(', ');
  const direction = prompt('you can go to: ' + message);
  if (direction === '') {
    inGame = false;
    alert('Escape from labyrinth... via helicopter, guess')
  }
  move(direction);
  if (checkFinish(pointer.y, pointer.x)) {
    inGame = false;
    alert('Congrats, you\'ve escaped from labyrinth safely')
  }
}