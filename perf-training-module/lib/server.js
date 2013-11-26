var express = require('express');
var dot = require('consolidate').dot;

function launchServer(config, db) {
  var app = express();

  app.configure(function() {
    app.set('views', config.views);
    app.set('view engine', 'html');
    app.engine('html', dot);

    //app.use(express.logger());
    app.use(express.favicon(config.favicon));
    app.use(express.static(config.static_assets));
  });

  app.get('/', function(req, res){
    var templateData = {
      title: 'Performance Exploration',
      description: 'Examples of performance improvements'
    };
    res.render('index.html', templateData);
  });

  app.listen(config.port, function() {
    console.log('Listening on port %s', config.port);
  });
}


module.exports.launch = launchServer;
