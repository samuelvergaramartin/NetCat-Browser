const { contextBridge, ipcRenderer, dialog } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    input: (data) => {
        ipcRenderer.send('data', data);
        ipcRenderer.on('core-response', (evento, data) => {
            dialog.showMessageBox(mainWindow, {
                type: 'info',
                title: 'Debug',
                message: 'Leyendo en el puente!":',
            });
            if(data.content) {
                if(data.content.canceled) return null;
                else return data.content.filePath;
            }
            else return;
        });
    }
});
contextBridge.exposeInMainWorld('testAPI', {
    start: (firstData) => {
        ipcRenderer.send('data', firstData);
        ipcRenderer.once('core-response', (evento, data) => {
            if(data.location == "control-unit") {
                if(data.status == 200 && data.message == "OK") {
                    const app_started_data = {
                        location: "bridge",
                        message: "app_started",
                        status: 200
                    };
                    ipcRenderer.send('data', app_started_data);
                    ipcRenderer.once('core-response', (app_started_core_response_event, app_started_core_response_data) => {
                        if(data.location == "control-unit") {
                            if(data.status == 200 && data.message == "OK") {
                                return;
                            }
                        }
                    })
                }
            }
        });
    }
})