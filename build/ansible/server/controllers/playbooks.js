var fs = require('fs');

exports.getPlaybooksList = function (req, res) {

    fs.readdir('./playbooks', function (err, files) {
        res.send({playbookFilesList: files})
    })

};

exports.getPlaybookFile = function (req, res) {

    fs.readFile('./playbooks/' + req.query.file, 'utf8', function (err, file) {
        res.send({playbookFileRaw: file})
    });

}