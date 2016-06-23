'use strict';

var appConfig = {
  name: 'app',
  dependencies: [
    'ui.router'
  ],
  addModule: function(name, dependencies) {
    angular.module(name, dependencies || []);
    angular.module(this.name).requires.push(name);
  }
};