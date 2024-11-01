const RAM_SET = require('./RAMSetter');

class RAM_GET {
  getClientDiscordRPC() {
    return RAM_SET.ClientDiscordRPC;
  }
  getDiscordConnectionPID() {
    return RAM_SET.DiscordConnectionPID;
  }
  getDiscordRPCActivity() {
    return RAM_SET.DiscordRPCActivity;
  }
}

module.exports = new RAM_GET();