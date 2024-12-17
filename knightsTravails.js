function knightMoves(start, end) {
  const isValidPosition = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

  const knightMovesOffsets = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  function getValidMoves(position) {
    const [x, y] = position;
    return knightMovesOffsets
      .map(([dx, dy]) => [x + dx, y + dy])
      .filter(([newX, newY]) => isValidPosition(newX, newY));
  }

  function bfs(start, end) {
    const queue = [[start]];
    const visited = new Set();
    visited.add(start.toString());

    while (queue.length > 0) {
      const path = queue.shift();
      const currentPosition = path[path.length - 1];

      if (currentPosition[0] === end[0] && currentPosition[1] === end[1]) {
        return path;
      }

      for (const move of getValidMoves(currentPosition)) {
        if (!visited.has(move.toString())) {
          visited.add(move.toString());
          queue.push([...path, move]);
        }
      }
    }

    return null;
  }

  const path = bfs(start, end);

  if (path) {
    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
    path.forEach((position) => console.log(position));
  } else {
    console.log("No path found.");
  }

  return path;
}

knightMoves([3, 3], [4, 3]);
knightMoves([0, 0], [7, 7]);
