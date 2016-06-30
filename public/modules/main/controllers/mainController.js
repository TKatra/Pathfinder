(function() {
  'use strict';

  angular
  .module('main')
  .controller('mainController', MainController);

  // MainController.$inject = [];

  function MainController() {
    var vm = this;
    vm.map = [];
    vm.buildMap = buildMap;
    vm.mapItemClick = mapItemClick

    function buildMap() {
      var newMap = [];
      for (var i = 0; i < vm.rows; i++) {
        var newRow = [];
        for (var k = 0; k < vm.columns; k++) {
          newRow.push(randomNumberBetween(1, 10));
        }
        newMap.push(newRow);
      }
      vm.map = angular.copy(newMap);
    }

    function mapItemClick(rowIndex, columnIndex) {
      console.log('rowIndex', rowIndex);
      console.log('columnIndex', columnIndex);
    }

    function randomNumberBetween(minNumber, maxNumber) {
      return Math.floor((Math.random() * maxNumber) + minNumber);
    }
  }
})();