contactMgmtApp.controller('ContactDetailCtrl', ['$scope', '$location', '$routeParams', 'contactsRepository',
    function ($scope, $location, $routeParams, contactsRepo) {
        $scope.m = {
            _id: null,
            firstName: null,
            lastName: null,
            emailAddress: null
        };

        $scope.initialize = function () {
            var contactId = $routeParams.contactId;
            contactsRepo.getContactById(contactId)
                .then(function (response) {
                    _.extend($scope.m, response.data.contact[0]);
                }, function () {
                    alert('error');
                });
        };

        $scope.updateContact = function () {

            contactsRepo.updateContact($scope.m)
                .then(function (data) {
                    $location.url('contacts');
                }, function () {
                    alert('error');
                });
        };
        
    }
]);