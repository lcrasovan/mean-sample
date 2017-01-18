angular.module('campingService', [])
	.factory('Campings', function($http) {
		return {
			get : function() {
				return $http.get('/api/campings');
			},
			create : function(campingData) {
				return $http.post('/api/campings', campingData);
			},
			delete : function(id) {
				return $http.delete('/api/campings/' + id);
			},
			update : function(id, campingData) {
				return $http.put('/api/campings/' + id, JSON.stringify(campingData));
			}
		}
	});