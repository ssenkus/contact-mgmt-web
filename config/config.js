const _ = require('underscore');
const fs = require('fs');

let log;
let config;
let configFilePath = __dirname + '/' + '/debug.json';

function readConfig() {
    var fileContents = fs.readFileSync(configFilePath);
    var result = JSON.parse(fileContents);
    return result;
}

config = readConfig();
config.stopWatchingFileChanges = function () {
    if (!config.watchConfigFile) return;
    fs.unwatchFile(configFilePath);
};

if (config.watchConfigFile) {
    fs.watchFile(configFilePath, (curr, prev) => {
        if (!log) {
            log = require('../lib/log.js');
        }
        log.info('Configuration file change detected');
        var newConfig = readConfig();
        _.extend(config, newConfig);
    });
}

module.exports = config;