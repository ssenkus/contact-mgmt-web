contactMgmtApp.controller('ContactListCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.createNewContact = function () {
        $location.url('contacts/create');
    }

}]);