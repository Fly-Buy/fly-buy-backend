'use strict';

/**
 * @ngdoc function
 * @name flyBuyApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the flyBuyApp
 */
angular.module('flyBuyApp')
  .controller('DashboardCtrl', function ($scope, $http, $location, api, graphs, d3) {

    var that = this;
    var barChart = {};


    graphs.flightData.then(function(data){
      console.log('flight data: ', data.data.chart_data);
      that.flightData = data;

      chartOne = graphs.chartOne(data.data.chart_data);
      // To Do:
      // pieChart = graphs.chartTwo(data.data.row_data);
      // lineChart = graphs.chartThree(data.data.row_data);

    });

    graphs.pieData.then(function(data){
      console.log("here\'s your info!",  data.data.chart_data);
      that.data = data.data.chart_data;

    })

    this.flightInfo = {
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

    this.postFlight = function(flightInfo){
      console.log(flightInfo);
      // if ($scope.flightinfoform.$valid) {
      //   api.postFlight(flightInfo)
      //     .then(function(result){
      //       console.log(result);
      //       if (result.rowCount === 1) {
      //         $location.path('/dashboard');
      //       } else {
      //         console.log('It didn\'t insert');
      //       }
      //     });
      // } else {
      //   console.log('Form invalid: ', $scope.flightinfoform.$invalid);
      // }
    };
    //
    // this.options = {
    //   chart: {
    //       type: 'multiBarChart',
    //       height: 450,
    //       width: 600,
    //       margin : {
    //         top: 20,
    //         right: 20,
    //         bottom: 60,
    //         left: 70
    //       },
    //       x: function(d){ return d.label; },
    //       y: function(d){ return d.value; },
    //       showValues: true,
    //       valueFormat: function(d){
    //           return d3.format(',.4f')(d);
    //       },
    //       transitionDuration: 10,
    //       xAxis: {
    //           axisLabel: 'Airline'
    //       },
    //       yAxis: {
    //           axisLabel: 'Price',
    //           axisLabelDistance: 10
    //       }
    //   }
    // };

    this.options = {
        chart: {
            type: 'pieChart',
            height: 500,
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showLabels: true,
            duration: 500000,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };

    /////////////// chart buttons toggle-buttons-container
    this.show = true;

    this.showMe = function(){
      this.show=true;
    }
    this.hideMe = function(){
      this.show=false;
    }


});
