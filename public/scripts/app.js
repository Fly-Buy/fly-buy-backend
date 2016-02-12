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
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
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
        controllerAs: 'dashboard'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('apihost', 'https://fly-buy.cfapps.io');
