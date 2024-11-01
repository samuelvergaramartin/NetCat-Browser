const { ipcMain, BrowserWindow, dialog } = require('electron');
const db = require('megadb');
const main_db = new db.crearDB('mainDB', 'main_db');
const os = require('os');
const { core_responses, locations, NetCatBrowserEvents } = require('../data/coreData');
const path = require('path');
const osData = {
    db_name: "main_db",
    platform: os.platform(),
    homedir: os.homedir(),
    hostname: os.hostname(),
    tempdir: os.tmpdir(),
    username: os.userInfo().username
};
const createMainDB = require('../scripts/createMainDB');
const updateMainDB = require('../scripts/updateMainDB');
const RAM_SET = require('../core/RAM/RAMSetter');
const RAM_GET = require('../core/RAM/RAMGetter');
const { Client } = require('discord-rpc');
var client = new Client({ transport: 'ipc' });
RAM_SET.setClientDiscordRPC(client);
const loginDcRPC = require('../scripts/loginDiscordRPC');
const routes = {
    loaderPage: "./src/windows/index.html",
    browserPage: "./src/windows/browser.html"
};
var clientData = require('../data/client-dc-rpc');
const PID = process.pid;
const ActivityTime = Date.now();
var activityData = {
    details: "En el menu principal",
    largeImageText: "NetCat Broswer v0.4 beta",
    largeImageKey: "netcat-browser-app",
    startTimestamp: ActivityTime,
    buttons: [
        {
            label: "🌐 Sitio oficial de descarga",
            url: "https://github.com/samuelvergaramartin/NetCat-Browser"
        },
        {
            label: "✉️Servidor de soporte de Discord",
            url: "https://discord.gg/FPJCmWH9qJ"
        }
    ]
}
RAM_SET.setDiscordConnectionPID(PID);
let clientId = clientData.clientId;

async function control_unit(mainWindow) {
    setInterval(() => {
        try {
            loginDcRPC();
        }
        catch(err) { 
            console.log(err);
        };
    }, 10000);
    ipcMain.on('data', async (ipcEvent, data) => {
        if(data.location == locations.start_file) {
            if(data.message == NetCatBrowserEvents.starting_app) {
                const db_data = await main_db.get("db_name");
                if(!db_data || db_data !== "main_db") {
                    const statusCode = await createMainDB(osData);
                    if(statusCode == core_responses.status.success) {
                        const coreResponse = {
                            location: core_responses.locations.control_unit,
                            message: core_responses.messages.success,
                            status: core_responses.status.success
                        }
                        return ipcEvent.reply(NetCatBrowserEvents['core-response'], coreResponse);
                    }
                    else if(statusCode == core_responses.status.error) {
                        const coreResponse = {
                            location: core_responses.locations.control_unit,
                            message: core_responses.messages.error,
                            status: core_responses.status.error
                        }
                        return ipcEvent.reply(NetCatBrowserEvents['core-response'], coreResponse);
                    }
                }
                else {
                    const statusCode = await updateMainDB(osData);
                    if(statusCode == core_responses.status.success) {
                        const coreResponse = {
                            location: core_responses.locations.control_unit,
                            message: core_responses.messages.success,
                            status: core_responses.status.success
                        }
                        return ipcEvent.reply(NetCatBrowserEvents['core-response'], coreResponse);
                    }
                    else if(statusCode == core_responses.status.error) {
                        const coreResponse = {
                            location: core_responses.locations.control_unit,
                            message: core_responses.messages.error,
                            status: core_responses.status.error
                        }
                        return ipcEvent.reply(NetCatBrowserEvents['core-response'], coreResponse);
                    }
                }
            }
        }
        if(data.location == locations.bridge) {
            if(data.message == NetCatBrowserEvents.app_started) {
                const coreResponse = {
                    location: core_responses.locations.control_unit,
                    message: core_responses.messages.success,
                    status: core_responses.status.success
                }
                RAM_SET.setDiscordRPCActivity(activityData);
                loginDcRPC();
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
                }
            }
            if(data.status == core_responses.status.success) {
                if(data.message == "returned home") {
                    activityData.details = "En el menu principal";
                    RAM_SET.setDiscordRPCActivity(activityData);
                    loginDcRPC();
                    const coreResponse = {
                        location: core_responses.locations.control_unit,
                        message: core_responses.messages.success,
                        status: core_responses.status.success
                    }
                    return ipcEvent.reply(NetCatBrowserEvents['core-response'], coreResponse);
                }
                if(data.message == "search something") {
                    activityData.details = "Buscando: " + data.query;
                    RAM_SET.setDiscordRPCActivity(activityData);
                    loginDcRPC();
                    const coreResponse = {
                        location: core_responses.locations.control_unit,
                        message: core_responses.messages.success,
                        status: core_responses.status.success
                    }
                    return ipcEvent.reply(NetCatBrowserEvents['core-response'], coreResponse);
                }
            }
        }
    })
}

module.exports = control_unit;