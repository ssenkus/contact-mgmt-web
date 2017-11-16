module.exports = function (app) {

    var inventory = require('../controllers/inventory'),
        playbooks = require('../controllers/playbooks'),
        views = require('../controllers/views'),
        auth = require('../auth/auth');

    console.log('playbooks', playbooks)

    app.get('/', auth, views.index);
    app.get('/inventory', auth, inventory.getInventory);
    app.get('/playbooks/file/', auth, playbooks.getPlaybookFile);
    app.get('/playbooks/list/', auth, playbooks.getPlaybooksList);

}