angular.module('AnsibleApp')
    .factory('playbooksRepository', ['$http', function ($http) {

        function requestPlaybooksList() {
            return $http({
                method: 'GET',
                url: playbooksEndpoint + '/list',
            });
        }
        
        function requestPlaybookFile(file) {
            return $http({
                method: 'GET',
                url: playbooksEndpoint + '/file/',
                params: {
                    file: file
                }
            });
        }

        var playbooksEndpoint = '/playbooks',
            playbooksRepository = {
                getAllPlaybooks: function (options) {
                    return requestPlaybooksList(options);
                },
                getPlaybookFile: function(file) {
                    return requestPlaybookFile(file)
                }
            };

        return playbooksRepository;
    }]);