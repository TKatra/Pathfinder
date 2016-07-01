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

    $rootScope.$on('foundPaths', showPaths);

    function buildMap() {
      var newMap = [];
      var newRow;

      for (var i = 0; i < vm.rows; i++) {
        newRow = [];
        for (var k = 0; k < vm.columns; k++) {
          newRow.push({
            value: randomNumberBetween(1, 10),
            fastPath: false,
            slowPath: false,
            playerPath: false
          });
        }
        newMap.push(newRow);
      }
      vm.map = angular.copy(newMap);

      mapFactory.getPaths(vm.map);
      // mapFactory.getSlowPath(vm.map);
    }

    function mapItemClick(item , rowIndex, columnIndex) {
      console.log('row', rowIndex);
      console.log('col', columnIndex);
      
      item.playerPath = !item.playerPath;
      console.log(item);
    }

    function showPaths(event, pathType) {
      console.log(pathType);
    }

    function randomNumberBetween(minNumber, maxNumber) {
      return Math.floor((Math.random() * maxNumber) + minNumber);
    }
  }
})();