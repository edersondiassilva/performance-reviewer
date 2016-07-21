(function(angular){
    'use strict';

    angular.module("PerformanceReviewer")
        .config([
            '$mdThemingProvider',
            function($mdThemingProvider){
                $mdThemingProvider.theme("default")
                    .primaryPalette("purple");
            }]);
})(window.angular);
