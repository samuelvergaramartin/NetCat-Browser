const { app, BrowserWindow } = require('electron');
const control_unit = require('../backend/nodejs/socket/core/control-unit');
const path = require('path');

async function startNetCatBrowser(mainWindow) {
    var mainWindow;
    const routes = {
        loaderPage: "./src/windows/index.html",
        browserPage: "./src/windows/browser.html"
    };

    app.on('ready', () => {
        mainWindow = new BrowserWindow({ 
        width: 800, 
        height: 600,
        minWidth: 400,
        minHeight: 400,
        webPreferences: {
            preload: path.join(__dirname, '../backend/nodejs/middleware/bridge.js')
        },
        icon: path.join(__dirname, '../images/NetCat-Browser.ico') });

        mainWindow.loadFile(routes.loaderPage);
        //mainWindow.setMenu(null);

        mainWindow.webContents.once('did-finish-load', (evento) => {
                const loadPage = setTimeout(() => {
                    mainWindow.loadFile(routes.browserPage);
                }, 4000);
                setTimeout(()=> {
                    clearTimeout(loadPage);
                }, 5000);
        });

        control_unit(mainWindow);
    });
}

module.exports = { startNetCatBrowser };