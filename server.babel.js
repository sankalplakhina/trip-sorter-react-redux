var fs = require('fs');
var babelrc = fs.readFileSync('./.babelrc');
var config = JSON.parse(babelrc);

// overriding presets here as `loose` and `modules` options in babelrc
// were appended to support webpack 2's reuqirement
// While babel runtime at server, we need the modules import
// for node to undestand, hence the override
config.presets = ["es2015", "stage-0", "react"];
require('babel-core/register')(config);