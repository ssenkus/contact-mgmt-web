angular.module('AnsibleApp').controller('MainCtrl',
    ['$scope', '$http', '$sce', '$timeout', '$log', 'inventoryRepository', 'profileRepository', 'dialogManager', 'socketHandler',
        function ($scope, $http, $sce, $timeout, $log, inventoryRepository, profileRepository, dialogManager, socketHandler) {
            var vm = this;
            vm.command_output = '';
            vm.debug = true;
            vm.title = null;
            vm.outputScrollEnabled = false;

            vm.initialize = function () {
                initializeAppFromDataFile();
                setupSocketCommunication();
            };

            vm.getInventoryFile = function () {
                inventoryRepository.getInventory({
                    inventoryFile: vm.inventory
                }).then(function (response) {
                    vm.selectedInventoryFile = response.data.fileContents;
                }, function () {
                    $log('There was an error getting inventory file!!!');
                });
            };

            // convert to directive
            vm.hoverOverTask = function (playbooks) {
                if (!vm.actionClicked) {
                    vm.pbs = playbooks;
                }
            };

            // convert to directive
            vm.hoverOutTask = function () {
                if (!vm.actionClicked) {
                    vm.pbs = null;
                }
            };

            vm.action = function (name, playbooks) {

                vm.actionClicked = true;
                vm.pbs = playbooks;

                if (inventoryRepository.isInventoryEmpty(vm.inventory)) {
                    dialogManager.promptUserToSelectEnvironment();
                    resetUi();
                    return;
                }

                if (inventoryRepository.isProductionInventory(vm.inventory)) {
                    if (!dialogManager.confirmProductionEnvironmentSelection()) {
                        resetUi();
                        return;
                    }
                }

                resetCommandOutput();
                socketHandler.sendCommand({
                    name: name,
                    debug: vm.debug,
                    inventoryFile: vm.inventory,
                    playbooks: playbooks,
                    input: ''
                });
            };

            function resetCommandOutput() {
                vm.command_output = '';
            }

            function setupSocketCommunication() {

                socketHandler.registerSocketHandlers(function (data) {
                    console.log(vm.command_output, data.output);

                    $scope.$apply(function () {
                        if (data.done) {
                            vm.actionClicked = false;
                            dialogManager.showPlaybooksEnd();
                        } else {
                            // todo: this should eventually be a directive
                            vm.command_output = $sce.trustAsHtml(
                                vm.command_output +
                                ansi_up.ansi_to_html(data.output)
                            );

                            if (vm.outputScrollEnabled == true) {
                                $timeout(function () {
                                    window.scrollTo(0, document.body.scrollHeight);
                                }, 100);
                            }
                        }
                    });
                });
            }

            function initializeAppFromDataFile() {
                profileRepository.getDataFile().then(function (response) {
                    vm.tasks = response.data.tasks;
                    vm.inventories = response.data.inventories;
                    vm.inventory = null;
                }, function () {
                    $log('something went wrong');
                });
            }


            function resetUi() {
                vm.actionClicked = false;
                vm.pbs = null;
            }

        }
    ]);