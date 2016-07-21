module.exports = function(config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-messages/angular-messages.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-material/angular-material.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/phantomjs-polyfill/bind-polyfill.js',
            'app/**/*.js',
            'app/**/*.html',
            'tests/unit/**/*.spec.js'
        ],
        exclude: [],
        preprocessors: {
            'app/**/*.js': 'coverage',
            'app/**/*.html': 'ng-html2js'
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/templates/',
            prependPrefix: 'app/',
            moduleName: 'templates'
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: './coverage/',
            reporters: [
                { type: 'text' },
                { type: 'html' }
            ]
        },
        port: 3333,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity
    })
}

