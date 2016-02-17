'use strict';

/**
 * @ngdoc function
 * @name flyBuyApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the flyBuyApp
 */
angular.module('flyBuyApp')
  .controller('HomeCtrl', function ($window, apihost) {
    // var that = this;
    this.gLogin = function(){
      $window.location.href = apihost + '/auth/google';
    };

    this.logout = function(){
      $window.location.href = apihost + '/auth/logout';
    };
  });
