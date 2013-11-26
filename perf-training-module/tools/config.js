var fs = require('fs');
var util = require('util');

var root_dir = __dirname + '/..';
var config_path = process.env.NODE_CONFIG_PATH ||
                  root_dir + '/tools/config.json';
var config = JSON.parse(fs.readFileSync(config_path));

var mode = process.env.NODE_DEPLOY_MODE || process.argv[2] || 'local';

if (!config[mode])
  throw new Error('config mode "%s" does not exist', mode);

config = config[mode];

if (!config.static_assets)
  config.static_assets = root_dir + '/static';

if (!config.favicon)
  config.favicon = config.static_assets + '/favicon.ico';

if (!config.views)
  config.views = root_dir + '/views';

if (!config.mongodb)
  config.mongodb = {};

config.mongodb = util._extend({
  host: '127.0.0.1',
  port: 27017
}, config.mongodb);
config.mongodb.path = 'mongodb://' + config.mongodb.host + ':' +
                      config.mongodb.port + '/perftraining';

module.exports = config;
