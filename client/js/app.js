// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'lbServices',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('todo', {
        url: '/todo',
        templateUrl: 'views/todo.html',
        controller: 'TodoController'
      }).state('listing', {
        url: '/listing',
        templateUrl: 'views/listing.html',
        controller: 'CreateCtrl'
      }).state('search', {
        url: '/search',
        templateUrl: 'views/search.html',
        controller: 'CreateCtrl'
      });

    $urlRouterProvider.otherwise('listing');
  }]);
