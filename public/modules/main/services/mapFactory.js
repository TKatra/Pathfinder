(function() {
  'use strict';

  angular
  .module('main')
  .factory('mapFactory', MapFactory);

  MapFactory.$inject = ['$http'];

  function MapFactory ($http) {
    return {
      buildMap : function(data) {
        return $http.post('/api/map', data);
      },
      getPaths: function(data) {
        return $http.post('/api/map/paths', data);
      }
    };
  }
})();