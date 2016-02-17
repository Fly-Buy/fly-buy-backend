'use strict';

/**
 * @ngdoc function
 * @name flyBuyApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the flyBuyApp
 */
angular.module('flyBuyApp')
  .controller('NavCtrl', function ($scope, apihost) {
    $scope.apihost = apihost;

  });
