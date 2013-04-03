({
    // for an explanation of these fields, you should go through
    // https://github.com/jrburke/r.js/blob/master/build/example.build.js

    baseUrl: '../webapp/js',
    inlineText: true,
    useStrict: false,
    name: '../vendor/almond',
    include: ['main'],
    insertRequire: ['main'],
    wrap: false,
    mainConfigFile: '../webapp/js/main.js',
    preserveLicenseComments: true,
    logLevel: 0,
    stubModules: ['text', 'hgn'],
    optimize: 'uglify2',
    pragmasOnSave: {
        // exclude compiler logic from Hogan.js
        excludeHogan: true
    }
})
