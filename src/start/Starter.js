const { ipcMain } = require('electron');
const { NetCatBrowserEvents: {core_ready}} = require('../backend/nodejs/socket/data/coreData');

/*
ipcRenderer.send('data', firstData);
ipcRenderer.on('core-response', (evento, data) => {
    console.log(data);
});
*/

async function starter(firstData, data) {
    try {
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = starter;