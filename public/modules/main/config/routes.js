(function() {
  'use strict';

  angular
  .module('main')
  .config(mainRoutes);

  mainRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function mainRoutes ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('base', {
        templateUrl: 'modules/main/views/baseView.html'
      })
      .state('base.main', {
        url: '/',
        controller: 'mainController',
        controllerAs: 'mainCtrl',
        templateUrl: 'modules/main/views/mainView.html'
      });
  }
})();