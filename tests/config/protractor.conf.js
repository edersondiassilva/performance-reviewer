exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    suites: {
        home: [
            'tests/e2e/home/**/*.spec.js'
        ]
    },
    capabilities: {
        browserName: 'chrome',
    },
    jasmineNodeOpts: {
        showColors: true
    }
};
