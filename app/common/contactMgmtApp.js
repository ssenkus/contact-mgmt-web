var contactMgmtApp = angular.module('contactMgmtApp', ['ngRoute']);

contactMgmtApp.config(['$routeProvider',
    function ($routeProvider) {

        $routeProvider
            .when('/', {
                redirectTo: '/contacts'
            })
            .when('/contacts', {
                templateUrl: '/app/contacts/listContacts.html'
            })
            .when('/contacts/create', {
                templateUrl: '/app/contacts/createContact.html'
            })
            .when('/contacts/:contactId', {
                templateUrl: '/app/contacts/viewContact.html'
            })
            .when('/dev-settings', {
                templateUrl: '/app/dev-settings/devSettings.html'
            })
            .otherwise({
                template: '<div>Unknown route!!</div>'
            });
    }
]);