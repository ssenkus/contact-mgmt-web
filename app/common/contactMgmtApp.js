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
            .otherwise({
                template: '<div>Unknown route!!</div>'
            });
    }
]);