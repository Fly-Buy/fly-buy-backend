
/**
 * @ngdoc service
 * @name flyBuyApp.graphs
 * @description
 * # api
 * Service in the flyBuyApp.
 */

angular.module('flyBuyApp')
  .service('graphs', function ($resource, $http, apihost, d3) {

    var flightData = $http({method:'POST', url: apihost + '/flights/dashboard/chart1'});
    var pieData = $http({method:'POST', url: apihost + '/flights/dashboard/chart2'});

    return {
      flightData: flightData,
      pieData: pieData
    };
  });
