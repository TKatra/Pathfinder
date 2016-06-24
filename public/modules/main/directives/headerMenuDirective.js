(function() {
  'use strict';

  angular
  .module('main')
  .directive('headerMenu', headerMenuDirective);

  headerMenuDirective.$inject = [];

  function headerMenuDirective () {
    return {
      restrict: 'E',
      templateUrl: 'modules/main/views/headerMenu.html'
    };
  }
})();