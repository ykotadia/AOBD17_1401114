 var countryApp = angular.module('myApp', ['ui.bootstrap']);
      function AutoCompleteController($scope, $http) {
 
            $http.get('/search').success(function(response){
                  $scope.items=response;
            });
            $scope.skills=["TOP RECOMMENDED SKILLS FOR ANY JOBS","Communication","Teamwork","Negotiation and persuasion","Leadership","Organisation"," Perseverance and motivation","Ability to work under pressure"," Confidence","Commercial awareness "];
      
                  $scope.addCtrl=function(){
                        var job=$scope.search.job;
                  job=job.trim();
                  $http.get('/jobs/'+job).success(function(response){
                                    $scope.skills=response;
                                    });
                  $scope.job="";
       };
}
