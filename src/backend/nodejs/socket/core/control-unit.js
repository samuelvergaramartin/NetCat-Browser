const { ipcMain, BrowserWindow, dialog } = require('electron');
const { core_responses, locations, NetCatBrowserEvents } = require('../data/coreData');
const path = require('path');
const routes = {
    loaderPage: "./src/windows/index.html",
    browserPage: "./src/windows/browser.html"
};

async function control_unit(mainWindow) {
    ipcMain.on('data', async (ipcEvent, data) => {
        if(data.location == locations.start_file) {
            if(data.message == NetCatBrowserEvents.starting_app) {
                const coreResponse = {
                    location: core_responses.locations.control_unit,
                    message: core_responses.messages.success,
                    status: core_responses.status.success
                }
                return ipcEvent.reply(NetCatBrowserEvents['core-response'], coreResponse);
            }
        }
        if(data.location == locations.bridge) {
            if(data.message == NetCatBrowserEvents.app_started) {
                const coreResponse = {
                    location: core_responses.locations.control_unit,
                    message: core_responses.messages.success,
                    status: core_responses.status.success
                }
                return ipcEvent.reply(NetCatBrowserEvents['core-response'], coreResponse);
            }
        }
        if(data.location == locations.browser_page) {
            if(data.status == core_responses.status.error) {
                if(data.message == "campo url vacio") {
                    dialog.showMessageBox(mainWindow, {
                        type: 'error',
                        title: 'ERROR: Campo de URL vacío',
                        message: 'Debes introducir algo en el campo de URL si deseas realizar una búsqueda desde el campo de URL.',
                      });
                      const coreResponse = {
                        location: core_responses.locations.control_unit,
                        message: core_responses.messages.success,
                        status: core_responses.status.success
                    }
                    return ipcEvent.reply(NetCatBrowserEvents['core-response'], coreResponse);
                }
                if(data.message == "campo busqueda vacio") {
                    dialog.showMessageBox(mainWindow, {
                        type: 'error',
                        title: 'ERROR: Campo de búsqueda vacío',
                        message: 'Debes introducir algo en el campo de búsqueda si deseas realizar una búsqueda desde el campo de búsqueda.',
                      });
                      const coreResponse = {
                        location: core_responses.locations.control_unit,
                        message: core_responses.messages.success,
                        status: core_responses.status.success
                    }
                    return ipcEvent.reply(NetCatBrowserEvents['core-response'], coreResponse);
                }
                if(data.message == "campo url vacio ventana aparte") {
                    dialog.showMessageBox(mainWindow, {
                        type: 'error',
                        title: 'ERROR: Campo de URL vacío',
                        message: 'Debes introducir algo en el campo de URL si deseas realizar una búsqueda desde el campo de URL en una ventana aparte.',
                      });
                      const coreResponse = {
                        location: core_responses.locations.control_unit,
                        message: core_responses.messages.success,
                        status: core_responses.status.success
                    }
                    return ipcEvent.reply(NetCatBrowserEvents['core-response'], coreResponse);
                }
                if(data.message == "nueva ventana") {
                    let newWindow = new BrowserWindow({ 
                        width: 800, 
                        height: 600,
                        minWidth: 400,
                        minHeight: 400,
                        icon: path.join(__dirname, '../images/NetCat-2-years-image.ico') });
                    
                    newWindow.loadFile(routes.browserPage);
                    newWindow.setMenu(null);
                }
            }
            if(data.status == core_responses.status.success) {
                if(data.message == "returned home") {
                    const coreResponse = {
                        location: core_responses.locations.control_unit,
                        message: core_responses.messages.success,
                        status: core_responses.status.success
                    }
                    return ipcEvent.reply(NetCatBrowserEvents['core-response'], coreResponse);
                }
                if(data.message == "search something") {
                    const coreResponse = {
                        location: core_responses.locations.control_unit,
                        message: core_responses.messages.success,
                        status: core_responses.status.success
                    }
                    return ipcEvent.reply(NetCatBrowserEvents['core-response'], coreResponse);
                }
                if(data.message == "select-pdf") {
                    dialog.showOpenDialog({
                        filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
                        properties: ['openFile']
                    }).then((reply) => {
                        let content;
                    
                        if (reply.canceled || reply.filePaths.length === 0) content = { canceled: true };
                        else content = { canceled: false, filePath: reply.filePaths[0] };
                        
                        
                        const coreResponse = {
                            location: core_responses.locations.control_unit,
                            message: core_responses.messages.success,
                            content: content,
                            status: core_responses.status.success
                        }

                        return ipcEvent.reply(NetCatBrowserEvents['core-response'], coreResponse);
                    });
                }
            }
        }
    })
}

module.exports = control_unit;