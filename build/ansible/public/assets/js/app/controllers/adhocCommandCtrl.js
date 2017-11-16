angular.module('AnsibleApp').controller('adhocCommandCtrl', ['playbooksRepository', '$sce', function (playbooksRepository, $sce) {
    var vm = this;

    vm.initialize = function () {
        playbooksRepository.getAllPlaybooks().then(function (res) {
            vm.playbookFilesList = res.data.playbookFilesList;
        }, function () {
            console.log('errors')
        });
    };

    vm.getPlaybookFile = function (file) {
        playbooksRepository.getPlaybookFile(file).then(function (res) {
            vm.playbookFileRaw = $sce.trustAsHtml(res.data.playbookFileRaw);
        }, function () {
            console.log('errors');
        });

    };

}]);