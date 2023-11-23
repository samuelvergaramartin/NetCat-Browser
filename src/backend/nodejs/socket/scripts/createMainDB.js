const db = require('megadb');
const main_db = new db.crearDB('mainDB', 'main_db');
const { core_responses: {status: {success,error}} } = require('../data/coreData');

async function createMainDB(data) {
    var platform = data.platform;
    if(platform == "darwin") {
        platform = "MacOS";
    };
    if(platform == "win32") {
        platform = "Windows";
    };
    if(platform !== "darwin" && platform !== "win32") {
        platform = "Linux";
    };
    const db_data = {
        db_name: data.db_name,
        platform: platform,
        homedir: data.homedir,
        hostname: data.hostname,
        tempdir: data.tempdir,
        username: data.username
    }
    try {
        const db_Data = await main_db.get("db_name");
        if(db_Data) {
            switch(db_Data) {
                case db_data.db_name: {
                    console.error("CoreERROR: La tabla principal ya está creada, no se puede ejecutar el script de createMainDB");
                    return error;
                }
                default: {
                    main_db.set("db_name", db_data.db_name);
                    main_db.set("platform", db_data.platform);
                    main_db.set("homedir", db_data.homedir);
                    main_db.set("hostname", db_data.hostname);
                    main_db.set("tempdir", db_data.tempdir);
                    main_db.set("username", db_data.username);

                    return success;
                }
            }
        }
        else {
            main_db.set("db_name", db_data.db_name);
            main_db.set("platform", db_data.platform);
            main_db.set("homedir", db_data.homedir);
            main_db.set("hostname", db_data.hostname);
            main_db.set("tempdir", db_data.tempdir);
            main_db.set("username", db_data.username);
            return success;
        }
    }
    catch(err) {
        console.log(err);
        return error;
    }
}

module.exports = createMainDB;