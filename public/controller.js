// angular.module('planet',['ngRoute']);

//     app.config('$routeProvider',function($routeProvider){

    
//       .when('/',{
//         templateUrl:'home.html',
//         controller:'homeController'
//       })
//       .when('/hai',{
//         templateUrl:'signup.html',
//         controller:'signupController'
//       })

//     });



(function() {
    'use strict';

    angular.module("planet", ['ngRoute'])
        .config([
            '$routeProvider',
            function($routeProvider){
                $routeProvider
                   .when("/", {
                        templateUrl: "home.html",
                        controller: "homeController"
                    })
                    .when("/signup", {
                          templateUrl:'signup.html',
                          controller:'signupController'
                    })



            }
        ]);
})();

		




