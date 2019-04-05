'use strict';
const webdriver = require('selenium-webdriver');
const By = webdriver.By;

const cbtHub = 'http://localhost:4444/wd/hub';

function handleFailure(err, driver) {
    console.error('Some error occurred:\n', err.stack, '\n');
    driver.quit();
}

function wait(milliseconds) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), milliseconds);
    });
}

async function findShadowRootElement(driver, selectors) {
    let root = await driver.executeScript('return document');

    selectors.forEach(selector => {
        root = driver.executeScript('return arguments[0].querySelector(arguments[1]).shadowRoot', root, selector);
    });

    return root;
}

async function basicExample() {
    try {
        const driver = new webdriver.Builder()
            .usingServer(cbtHub)
            .forBrowser('chrome')
            .build();

        driver.get('chrome://settings/clearBrowserData');

        await driver.switchTo().activeElement();
        const dialog = await findShadowRootElement(driver, [
            'settings-ui',
            'settings-main',
            'settings-basic-page',
            'settings-privacy-page',
            'settings-clear-browsing-data-dialog',
        ]);
        await dialog.findElement(By.css('#clearBrowsingDataConfirm')).click();

        await wait(5000);

        console.log('Done');

        driver.quit();
    } catch (err) {
        handleFailure(err, driver)
    }
}

basicExample();
