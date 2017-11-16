var config = require('../config/config');

exports.runCommands = function (socket, commands, callback) {
    var child_process = require('child_process'),
        spawn = child_process.spawn;

    var command = commands.shift().split(' ');
    var process = spawn(command[0], command.slice(1));

    var fullData = '';

    var outputHandler = function (data) {
        fullData += data.toString();
        socket.emit('out', {
            command: command,
            output: data.toString(),
        });
    };

    outputHandler("\n\n> " + command.join(' ') + "\n");
    process.stdout.on('data', outputHandler);
    process.stderr.on('data', outputHandler);


    process.on('close', function (code) {
        if (code === 0 && commands.length > 0) {
            exports.runCommands(socket, commands, callback);
        } else {
            exports.saveCommandOutput(fullData);
            callback();
        }
    });
};

exports.saveCommandOutput = function (commandOutput) {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(config.endpoints.mongo + '/devopsdb', function (err, db) {
        if (err) {
            throw err;
        }

        var collection = db.collection('command_history');

        //Test command output
        var command = {
            timestamp: Math.floor(new Date() / 1000),
            output: commandOutput
        };

        // Insert some users
        collection.insert(command, function (err, result) {
            console.log(result);
            if (err) {
                console.log(err);
            } else {
                console.log('Successfully inserted command output to mongodb collection "command_history"');
            }

            db.close();
        });
    });
};


// TODO: generalize the command execution so it can take a single command or an array of commands 
exports.runCommand = function(){};
function s(data) {
    var commands = [];

    data.playbooks.forEach(function (el, i) {
        var command = [
            'ansible-playbook',
            '-i ./inventory/' + data.inventoryFile,
            './playbooks/' + el + '.yml'
        ];
        if (data.debug) {
            command.push('-vvvv');
        }
        if (data.input) {
            command.push('--extra-vars "' + data.input + '"');
        }
        commands.push(command.join(' '));
    });
    commandRepo.runCommands(socket, commands, function () {
        socket.emit('out', {
            done: true,
        });
    });
}