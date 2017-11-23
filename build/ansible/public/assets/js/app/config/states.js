angular.module('AnsibleApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/data-commands");
        $stateProvider
            .state('data-commands', {
                url: "/data-commands",
                templateUrl: "/assets/partials/data-commands.html",
                controller: 'MainCtrl',
                controllerAs: 'ctrl'
            })
            .state('adhoc-command', {
                url: "/adhoc-command",
                templateUrl: "/assets/partials/adhoc-command.html",
                controller: 'adhocCommandCtrl',
                controllerAs: 'ctrl'
            })
    });