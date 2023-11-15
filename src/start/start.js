const { app, BrowserWindow } = require('electron');
const path = require('path')

async function startNetCatBrowser() {
    let mainWindow;
    const routes = {
        loaderPage: "./src/windows/index.html",
        browserPage: "./src/windows/browser.html"
    };

    app.on('ready', () => {
        mainWindow = new BrowserWindow(
            { 
                width: 800,
                height: 600,
                icon: path.join(__dirname, "../images/NetCat-2-years-image.png")
            }
        );

        mainWindow.loadFile(routes.loaderPage); 

        mainWindow.webContents.once('did-finish-load', () => {
                const loadPage = setTimeout(() => {
                    mainWindow.loadFile(routes.browserPage);
                }, 4000);
                setTimeout(()=> {
                    clearTimeout(loadPage);
                }, 5000);
        });
    });
}

module.exports = startNetCatBrowser;
