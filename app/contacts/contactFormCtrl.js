contactMgmtApp.controller('ContactFormCtrl', ['$scope', '$location', 'contactsRepository',
    function ($scope, $location, contactsRepo) {
        $scope.m = {
            firstName: null,
            lastName: null,
            emailAddress: null
        };

        $scope.submitNewContact = function () {
            contactsRepo.createContact($scope.m)
                .then(function (data) {
                    console.log('data', data);
                    $location.url('contacts');
                }, function () {
                    alert('error');
                });
        };

    }
]);