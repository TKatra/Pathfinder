'use strict';

angular.module(appConfig.name, appConfig.dependencies);

angular.module(appConfig.name).config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [appConfig.name]);
});