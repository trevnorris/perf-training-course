var crypto = require('crypto');
var fs = require('fs');

var ENTRY_LENGTH = process.argv[2] >>> 0 || 2500;

var male_first = fs.readFileSync(__dirname + '/data/male_first_names.txt');
var female_first = fs.readFileSync(__dirname + '/data/female_first_names.txt');
var last_names = fs.readFileSync(__dirname + '/data/last_names.txt');

var data_path = __dirname + '/data_entries.json';
var user_data = [];
var entries = { user_data: user_data };
var current_gender = '';
var uid = 0;

male_first = male_first.toString().split(/\s+/);
female_first = female_first.toString().split(/\s+/);
last_names = last_names.toString().split(/\s+/);

male_first.pop();
female_first.pop();
last_names.pop();

for (var i = 0; i < ENTRY_LENGTH >>> 1; i++) {
  user_data.push({
    first_name: randomFirstName(),
    last_name: randomLastName(),
    gender: current_gender,
    uid: ++uid,
    last_login: new Date(Date.now() - ((Math.random() * 2592000000) >>> 0)),
    key: crypto.pseudoRandomBytes(48).toString('base64'),
    // Add a separate object, like login_info, to entries for quick table
    // lookup. Just to make sure no username's are reused.
    user_name: '' // TODO
  });
}

try {
  fs.unlinkSync(data_path);
} catch(e) {
  if (e.message.substr(0, 6) !== 'ENOENT')
    throw e;
}

fs.writeFileSync(data_path, JSON.stringify(entries, null, '  '));


function randomFirstName() {
  var names;
  if (Math.random() > 0.5) {
    names = male_first;
    current_gender = 'Male';
  } else {
    names = female_first;
    current_gender = 'Female';
  }
  return fixName(names[(Math.random() * names.length) >>> 0]);
}


function randomLastName() {
  return fixName(last_names[(Math.random() * last_names.length) >>> 0]);
}


function fixName(string) {
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}
