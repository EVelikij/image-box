module.exports = function($rootScope, $location) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, el, attrs) {
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        var href = el.attr('href');

        if (toState.url == href)
          el.addClass('active');
        else
          el.removeClass('active');
      });
    }
  }
};