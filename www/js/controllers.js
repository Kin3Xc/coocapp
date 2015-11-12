angular.module('starter.controllers', ['ionic', 'ngCordova'])
.controller('loginController',function($scope, $location){

	//Defino el modelo a utilizar, en este caso un sensillo login
	//con los datos de usuario y clave
	$scope.login = {
		usuario: '',
		clave: ''
	};

	//Funcion para ingresar, se ejecuta al hacer clic sobre el boton Ingresar
	$scope.ingresar = function(){
		//Aquí validaria los datos que ingresa el usuario
		if ($scope.login.usuario != "" && $scope.login.clave != "") {
			if ($scope.login.usuario === "root") {
				if ($scope.login.clave === "root") {
					// alert('Bienvenido al sistema');
					$location.url("/home");
				}else{
					alert('Su clave es incorrecta\nPor favor vuelva a intentarlo');
					$scope.login.clave = "";
				}
			}else{
				alert('El usuario ingresado no existe\nPor favor vuelva a intentarlo');
				$scope.login.usuario = "";
			}
		}else{
			alert('Existen campos vacios, por favor verifique\nIngrese todos los datos.');
		}
	};
})
.controller('HomeCtrl',function($scope, $location){

	$scope.verMapa = function(){
		$location.url("/mapa");
	};
})

.factory('mapa', function(){
	service = {};

	service.render = function(lat, long){
		var location = new google.maps.LatLng(lat, long);
		var option = {
			zoom: 14,
			center: location,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		directionsDisplay = new google.maps.DirectionsRenderer();

		map = new google.maps.Map(document.getElementById('map'), option);

		directionsDisplay.setMap(map);

		marker = new google.maps.Marker({
			map: map,
			position: location,
			title: 'Mi ubicación'
		});

	}
	return service;
})

//Controlador para octener la pocision actual del usuario
.controller('MapaCtrl', [ '$scope', '$cordovaGeolocation', 'mapa', function($scope, $cordovaGeolocation, mapa){
	$scope.titulo = "Pocisión actual";
	var posOptions = {timeout: 5000, enableHighAccuracy: true};
	$scope.lat;
	$scope.long;
	$cordovaGeolocation
	.getCurrentPosition(posOptions)
	.then(function(position) {
		var lat  = position.coords.latitude
		var long = position.coords.longitude

		mapa.render(lat, long);

		$scope.lat = lat;
		$scope.long = long;

	}, function(err) {
		// error
		console.log('Error: ' + err);
	});
}]);
