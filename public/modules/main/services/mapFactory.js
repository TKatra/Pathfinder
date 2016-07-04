(function() {
  'use strict';

  angular
  .module('main')
  .factory('mapFactory', MapFactory);

  MapFactory.$inject = ['$http'];//'$rootScope', '$q'

  function MapFactory ($http) {
    return {
      buildMap : function(data) {
        return $http.post('/api/map', data);
      },
      getPaths: function(data) {
        return $http.post('/api/map/paths', data);
      }
    };

    // function buildMap(rows, columns) {
    //   console.log('BUILD MAP');
    //   var newMap = [];
    //   var newRow;

    //   for (var i = 0; i < rows; i++) {
    //     newRow = [];
    //     for (var k = 0; k < columns; k++) {
    //       newRow.push({
    //         value: randomNumberBetween(1, 10),
    //         lightPath: false,
    //         heavyPath: false,
    //         playerPath: false
    //       });
    //     }
    //     newMap.push(newRow);
    //   }

    //   $rootScope.$emit('mapBuilt', newMap);
    //   getPaths(newMap);
    //   // return newMap;
    //   // vm.map = angular.copy(newMap);

    //   // mapFactory.getPaths(vm.map);
    // }

    // function getPaths(map) {
    //   console.log('GET PATHS');
    //   console.log(map);

    //   var foundPaths = arrayCleaner(pathfinder(map));
    //   console.log(foundPaths);
    //   var topPaths = findTopPaths(foundPaths);
    //   console.log(topPaths);

    //   $rootScope.$emit('pathsFound', topPaths);
    // }

    // function findTopPaths(paths) {
    //   console.log('FIND TOP PATHS');
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

    // function pathfinder(map, row, col, currentPath) {
    //   var paths;
    //   var nextPath;

    //   row = row || 0;
    //   col = col || 0;
    //   currentPath = currentPath || {
    //     pathValue: 0,
    //     path: []
    //   };

    //   currentPath.pathValue+=map[row][col].value;
    //   currentPath.path.push({
    //     row: row,
    //     col: col
    //   });

    //   paths = [];

    //   if (col == 0 && map[row+1]) {
    //     paths.push(pathfinder(map, row+1));
    //   }

    //   if (col == map[row].length-1) {
    //     return currentPath;
    //   }

    //   if (map[row-1]) {
    //     if (map[row-1][col+1]) {
    //       nextPath = angular.copy(currentPath);
    //       paths.push(pathfinder(map, row-1, col+1, nextPath));
    //     }
    //   }
    //   if (map[row][col+1]) {
    //     nextPath = angular.copy(currentPath);
    //     paths.push(pathfinder(map, row, col+1, nextPath));
    //   }
    //   if (map[row+1]) {
    //       if (map[row+1][col+1]) {
    //       nextPath = angular.copy(currentPath);
    //       paths.push(pathfinder(map, row+1, col+1, nextPath));
    //     }
    //   }
    //   return paths;
    // }

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

    // function randomNumberBetween(minNumber, maxNumber) {
    //   return Math.floor((Math.random() * maxNumber) + minNumber);
    // }
  }
})();