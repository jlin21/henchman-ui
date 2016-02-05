var myApp = angular.module('myApp', ['ansiToHtml']);

myApp.constant("HENCHMAN_API", {
  "url": "http://localhost:10010/v0/",
})

myApp.config(function($sceProvider) {
  $sceProvider.enabled(false);
});

myApp.controller('exampleController', function ($scope, $http, HENCHMAN_API, ansi2html) {
  $scope.filesList = {
    selected: { 
      name: "None",
      content: ""
    },
    files: []
  };
  $scope.fileOptions = {
    selected: "None",
    options: [
      "plans",
      "inventories",
      "tasks",
      "vars"
    ]
  };
  $scope.henchmanStdout = ""

  $scope.listFiles = function(fileType) {
    if ($scope.fileOptions.options.indexOf(fileType) >= 0)  {
      $http.get(HENCHMAN_API.url+fileType)
        .then(function(res) {
            $scope.filesList.files = res.data.files;
          }, function(errRes) {
            $scope.filesList.files = [];
            //print alert with message
        });
    }
  }
  $scope.getFileInfo = function(fname) {
    $http.get(HENCHMAN_API.url+$scope.fileOptions.selected+"/"+fname)
      .then(function(res) {
          $scope.filesList.selected.content = res.data.content;
        }, function(errRes) {
          alert(errRes.data.message)
      });
  }
  $scope.updateFileContent = function(fname) {
    $http.put(
      HENCHMAN_API.url+$scope.fileOptions.selected+"/"+fname,
      {content: $scope.filesList.selected.content})
        .then(function(res) {
            alert(res.data.message)
          }, function(errRes) {
            alert(errRes.data.message)
        });
   }
   $scope.executePlan = function(planName, invName) {
     var getQuery = HENCHMAN_API.url+$scope.fileOptions.selected+"/exec/"+planName+"?inventory="+invName
     $http.get(getQuery)
      .then(function(res) {
          $scope.henchmanStdout = convertToHtml(res.data.message)
        }, function(errRes) {
          alert(errRes.data.message)
      });
   }
   var convertToHtml = function(message) {
      newStr = message.replace(/\r?\n|\r/g, '<br>')
      return ansi2html.toHtml(newStr)
   }
});
