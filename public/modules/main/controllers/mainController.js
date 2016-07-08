(function() {
  'use strict';

  angular
  .module('main')
  .controller('mainController', MainController);

  MainController.$inject = ['$rootScope', 'mapFactory'];

  function MainController($rootScope, mapFactory) {
    var vm = this;
    vm.map = [];
    vm.buildPhase = true;
    vm.loadingText = '';
    vm.buildMap = buildMap;
    vm.mapItemClick = mapItemClick;

    function buildMap() {
      var mapData = {
        rows: vm.rows,
        columns: vm.columns
      };
      vm.loadingText = 'Loading Map';
      vm.buildPhase = false;

      mapFactory.buildMap(mapData)
        .then(function(data) {

          vm.map = data.data;
          vm.loadingText = 'Loading Paths';

          mapFactory.getPaths({map: vm.map})
            .then(function(data) {
              vm.loadingText = '';
              activatePaths(data.data);
            });
        });
    }

    function mapItemClick(item , rowIndex, columnIndex) {
      item.playerPath = !item.playerPath;
    }

    function activatePaths(paths) {
      vm.lightPath = paths.lightPath;
      vm.heavyPath = paths.heavyPath;

      for (var i = 0; i < vm.columns; i++) {
        vm.map[vm.lightPath.path[i].row][vm.lightPath.path[i].col].lightPath = true;
        vm.map[vm.heavyPath.path[i].row][vm.heavyPath.path[i].col].heavyPath = true;
      }
    }
  }
})();