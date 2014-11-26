var angular = require('angular');
var uiRouter = require('angular-ui-router');
var cookies = require('angular-cookies');

var app = angular.module('image-box', ['ui.router', 'ngCookies']);
app.config(function($stateProvider) {
  $stateProvider
    .state('galleries', {
      url: '/galleries',
      templateUrl: 'partials/galleries.html'
    })
    .state('social', {
      url: '/social',
      templateUrl: 'partials/social.html'
    })
    .state('messages', {
      url: '/messages',
      templateUrl: 'partials/messages.html'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'partials/settings.html'
    })
    .state('accessToken', {
      url: '/access_token=:accessToken',
      template: '',
      controller: function ($location, $cookieStore) {
        var hash = $location.path().substr(1);

        var splitted = hash.split('&');
        var params = {};

        for (var i = 0; i < splitted.length; i++) {
          var param  = splitted[i].split('=');
          var key    = param[0];
          var value  = param[1];
          params[key] = value;
          $cookieStore.put('accessToken', params);
        }
        $location.path("/about");
      }
    });
  
});

app.directive('boxSidebarNav', require('./directives/sidebar-nav'));

app.controller('galleriesCtrl', require('./controllers/galleriesCtrl'));
app.controller('socialCtrl', require('./controllers/socialCtrl'));

app.constant('vkPermission', require('./social/vk/permission'));
app.constant('vkClient', require('./social/vk/client'));
