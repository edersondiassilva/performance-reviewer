(function(angular){
    'use strict';

    angular.module("PerformanceReviewer")
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider){
                $urlRouterProvider.otherwise('/');

                $stateProvider
                    .state('home', {
                        url: '/',
                        templateUrl: 'app/home/templates/home.html'
                    });
            }]);
})(window.angular);
