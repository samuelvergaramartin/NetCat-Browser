const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage: (callback) => ipcRenderer.send('message', callback),
    receiveResponse: () => {
        ipcRenderer.on('response', (evento, response) => {
            const respuesta = response.value;
            
        })
    }
});