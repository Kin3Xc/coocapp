// modulo para de la app para crear los controladores
var app = angular.module('coocapp.controllers', ['ngCordova']);
// CONTROLADORES DE LA APP
app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

});

// controlador para la vista home, encargada de recoger el código del restaurante
app.controller('HomeCtrl', function($scope, $state) {
   $scope.verMapa = function(){
      $state.go('app.mapa');
   }

});// fin HomeCtrl
app.controller('LoginCtrl', function($scope, $state) {
   $scope.verHome = function(){
      $state.go('app.home');
   }

});// fin HomeCtrl
app.controller('MapCtrl', function($scope, $cordovaGeolocation, $ionicLoading) {

   document.addEventListener("deviceready", onDeviceReady, false);

   function onDeviceReady() {

      $ionicLoading.show({
         template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
      });

      var posOptions = {
         enableHighAccuracy: true,
         timeout: 20000,
         maximumAge: 0
      };
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
         var lat  = position.coords.latitude;
         var long = position.coords.longitude;

         var myLatlng = new google.maps.LatLng(lat, long);

         var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
         };

         var map = new google.maps.Map(document.getElementById("map"), mapOptions);

         $scope.map = map;
         $ionicLoading.hide();

      }, function(err) {
         $ionicLoading.hide();
         console.log(err);
      });
   }
});
