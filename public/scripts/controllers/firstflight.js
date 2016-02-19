'use strict';

/**
 * @ngdoc function
 * @name flyBuyApp.controller:FFCtrl
 * @description
 * # FFCtrl
 * Controller of the flyBuyApp
 */
angular.module('flyBuyApp')
  .controller('FFCtrl', function ($scope, api, $location) {
    //"this" is $scope basically (known as "ff" in the template)
    var that = this;

    this.dateFormat = api.dateFormat;
    this.flightDatePopupState = {opened: false};
    this.flightDatePopup = function() {
      that.flightDatePopupState.opened = true;
    };
    this.purchaseDatePopupState = {opened: false};
    this.purchaseDatePopup = function() {
      that.purchaseDatePopupState.opened = true;
    };

    this.insertFlight = {
      user: {},
      flightDate: null,
      purchaseDate: null,
      flightNum: null,
      Airline: null,
      DepartureAirport: null,
      ArrivalAirport: null,
      pricePaid: null,
      purchaseLocation: null
    };

    api.getAirlines.query(function(data){
      that.airlines = data;
    });

    api.getAirports.query(function(data){
      that.airports = data;
    });

    api.flights.query(function(data){
      console.log(data);
    });

    api.UserInfo.query(function(data){
      var modifyUserInfo = data[0];
      modifyUserInfo.user_image = modifyUserInfo.user_image.substring(0, modifyUserInfo.user_image.length - 5);
      console.log(modifyUserInfo);
      that.userinfo = modifyUserInfo;
    });

    this.postFlight = function(insertFlight){
      if ($scope.firstflightform.$valid) {
        api.postFlight(insertFlight)
          .then(function(result){
            console.log(result);
            if (result.rowCount === 1) {
              $location.path('/dashboard');
            } else {
              console.log('It didn\'t insert');
            }
          });
      } else {
        console.log('Form invalid: ', $scope.firstflightform.$invalid);
      }
    };

  });
