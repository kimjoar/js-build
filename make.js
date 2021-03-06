require('shelljs/make');
require('colors');

var _ = require('underscore'),
    fs = require('fs'),
    pad = require('pad'),
    glob = require('glob'),
    path = require('path'),
    zlib = require('zlib'),
    hogan = require('hogan.js'),
    moment = require('moment');

var isWin = (process.platform === 'win32');

/*** CONFIG ********/

var version = process.env.VERSION || moment().format('YYYYMMDD');
    targetDir = process.env.OUTPUT_DIR || path.join('target', 'bekk-frontend');

var webapp = path.join('src', 'main', 'webapp'),
    config = path.join('src', 'main', 'config'),

    indexFile = path.join(webapp, 'index.mustache'),
    mainLessFile = path.join(webapp, 'css', 'app.less'),

    jsFileName = 'app-' + version + '.js',
    jsFile = path.join(targetDir, jsFileName),
    cssFileName = 'style-' + version + '.css',
    cssFile = path.join(targetDir, cssFileName);

    rjsConfig = path.join(config, 'buildconfig.js'),
    jshintConfig = path.join(config, 'jshint.json');


/*** TARGETS ********/

target.all = function() {
    target.check();
    target.jshint();
    target.test();
    target.build();
};

target.jshint = function() {
    var files = glob.sync(path.join(webapp, 'js', '**', '*.js'));

    section('Running JSHint');
    npmBin('jshint', '--config ' + jshintConfig, files.join(' '));
};

target.test = function() {
    section('Running JavaScript tests');
    npmBin('karma', 'start', 'karma.conf.js', '--browsers PhantomJS', '--single-run');
};

target.build = function() {
    createCleanDir(targetDir);

    buildIndexHtml();
    buildJavaScript();
    buildCss();

    gzip(jsFile);
    gzip(cssFile);

    optimizeImages();

    echo();echo();
    success("Build succeeded!");
};

target.check = function() {
    failIfOnlySubsetOfTestsAreRunning();
};


/*** APP FUNCTIONS ********/

var buildIndexHtml = function() {
    var htmlFile = path.join(targetDir, 'index.html');

    section('Building HTML → ' + htmlFile);
    renderAndWriteMustache(indexFile, htmlFile, {
        cssFile: cssFileName,
        jsFile: jsFileName
    });
};

var buildJavaScript = function() {
    section('Building JavaScript → ' + jsFile);
    npmBin('r.js', '-o ' + rjsConfig, 'out=' + jsFile);
};

var buildCss = function() {
    section('Building Less → ' + cssFile);
    npmBin('lessc', mainLessFile, cssFile);
};

var gzip = function(file) {
    var gzip = zlib.createGzip();
    var input = fs.createReadStream(file);
    var output = fs.createWriteStream(file + '.gz');

    section('Gzipping ' + file);
    input.pipe(gzip).pipe(output);
    success();
};

var addVersions = function() {
    // add versions to css and html files
};

var optimizeImages = function() {
    var pngs = glob.sync(path.join(webapp, 'images', '*.png'));

    section('Optimizing pngs');

    var to = path.join(targetDir, 'images');

    npmBin('optipng-bin', '-strip all', '-dir ' + to, pngs.join(' '))
};

var renderAndWriteMustache = function(from, to, data) {
    var mustache = fs.readFileSync(from).toString();
    var template = hogan.compile(mustache);
    var html = template.render(data);

    fs.writeFileSync(to, html);

    success();
};

var failIfOnlySubsetOfTestsAreRunning = function() {
    var specs = glob.sync(path.join('src', 'test', 'js', '**', '*Spec.js'));

    section('Checking for "ddescribe" and "iit" in tests');

    var ddescribe = grep("ddescribe", specs);
    var iit = grep("iit", specs);

    if (ddescribe === '' && iit === '') {
        success();
    } else {
        fail();
    }
};


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

