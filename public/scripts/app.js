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
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/firstflight', {
        templateUrl: 'views/firstflight.html',
        controller: 'FFCtrl',
        controllerAs: 'ff'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dash'
      })
      .otherwise({
        redirectTo: '/'
      });
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.common;
  })
  .constant('apihost', 'https://fly-buy.cfapps.io');
  // .constant('apihost', 'http://127.0.0.1:3000');
