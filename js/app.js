var app = angular.module('app', ['ui.router', 'ui.bootstrap',require('angular-sqlite')]);
 app.constant('DB_CONFIG', {
        users: {
           
            first_name: { type: 'text', null: false },
            last_name:{type:'text'},
            email: { type: 'text' },
            password:{type:'text'},
            phoneNumber:{type:'integer'},
            gender:{type:'text'}
        },
        users1:{
          first_name: { type: 'text', null: false },
            last_name:{type:'text'},
            email: { type: 'text' },
            password:{type:'text'},
            phoneNumber:{type:'integer'},
            gender:{type:'text'}
        }
    })
    .run(function ($SQLite) {
        $SQLite.dbConfig({
            name: 'chakri-db',
            description: 'Test DB',
            version: '1.0'
        });
    })
  .run(function ($SQLite, DB_CONFIG) {
        $SQLite.init(function (init) {
            angular.forEach(DB_CONFIG, function (config, name) {
                init.step();
                $SQLite.createTable(name, config).then(init.done);
                console.log(name);

            });
            init.finish();
        });
    });

 app.config( function( $stateProvider, $urlRouterProvider) {
       $stateProvider
           .state('login', {
               url: '/',
               templateUrl: 'loginpage.html',
               controller: 'loginController'
               
           })
            .state('forgot', {
               url: '/',
               templateUrl: 'reset-password.html',
               controller: 'resetController'
               
           })
           .state('register', {
               url: '/register',
               templateUrl: 'registrationpage.html',
               controller: 'regisController'
               
           })
           .state('home', {
               url: '/home',
               templateUrl: 'home.html',
               controller: 'homeController'
             
           })
            .state('profile', {
               url: '/profile',
               templateUrl: 'profile.html',
               controller: 'profileController'
               
           });
      $urlRouterProvider.otherwise("/");
});
 app.controller('loginController',function ($scope,$location,$SQLite){  
          $scope.loginVal = function(login){
          
      
       $SQLite.ready(function () { // The DB is created and prepared async. 
        this
            .selectAll('SELECT * FROM users ')
            .then(
        function () { 
        	console.log('Empty Result!');
        	 },
        function () {
      //  console.err('Error!');
          },
        function (data) {
          for(var i=0;i<data.rows.length;i++){
          if(login.email==data.rows[i].email && login.password==data.rows[i].password){
            $SQLite.insert("users1",data.rows[i])
          console.log(data.rows); 
          $location.path("/home");
        }
      }
  			});
    });
          			 
          			 
           };
         });
   app.controller('regisController',function ($scope,$location,$SQLite){  
                   $scope.save=function(customer){
                $SQLite.ready(function () {
        this.insert('users', customer) // this.replace 
            //.then(onResult, onError) 
    });
            $location.path("/");
        }
     });
   app.controller('profileController',function($scope,$SQLite,$location){
        
        $SQLite.ready(function () {
         // The DB is created and prepared async. 
        this
            .selectAll('SELECT * FROM users1 ')
            .then(
           function () { 
          console.log('Empty Result!');
           },
         function () {
      //  console.err('Error!');
          },
          function (data) {
          for(var i=0;i<data.rows.length;i++){
          var customer=data.rows[i];
          $scope.customer=customer;
          // console.log(data.rows); 
          // $location.path("/home");
       $scope.updateCustomer=function(customer){
          $SQLite.ready(function(){
            this.insert('users',customer)
            $location.path("/home");
          })
        }
      }
    }
        );
   });
      
   });
app.controller('homeController',function($scope,$location){
  $scope.logout=function(home){

        $location.path("/");
     }
});