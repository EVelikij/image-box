module.exports = function($scope, vkPermission, vkClient) {
  $scope.clientId = vkClient.clientId;
  $scope.display = vkClient.display;
  $scope.apiVesion = vkClient.apiVersion;
  $scope.permission = vkPermission.PHOTOS | vkPermission.FRIENDS;
  $scope.redirect = 'http://localhost:3000';
};