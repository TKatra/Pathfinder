(function() {
  'use strict';

  angular
  .module('main')
  .directive('bottomMenu', bottomMenuDirective);

  bottomMenuDirective.$inject = [];

  function bottomMenuDirective () {
    return {
      restrict: 'E',
      templateUrl: 'modules/main/views/bottomMenu.html'
    };
  }
})();