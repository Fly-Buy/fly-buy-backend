'use strict';

/**
 * @ngdoc service
 * @name flyBuyApp.api
 * @description
 * # api
 * Service in the flyBuyApp.
 */
angular.module('flyBuyApp')
  .service('api', function ($resource, $http, apihost) {

    var airlines = $resource(apihost + '/airlines');
    var airports = $resource(apihost + '/airports');
    var Flight = $resource(apihost + '/flights');
    var UserFlights = $resource(apihost + '/user/:userID', {userID: '@id'});

    return {
      getAirlines: airlines,
      getAirports: airports,
      flights: Flight,
      UserFlights: UserFlights,
      postFlight: function(flightInfo){
        console.log(flightInfo);
        var newFlight = new Flight();
        newFlight.user_id = null;
        newFlight.flight_date = flightInfo.flightDate || null;
        newFlight.purchase_date = flightInfo.purchaseDate || null;
        newFlight.flight_number = flightInfo.flightNum || null;
        newFlight.price_paid = flightInfo.pricePaid;
        newFlight.purchase_location = flightInfo.purchaseLocation || null;
        newFlight.departure_airport_id = flightInfo.DepartureAirport.id;
        newFlight.arrival_airport_id = flightInfo.ArrivalAirport ? flightInfo.ArrivalAirport.id : null;
        newFlight.airline_id = flightInfo.Airline ? flightInfo.Airline.id : null;
        newFlight.suspect = flightInfo.suspect || false;
        return newFlight.$save();
      }
    };
  });
