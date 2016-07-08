(function() {
  'use strict';

  angular
  .module('main')
  .controller('mainController', MainController);

  MainController.$inject = ['$rootScope', '$scope', 'mapFactory'];

  function MainController($rootScope, $scope, mapFactory) {
    var vm = this;
    vm.map;
    vm.playerPath = {
      pathValue: 0,
      path: []
    };
    vm.rows = 0;
    vm.columns = 0;
    vm.buildPhase = true;
    vm.showLoadingAnimation = false;
    vm.loadingText;
    vm.playerPathReady = false;
    vm.pathsReady = false;
    vm.buildMap = buildMap;
    vm.confirmPath = confirmPath;
    vm.mapItemClick = mapItemClick;
    vm.resetMap = resetMap;

    function buildMap() {
      var mapData = {
        rows: vm.rows,
        columns: vm.columns
      };
      vm.loadingText = 'Loading Map';
      vm.buildPhase = false;
      vm.showLoadingAnimation = true;

      mapFactory.buildMap(mapData)
        .then(function(data) {

          vm.map = data.data;
          for (var i = 0; i < vm.map.length; i++) {
            vm.map[i][0].selectable = true;
          }

          vm.loadingText = 'Loading Paths';

          mapFactory.getPaths({map: vm.map})
            .then(function(data) {
              vm.loadingText = '';
              vm.showLoadingAnimation = false;
              vm.lightPath = data.data.lightPath;
              vm.heavyPath = data.data.heavyPath;

              vm.pathsReady = true;
            });
        });
    }

    function confirmPath() {
      activatePaths();
    }

    function mapItemClick(item, rowIndex, columnIndex) {
      if (item.selectable) {
        item.playerPath = !item.playerPath;
        
        vm.playerPath.pathValue += item.value;

        vm.playerPath.path.push({
          row: rowIndex,
          col: columnIndex,
          value: item.value
        });

        for (var i = 0; i < vm.map.length; i++) {
          vm.map[i][columnIndex].selectable = false;
        }

        if (vm.map[rowIndex-1]) {
          if (vm.map[rowIndex-1][columnIndex+1]) {
            vm.map[rowIndex-1][columnIndex+1].selectable = true;
          }
        }
        if (vm.map[rowIndex][columnIndex+1]) {
          vm.map[rowIndex][columnIndex+1].selectable = true;
        }
        if (vm.map[rowIndex+1]) {
          if (vm.map[rowIndex+1][columnIndex+1]) {
            vm.map[rowIndex+1][columnIndex+1].selectable = true;
          }
        }
      }
      else if (item.playerPath) {
        item.playerPath = false;

        var lastPathItem = vm.playerPath.path[vm.playerPath.path.length-1]

        if (vm.map[lastPathItem.row-1]) {
          if (vm.map[lastPathItem.row-1][lastPathItem.col+1]) {
            vm.map[lastPathItem.row-1][lastPathItem.col+1].selectable = false;
          }
        }
        if (vm.map[lastPathItem.row][lastPathItem.col+1]) {
          vm.map[lastPathItem.row][lastPathItem.col+1].selectable = false;
        }
        if (vm.map[lastPathItem.row+1]) {
          if (vm.map[lastPathItem.row+1][lastPathItem.col+1]) {
            vm.map[lastPathItem.row+1][lastPathItem.col+1].selectable = false;
          }
        }

        for (var i = vm.playerPath.path.length-1; i >= columnIndex; i--) {
          var row = vm.playerPath.path[i].row;
          var col = vm.playerPath.path[i].col;
          vm.map[row][col].playerPath = false;

          vm.playerPath.path.splice(i, 1);
        }
        
        vm.playerPath.pathValue = 0;

        for (var i = 0; i < vm.playerPath.path.length; i++) {
          vm.playerPath.pathValue += vm.playerPath.path[i].value;
        }

        if (vm.playerPath.path.length) {
          lastPathItem = vm.playerPath.path[vm.playerPath.path.length-1];

          if (vm.map[lastPathItem.row-1]) {
            if (vm.map[lastPathItem.row-1][lastPathItem.col+1]) {
              vm.map[lastPathItem.row-1][lastPathItem.col+1].selectable = true;
            }
          }
          if (vm.map[lastPathItem.row][lastPathItem.col+1]) {
            vm.map[lastPathItem.row][lastPathItem.col+1].selectable = true;
          }
          if (vm.map[lastPathItem.row+1]) {
            if (vm.map[lastPathItem.row+1][lastPathItem.col+1]) {
              vm.map[lastPathItem.row+1][lastPathItem.col+1].selectable = true;
            }
          }
        }
        else {
          for (var i = 0; i < vm.map.length; i++) {
            vm.map[i][0].selectable = true;
          }
        }
      }
      if (vm.playerPath.path.length === vm.columns) {
        vm.playerPathReady = true;
      }
      else {
        vm.playerPathReady = false;
      }
    }

    function resetMap() {
      vm.buildPhase = true;
      vm.rows = 0;
      vm.columns = 0;
      vm.map = undefined;
      vm.lightPath = undefined;
      vm.heavyPath = undefined;
    }

    function activatePaths() {
      for (var i = 0; i < vm.columns; i++) {
        vm.map[vm.lightPath.path[i].row][vm.lightPath.path[i].col].lightPath = true;
        vm.map[vm.heavyPath.path[i].row][vm.heavyPath.path[i].col].heavyPath = true;
      }
    }
  }
})();