'use strict';

/**
 * @ngdoc function
 * @name flyBuyApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the flyBuyApp
 */

angular.module('flyBuyApp')
  .controller('DashboardCtrl', function ($scope, $http, $location, api, graphs, d3, NgTableParams) {

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

    this.flightInfo = {
      user: {},
      flightDate: null,
      purchaseDate: null,
      flightNum: null,
      Airline: undefined,
      DepartureAirport: null,
      ArrivalAirport: null,
      pricePaid: null,
      purchaseLocation: null
    };

    this.SortOrder = 'price_paid';
    this.reverseSort = false;
    this.sorting = [
      {col: '0', name: 'Airline', sort: 'airline'},
      {col: '1', name: 'Departure', sort: 'departure'},
      {col: '2', name: 'Arrival', sort: 'arrival'},
      {col: '3', name: 'Flight Date', sort: 'flight_date'},
      {col: '4', name: 'Flight #', sort: 'flight_number'},
      {col: '5', name: 'Price ($)', sort: 'price_paid'},
      {col: '6', name: 'Purchase Date', sort: 'purchase_date'},
      {col: '7', name: 'Purchase Location', sort: 'purchase_location'},
      {col: '8', name: 'Suspect?', sort: 'suspect'},
    ];

    this.sort = function(col){
      console.log(col);
      that.SortOrder = col.sort;
      that.reverseSort = !that.reverseSort;
    };

    var updateNewData = function(){
      var updateGData = new graphs.flightData2();
      updateGData = updateGData.$save();
      updateGData.then(function(data){
        // console.log(data);
        console.log('that.data: ', data.chart_data);
        console.log('that.row_data: ', data.row_data);
        clearFlightInfo();
        that.data = data.chart_data;
        that.row_data = data.row_data;
        that.tableParams = new NgTableParams({sorting: {Price: 'asc'}}, {dataset: that.row_data});
      });
    };

    var clearFlightInfo = function(){
      that.flightInfo.user = {};
      that.flightInfo.flightDate = null;
      that.flightInfo.purchaseDate = null;
      that.flightInfo.flightNum = null;
      that.flightInfo.Airline = undefined;
      that.flightInfo.DepartureAirport = null;
      that.flightInfo.ArrivalAirport = null;
      that.flightInfo.pricePaid = null;
      that.flightInfo.purchaseLocation = null;
      that.noResultsAirline = false;
      that.noResultsDepAirport = false;
      that.noResultsArrAirport = false;
      // $scope.flightinfoform.$rollbackViewValue();
      $scope.flightinfoform.$setPristine();
      $scope.flightinfoform.$setUntouched();
    };

    this.updateNewData = updateNewData;

    this.clearForm = clearFlightInfo;

    this.limitData = function(flightInfo){
      // console.log(flightInfo);
      var searchGData = new graphs.flightData2();
      searchGData.user_id = null;
      searchGData.flight_date = flightInfo.flightDate || null;
      searchGData.purchase_date = flightInfo.purchaseDate || null;
      searchGData.flight_number = flightInfo.flightNum || null;
      searchGData.price_paid = flightInfo.pricePaid;
      searchGData.purchase_location = flightInfo.purchaseLocation || null;
      searchGData.departure_airport_id = flightInfo.DepartureAirport ? flightInfo.DepartureAirport.id: undefined;
      searchGData.arrival_airport_id = flightInfo.ArrivalAirport ? flightInfo.ArrivalAirport.id : undefined;
      searchGData.airline_id = flightInfo.Airline ? flightInfo.Airline.id : undefined;
      searchGData.suspect = flightInfo.suspect || false;
      searchGData = searchGData.$save();
      searchGData.then(function(data){
        // console.log(data);
        // console.log('that.data2: ', data.chart_data);
        // console.log('that.row_data2: ', data.row_data);
        that.data = data.chart_data;
        that.row_data = data.row_data;
      });
    };

    updateNewData();


    api.getAirlines.query(function(data){
      that.airlines = data;
    });

    api.getAirports.query(function(data){
      that.airports = data;
    });

    this.postFlight = function(flightInfo){
      if ($scope.flightinfoform.$valid) {
        api.postFlight(flightInfo)
          .then(function(result){
            console.log(result);
            if (result.rowCount === 1) {
              console.log("It worked");
              updateNewData();
            } else {
              console.log('It didn\'t insert');
            }
          });
      } else {
        console.log('Form invalid: ', $scope.flightinfoform.$invalid);
      }
    };


    var width = $(".graph-container").width();
    var height = $(".graph-container").height();
    this.options = {
            chart: {
                type: 'multiBarChart',
                height: height - 10,
                width: width * 1,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 45,
                    left: 75
                },
                showControls: false,
                clipEdge: false,
                //staggerLabels: true,
                duration: 250,
                stacked: false,
                groupSpacing: 0.15,
                noData: "No flights found for search parameters.",
                xAxis: {
                    axisLabel: 'Flights Tracked',
                    showMaxMin: false,
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Price ($)',
                    axisLabelDistance: -14,
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                tooltip: {
                  contentGenerator: function (key) {
                    // console.log(key.data.z);
                    return (
                      '<p>' +
                      'Airline: ' + key.data.z.airline + '<br>' +
                      'Flight Number: ' + key.data.z.flight_number + '<br>' +
                      'Departure: ' + key.data.z.departure + '<br>' +
                      'Arrival: ' + key.data.z.arrival + '<br>' +
                      'Flight Date: ' + new Date(key.data.z.flight_date).toLocaleDateString('en-US', {timeZone: 'UTC'}) + '<br>' +
                      'Price: $' + key.data.z.price_paid + '<br>' +
                      'Source: ' + key.data.z.purchase_location
                    );
                  },
                  headerEnabled: false
                }
            }
        };



    /////////////// chart buttons toggle-buttons-container
    this.show = true;
});
