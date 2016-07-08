(function() {
  'use strict';

  angular
  .module('main')
  .directive('loading', loadingDirective);

  loadingDirective.$inject = [];

  function loadingDirective () {
    return {
      restrict: 'E',
      templateUrl: 'modules/main/views/loading.html'
    };
  }
})();