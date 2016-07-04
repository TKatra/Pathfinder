'use strict';

var MapController = require('./modules/map/controllers/mapController');

module.exports = function(app) {
  app.post('/api/map', MapController.create);
  app.post('/api/map/paths', MapController.paths);

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
};