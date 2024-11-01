const db = require('megadb');
const main_db = new db.crearDB('mainDB', 'main_db');
const { core_responses: {status: {success,error}} } = require('../data/coreData');

async function updateMainDB(data) {
    var platform = data.platform;
    if(platform == "darwin") {
        platform = "MacOS";
    };
    if(platform == "win32") {
        platform = "Windows";
    };
    if(platform !== "darwin" && platform !== "win32") {
        if(platform == "Windows") {
            void 0;
        }
        else {
            platform = "Linux";
        }
    };
    const db_data = {
        db_name: data.db_name,
        platform: platform,
        homedir: data.homedir,
        hostname: data.hostname,
        tempdir: data.tempdir,
        username: data.username
    }
    const db_Data = await main_db.get("db_name");

    if(!db_Data) {
        console.error("CoreERROR: La tabla principal no está creada, no se puede ejecutar el script de updateMainDB");
        return error;
    }
    if(db_Data) {
        try {

            main_db.set("db_name", db_data.db_name);
            main_db.set("platform", db_data.platform);
            main_db.set("homedir", db_data.homedir);
            main_db.set("hostname", db_data.hostname);
            main_db.set("tempdir", db_data.tempdir);
            main_db.set("username", db_data.username);

            return success;
        }
        catch(err) {
            console.log(err);
            return error
        }
    }
}

module.exports = updateMainDB;