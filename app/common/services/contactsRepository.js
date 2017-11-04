contactMgmtApp.factory('contactsRepository', ['$http', function($http) {
    var CONTACTS_API_URL = '/api/v1/contacts';

    return {
        createContact: function(postData) {
            return $http.post(CONTACTS_API_URL, postData);
        },
        getAllContacts: function () {
            return $http.get(CONTACTS_API_URL);
        },
        getContactById: function (contactId) {
            return $http.get(CONTACTS_API_URL + '/' + contactId);
        },
        deleteContact: function (contactId) {
            return $http.delete(CONTACTS_API_URL + '/' + contactId);
        }
    };

}]);