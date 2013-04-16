require('shelljs/make');
require('colors');

var _ = require('underscore'),
    fs = require('fs'),
    glob = require('glob'),
    path = require('path');

var isWin = (process.platform === 'win32');

/*** CONFIG ********/

var webapp = path.join('src', 'main', 'webapp'),
    config = path.join('src', 'main', 'config'),

    rjsConfig = path.join(config, 'buildconfig.js'),
    jshintConfig = path.join(config, 'jshint.json');


/*** TARGETS ********/



/*** HELPER FUNCTIONS ********/

// helper to call an NPM binary, which resides in node_modules/.bin/name
// the rest of the arguments are used as space-separated arguments for the binary
var npmBin = function(name) {
    var bin = path.join('node_modules', '.bin', name);

    // call the correct on Windows
    if (isWin) {
        bin = bin + '.cmd';
    }

    if (!test('-e', bin)) {
        echo('Binary does not exist: ' + bin);
        exit(1);
    }

    var res = exec(bin + ' ' + _.rest(arguments).join(' '));
    done(res);
}

var createCleanDir = function(dir) {
    if (test('-d', dir)) {
        rm('-rf', dir);
    }

    mkdir('-p', dir);

    return dir;
};

var section = function(header) {
    echo();
    echo('    ' + header.bold);
};

var done = function(res) {
    if (res.code === 0) {
        success();
    } else {
        fail();
    }
};


var success = function(text) {
    text = text || 'done';
    var s = isWin ? '»' : '✓';
    echo('    ' + s.green + ' ' + text.green);
};

var fail = function(text) {
    text = text || 'failed';
    var s = isWin ? '×' : '✘';
    echo('    ' + s.red + ' ' + text.red);
    exit(1);
};

