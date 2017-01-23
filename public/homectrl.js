app.controller('homeController',function($scope,$http){

    

			function getalerts(){
         $http.get('/detail').then(function(response){
        console.log(response.data);
        $scope.details=response.data;
      });
      }


     getalerts();


      $scope.submit=function(){
        console.log($scope.newalert);

        $http.post('/detail',{newalert:$scope.newalert}).then(function(){
          getalerts();
          $scope.newalert='';
         })
     };


      $scope.removeit=function(msg){
         $http.put('/detail/remove',{x:msg}).then(function(){
          getalerts();
          });
    }
});