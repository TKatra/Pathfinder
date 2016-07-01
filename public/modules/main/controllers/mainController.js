(function() {
  'use strict';

  angular
  .module('main')
  .controller('mainController', MainController);

  MainController.$inject = ['$rootScope', 'mapFactory'];

  function MainController($rootScope, mapFactory) {
    var vm = this;
    vm.map = [];
    vm.buildMap = buildMap;
    vm.mapItemClick = mapItemClick;

    $rootScope.$on('pathsFound', activatePaths);

    function buildMap() {
      var newMap = [];
      var newRow;

      for (var i = 0; i < vm.rows; i++) {
        newRow = [];
        for (var k = 0; k < vm.columns; k++) {
          newRow.push({
            value: randomNumberBetween(1, 10),
            lightPath: false,
            heavyPath: false,
            playerPath: false
          });
        }
        newMap.push(newRow);
      }
      vm.map = angular.copy(newMap);

      mapFactory.getPaths(vm.map);
    }

    function mapItemClick(item , rowIndex, columnIndex) {
      console.log('row', rowIndex);
      console.log('col', columnIndex);
      
      item.playerPath = !item.playerPath;
      console.log(item);
    }

    function activatePaths(event, paths) {
      console.log(paths);
      vm.lightPath = paths.lightPath;
      vm.heavyPath = paths.heavyPath;

      for (var i = 0; i < vm.columns; i++) {
        vm.map[vm.lightPath.path[i].row][vm.lightPath.path[i].col].lightPath = true;
        vm.map[vm.heavyPath.path[i].row][vm.heavyPath.path[i].col].heavyPath = true;
      }
    }

    function randomNumberBetween(minNumber, maxNumber) {
      return Math.floor((Math.random() * maxNumber) + minNumber);
    }
  }
})();