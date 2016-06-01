myApp.config(['$stateProvider', function($stateProvider, $urlRouterProvider, $authProvider) {

	$stateProvider
	.state('login', {
		url: '/',
		templateUrl: '/views/pages/login.html',
		controller: 'mainController',
		data: {
          pageTitle: 'MyApp - Login'
        },
		resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
	})
	.state('dashboard', {
		url: '/dashboard',
		templateUrl: '/views/dashboard.html',
		controller: 'dashboardController',
		data: {
          pageTitle: 'MyApp - New Dashboard'
        },
		resolve: {
          loginRequired: loginRequired
        }
	}).state('contatos', {
		url: '/contatos',
		templateUrl: '/views/pages/contatos.html',
		controller: 'mainController',
		data: {
          pageTitle: 'MyApp - Contatos'
        },
		resolve: {
          loginRequired: loginRequired
        }
	});

	function loginRequired($q, $location, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.resolve();
		} else {
			$location.path('/');
		}
		return deferred.promise;
    }

    function skipIfLoggedIn($q, $location, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.reject();
			$location.path('/dashboard');
		} else {
			deferred.resolve();
		}
		return deferred.promise;
    }

}]);
