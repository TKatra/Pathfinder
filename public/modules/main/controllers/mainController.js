(function() {
  'use strict';

  angular
  .module('main')
  .controller('mainController', MainController);

  MainController.$inject = ['$rootScope', 'mapFactory'];

  function MainController($rootScope, mapFactory) {
    var vm = this;
    vm.map;
    vm.rows = 0;
    vm.columns = 0;
    vm.buildPhase = true;
    vm.showLoadingAnimation = false;
    vm.loadingText;
    vm.buildMap = buildMap;
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
          vm.loadingText = 'Loading Paths';

          mapFactory.getPaths({map: vm.map})
            .then(function(data) {
              vm.loadingText = '';
              vm.showLoadingAnimation = false;
              vm.lightPath = data.data.lightPath;
              vm.heavyPath = data.data.heavyPath;

              activatePaths();
            });
        });
    }

    function mapItemClick(item , rowIndex, columnIndex) {
      item.playerPath = !item.playerPath;
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