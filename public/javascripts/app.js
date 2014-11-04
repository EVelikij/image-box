var app = angular.module('image-box', ['ui.router']);

app.config(function($stateProvider) {
  $stateProvider
    .state('galleries', {
      url: '/galleries',
      templateUrl: 'partials/galleries.html'
    })
    .state('social', {
      url: 'social',
      templateUrl: 'partials/social.html'
    })
    .state('messages', {
      url: 'messages',
      templateUrl: 'partials/messages.html'
    })
    .state('settings', {
      url: 'settings',
      templateUrl: 'partials/settings.html'
    })
});