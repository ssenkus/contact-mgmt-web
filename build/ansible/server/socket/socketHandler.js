var socketIO = require('socket.io'),
    commandRepo = require('../repositories/commandRepository'),
    io;

exports.register = function (server) {
    io = socketIO(server);
    exports.socketEvents(io);
};

exports.socketEvents = function (io) {

    io.on('connection', function (socket) {
        socket.on('command', function (data) {
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
        });
    });

};