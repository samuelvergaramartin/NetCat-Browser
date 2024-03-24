const clientData = require('../data/client-dc-rpc');
const RAM_GET = require('../core/RAM/RAMGetter');
const RAM_SET = require('../core/RAM/RAMSetter');
const { Client } = require('discord-rpc');
var client;

async function loginDcRPC() {
    try {
        let clientId = clientData.clientId;
        let activityData = RAM_GET.getDiscordRPCActivity();
        client = RAM_GET.getClientDiscordRPC();

        let PID = RAM_GET.getDiscordConnectionPID();

        client.on('ready', async() => {
            client.setActivity(activityData, PID);
        });
        client.login({ clientId: clientId });
    }
    catch(err) {
        console.log(err);
    }
}
module.exports = loginDcRPC;