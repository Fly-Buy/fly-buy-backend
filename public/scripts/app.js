'use strict';

/**
 * @ngdoc overview
 * @name flyBuyApp
 * @description
 * # flyBuyApp
 *
 * Main module of the application.
 */

angular
  .module('flyBuyApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngLodash',
    'ui.bootstrap',
    'nvd3'
  ])
  .constant('apihost', 'https://fly-buy.cfapps.io')
  // .constant('apihost', 'http://127.0.0.1:3000')
  .config(function ($routeProvider, $httpProvider) {

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, apihost){
      // Initialize a new promise
      var deferred = $q.defer();
      // Make an AJAX call to check if the user is logged in
      $http.get(apihost + '/loggedin').success(function(user){
        // Authenticated
        if (user !== '0') deferred.resolve();
        // Not Authenticated
        else { $rootScope.message = 'You need to log in.';
        deferred.reject();
        $location.url('/');
        }
      });
      return deferred.promise;
    };


    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('/');
          return $q.reject(response);
        }
      };
    });


    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/firstflight', {
        templateUrl: 'views/firstflight.html',
        controller: 'FFCtrl',
        controllerAs: 'ff',
        resolve: { loggedin: checkLoggedin }
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dash',
        resolve: { loggedin: checkLoggedin }
      })
      .otherwise({
        redirectTo: '/'
      });
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.common;
  })
