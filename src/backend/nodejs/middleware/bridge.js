const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    input: (data) => {
        ipcRenderer.send('data', data);
        ipcRenderer.on('core-response', (event, data) => {
            if(data.content) {
                if(!data.content.canceled) {
                    if(data.content.filePath != null) {
                        while (main_container.firstChild) {
                            main_container.removeChild(main_container.firstChild);
                        }
                
                        const iframe = document.createElement("iframe");
                        iframe.src = `file://${data.content.filePath}`;
                        iframe.width = "100%";
                        iframe.height = "985";
                
                        main_container.appendChild(iframe);
                    }
                }
            }
        });
    }
});
contextBridge.exposeInMainWorld('testAPI', {
    start: (firstData) => {
        ipcRenderer.send('data', firstData);
        ipcRenderer.once('core-response', (event, data) => {
            if(data.location == "control-unit") {
                if(data.status == 200 && data.message == "OK") {
                    const app_started_data = {
                        location: "bridge",
                        message: "app_started",
                        status: 200
                    };
                    ipcRenderer.send('data', app_started_data);
                    /*ipcRenderer.once('core-response', (app_started_core_response_event, app_started_core_response_data) => {
                        if(data.location == "control-unit") {
                            if(data.status == 200 && data.message == "OK") {
                                return;
                            }
                        }
                    })*/
                }
            }
        });
    }
})