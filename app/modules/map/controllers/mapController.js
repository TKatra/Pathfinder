'use strict';

var topPaths;

exports.create = function(req, res) {
  var newMap = [];
  var newRow;

  for (var i = 0; i < req.body.rows; i++) {
    newRow = [];
    for (var k = 0; k < req.body.columns; k++) {
      newRow.push({
        value: randomNumberBetween(1, 10),
        lightPath: false,
        heavyPath: false,
        playerPath: false,
        selectable: false
      });
    }
    newMap.push(newRow);
  }

  res.json(newMap);
}

exports.paths = function(req, res) {
  topPaths = {
    lightPath: {
      pathValue: Number.MAX_VALUE,
      path: [],
      startRow: 0
    },
    heavyPath: {
      pathValue: Number.MIN_VALUE,
      path: [],
      startRow: 0
    }
  };

  pathfinder(req.body.map);
  // var topPaths = findTopPaths(foundPaths);
  console.log('topPaths', topPaths);
  res.json(topPaths);
}

function pathfinder(map, row, col, currentPath) {
  // var paths;
  var nextPath;

  row = row || 0;
  col = col || 0;
  currentPath = currentPath || {
    pathValue: 0,
    path: [],
    startRow: row
  };

  currentPath.pathValue += map[row][col].value;
  // currentPath.path.push({
  //   row: row,
  //   col: col
  // });

  // paths = [];

  // if (col == 0 && map[row+1]) {
  //   // paths.push(pathfinder(map, row+1));
  //   pathfinder(map, row+1);
  // }

  if (col == map[row].length-1) {
    // return currentPath;
    if (topPaths.heavyPath.pathValue < currentPath.pathValue) {
      topPaths.heavyPath = currentPath;
      console.log('heavyPath:', topPaths.heavyPath);
    }

    if (topPaths.lightPath.pathValue > currentPath.pathValue) {
      topPaths.lightPath = currentPath;
      console.log('lightPath:', topPaths.lightPath);
    }
  }
  else {
    if (map[row-1]) {
      if (map[row-1][col+1]) {
        nextPath = JSON.parse(JSON.stringify(currentPath));
        nextPath.path.push(0); // 0 = up
        pathfinder(map, row-1, col+1, nextPath);
        // paths.push(pathfinder(map, row-1, col+1, nextPath));
      }
    }
    if (map[row][col+1]) {
      nextPath = JSON.parse(JSON.stringify(currentPath));
      nextPath.path.push(1); // 1 = forward
      pathfinder(map, row, col+1, nextPath);
      // paths.push(pathfinder(map, row, col+1, nextPath));
    }
    if (map[row+1]) {
        if (map[row+1][col+1]) {
        nextPath = JSON.parse(JSON.stringify(currentPath));
        nextPath.path.push(2); // 2 = down
        pathfinder(map, row+1, col+1, nextPath);
        // paths.push(pathfinder(map, row+1, col+1, nextPath));
      }
    }
  }

  if (col == 0 && map[row+1]) {
    // paths.push(pathfinder(map, row+1));
    pathfinder(map, row+1);
  }
  // return paths;
}

// function arrayCleaner(uncleanArray, cleanArray, index) {
//   cleanArray = cleanArray || [];
//   index = index || 0;

//   if (index < uncleanArray.length) {
//     if (Array.isArray(uncleanArray[index])) {
//       arrayCleaner(uncleanArray[index], cleanArray);
//     }
//     else {
//       cleanArray.push(uncleanArray[index]);
//     }
//     arrayCleaner(uncleanArray, cleanArray, index+1);
//   }
//   return cleanArray;
// }

// function findTopPaths(paths) {
//   var topPaths = {
//     lightPath: {
//       pathValue: Number.MAX_VALUE,
//       path: []
//     },
//     heavyPath: {
//       pathValue: Number.MIN_VALUE,
//       path: []
//     }
//   };

//   for (var i = 0; i < paths.length; i++) {
//     if (paths[i].pathValue < topPaths.lightPath.pathValue) {
//       topPaths.lightPath = paths[i];
//     }
//     if (paths[i].pathValue > topPaths.heavyPath.pathValue) {
//       topPaths.heavyPath = paths[i];
//     }
//   }

//   return topPaths;
// }

function randomNumberBetween(minNumber, maxNumber) {
  return Math.floor((Math.random() * maxNumber) + minNumber);
}