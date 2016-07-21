
var clientApp = angular.module('clientApp',[]);


clientApp.controller('AppCtrl', function($scope, $http){ 

	console.log('Hello World From controller');

	var refreshContactList = function() {

		$http.get('/contactlist').success(function(response) {

			console.log('received data from server');

			$scope.contactlist = response;

			$scope.contact = "";  //clear entry fields

			

		});
	}

	refreshContactList();

	$scope.addContact = function() {

		console.log($scope.contact);

		$http.post('/contactlist', $scope.contact).success(function(response){
			console.log('Server response:');
			console.log(response);
		});

		refreshContactList();
	};

	$scope.deleteContact = function(id) {

		console.log('Delete ' + id);

		$http.delete('/contactlist/' + id).success(function(response){

			console.log('Sucessfully deleted contact :');
			console.log(response);
			
			refreshContactList();
		});
	};

	$scope.editContact = function(id) {

		console.log('Edit contact :' + id);


		$http.get('/contactlist/' + id).success(function(response){
			console.log('Got contact details');
			console.log(response);

			$scope.contact = response;

		});
	};

	$scope.updateContact =  function() {

		console.log('Edit contact :' + $scope.contact.name);

		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {

			console.log('Got contact details');
			console.log(response);

			refreshContactList();
		});
	};

	$scope.clearContact =  function() {

		$scope.contact = "";
	}
});