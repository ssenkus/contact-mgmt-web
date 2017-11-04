contactMgmtApp.controller('ContactListCtrl', ['$scope', '$location', 'contactsRepository',
    function ($scope, $location, contactsRepo) {

        $scope.m = {
            contacts: []
        };

        $scope.initialize = function () {
            contactsRepo.getAllContacts().then(function (response) {
                $scope.m.contacts = response.data.contacts;
            }, function () {
                alert('error');
            });
        };


        $scope.createNewContact = function () {
            $location.url('contacts/create');
        };

   }
]);