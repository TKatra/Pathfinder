(function() {
  'use strict';

  angular
  .module('main')
  .factory('mapFactory', MapFactory);

  MapFactory.$inject = ['$rootScope'];

  function MapFactory ($rootScope) {
    return {
      getPaths: getPaths
    };

    function getPaths(map) {
      console.log(map);
      var allPaths = pathfinder(map);
      console.log(allPaths);
      console.log(arrayCleaner(allPaths));

      $rootScope.$emit('foundPaths', 'PARF');
    }

    function pathfinder(map, row, col, currentPath) {
      var paths;
      var nextPath;

      row = row || 0;
      col = col || 0;
      currentPath = currentPath || {
        pathValue: 0,
        path: []
      };

      currentPath.pathValue+=map[row][col].value;
      currentPath.path.push({
        row: row,
        col: col
      });

      // console.log('(' + row +',' + col + '): ' + map[row][col].value);
      paths = [];

      if (col == 0 && map[row+1]) {
        // console.log('HOP DOWN');
        paths.push(pathfinder(map, row+1));
      }

      if (col == map[row].length-1) {
        // console.log('STOP');
        return currentPath;
      }

      if (map[row-1]) {
        if (map[row-1][col+1]) {
          // console.log('up');
          nextPath = angular.copy(currentPath);
          paths.push(pathfinder(map, row-1, col+1, nextPath));
        }
      }
      if (map[row][col+1]) {
        // console.log('forward');
        nextPath = angular.copy(currentPath);
        paths.push(pathfinder(map, row, col+1, nextPath));
      }
      if (map[row+1]) {
          if (map[row+1][col+1]) {
          // console.log('down');
          nextPath = angular.copy(currentPath);
          paths.push(pathfinder(map, row+1, col+1, nextPath));
        }
      }



      // console.log(paths);
      
      // console.log(arrayCleaner(paths));

      // return arrayCleaner(paths);
      return paths;
    }

    function arrayCleaner(uncleanArray, cleanArray, index) {
      cleanArray = cleanArray || [];
      index = index || 0;

      // console.log('uncleanArray', uncleanArray);
      // console.log('cleanArray', cleanArray);

      if (index < uncleanArray.length) {
        if (Array.isArray(uncleanArray[index])) {
          arrayCleaner(uncleanArray[index], cleanArray);
        }
        else {
          cleanArray.push(uncleanArray[index]);
          // return uncleanArray[index];
        }
        arrayCleaner(uncleanArray, cleanArray, index+1);
      }

      // console.log('Return', cleanArray);
      return cleanArray;




      // var cleanArray = []
      // for (var i = 0; i < uncleanArray.length; i++) {
      //   if (uncleanArray[i]) {

      //   }
      //   else
      // }
    }
  }
})();