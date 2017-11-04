contactMgmtApp.controller('ContactDetailCtrl', ['$scope', '$location', '$routeParams', 'contactsRepository',
    function ($scope, $location, $routeParams, contactsRepo) {
        $scope.m = {
            firstName: null,
            lastName: null,
            emailAddress: null
        };

        $scope.initialize = function () {
            var contactId = $routeParams.contactId;
            contactsRepo.getContactById(contactId)
                .then(function (response) {
                    console.log(response)
                    _.extend($scope.m, response.data.contact[0]);
                    console.log($scope.m);
                }, function () {
                    alert('error');
                });
        };

    }
]);