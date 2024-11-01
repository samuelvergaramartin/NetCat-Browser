const boton = document.getElementById('test-button');

boton.addEventListener('click', ()=> {
    //document.writeln("Botón pulsado");
    window.electronAPI.sendMessage(('Send'));
    window.electronAPI.receiveResponse();
})