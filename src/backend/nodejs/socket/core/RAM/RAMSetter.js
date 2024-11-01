class RAM_SET {
    constructor() {
      this.ClientDiscordRPC;
      this.DiscordConnectionPID;
      this.DiscordRPCActivity;
    }

    setClientDiscordRPC(ClientDiscordRPC, ) {
        this.ClientDiscordRPC = ClientDiscordRPC;
    }
    setDiscordConnectionPID(DiscordConnectionPID) {
        this.DiscordConnectionPID = DiscordConnectionPID;
    }
    setDiscordRPCActivity(DiscordRPCActivity) {
        this.DiscordRPCActivity = DiscordRPCActivity;
    }
  }
  
  module.exports = new RAM_SET();