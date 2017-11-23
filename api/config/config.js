const _ = require('underscore');
const fs = require('fs');

let log;
let config;
let configFilePath = __dirname + '/' + '/debug.json';

config = readConfig();
config.stopWatchingFileChanges = () => {
    if (!config.watchConfigFile) return;
    fs.unwatchFile(configFilePath);
};

if (config.watchConfigFile) {
    fs.watchFile(configFilePath, (curr, prev) => {
        if (!log) {
            log = require('./log.js');
        }
        log.info('Configuration file change detected');
        var newConfig = readConfig();
        _.extend(config, newConfig);
    });
}

function readConfig() {
    var fileContents = fs.readFileSync(configFilePath);
    var result = JSON.parse(fileContents);
    return result;
}

module.exports = config;