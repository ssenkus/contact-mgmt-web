contactMgmtApp.controller('DevSettingsCtrl', ['$scope', 'contactsRepository',
    function ($scope, contactsRepo) {


        $scope.generateNewContact = function () {
            contactsRepo.generateFakeContacts()
                .then(function () {
                    console.log('Added new contact');
                }, function (error) {
                    console.log('Something went wrong', error);
                });
        }
    }
]);
