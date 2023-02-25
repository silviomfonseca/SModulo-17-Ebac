const { join } = require('path')
const allure = require('allure-commandline')
const video = require('wdio-video-reporter')

exports.config = {
    //  hostname: 'localhost',
    // port: 4723,
    // path: '/wd/hub',
    user: "gabrielroquim_j2H5F4",
    key: "ZV6tSgzyw2ytsxvpUyRF",
    //   services: ['appium'],
    services: ['browsertack'],
    specs: [
        './test/specs/**/*.spec.js'
    ],
    framework: 'mocha',
    capabilities: [{
        // "platformName": "Android",
        //  "platformVersion": "12.0",
        // "deviceName": "TestesEbacs",
        // "automationName": "UiAutomator2",
        // "app": join(process.cwd(), './app/android/loja-ebac.apk'),
        // "appWaitActivity": 'com.woocommerce.android.ui.login.LoginActivity'

        'app': 'bs://e172f2a689fed6247cfbd11c6bfa8c99e348d2cd',
        'device': 'Google Pixel 4',
        'os_version': '10.0',
        'project': 'Meu primeiro Device Farm',
        'build': 'browserstack-build-1',
        'name': 'teste_ebac'

    }],
    waitForTimeout: 20000,
    mochaOpts: {
        timeout: 300000
    },
    reporters: ['spec',
        ['allure', {
            outputDir: './allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
        [video, {
            saveAllVideos: true,       // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 50, // Higher to get slower videos, lower for faster videos [Value 1-100]
        }]
    ],
    onComplete: function () {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
    afterStep: function (test, scenario, { error, duration, passed }) {
        if (error) {
            driver.takeScreenshot()
        }
    }
}