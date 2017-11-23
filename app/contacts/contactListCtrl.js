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

        $scope.editContact = function (contact) {
            $location.url('contacts/' + contact._id);
        }

        $scope.deleteContact = function (contact) {
            // TODO: add a confirm before deleting...
            contactsRepo.deleteContact(contact._id)
                .then(function () {
                    removeContactFromCollection(contact);
                }, function () {
                    alert('error');
                });
        }


        function removeContactFromCollection(contact) {
            var index = $scope.m.contacts.indexOf(contact);
            if (index !== -1) {
                $scope.m.contacts.splice(index, 1);
            } else {
                throw new Error('Could not find deleted contact in list!');
            }
        }
    }
]);