angular.module('campingController', [])

	.controller('mainController', function($scope, $http, $filter, Campings) {
		$scope.formData = {};
		$scope.searchedText = '';

		Campings.get()
			.success(function(data) {
				$scope.campings = data;
			});
		$scope.createCamping = function() {
			if ($scope.formData.name != undefined) {
				Campings.create($scope.formData)
					.success(function(data) {
						$scope.formData = {};
						$scope.campings = data;
					});
			}
		};

		$scope.deleteCamping = function(id) {
			Campings.delete(id)
				.success(function(data) {
					$scope.campings = data;
				});
		};
        
        $scope.updateCamping = function(id, campingData) {
            Campings.update(id, campingData)
                .success(function(data) {
                    $scope.campings = data;
                });
        };

	});