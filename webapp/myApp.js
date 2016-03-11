var myApp = angular.module('myApp', ['ui.bootstrap', 'ansiToHtml', 'angularResizable']);

myApp.constant("HENCHMAN_API", {
  "url": "http://localhost:10010/v0/",
})

myApp.config(function($sceProvider) {
  $sceProvider.enabled(false);
});

myApp.controller('exampleController', function ($scope, $http, $interval, HENCHMAN_API, ansi2html) {
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
  $scope.module = {
    list: ["shell", "yum", "rpm", "copy", "template", "curl"],
    selected: "Module"
  }
  $scope.henchmanStdout = ""
  $scope.isCollapsed = true

  $scope.listFiles = function(fileType) {
    if ($scope.fileOptions.options.indexOf(fileType) >= 0)  {
      $http.get(HENCHMAN_API.url+fileType)
        .then(function(res) {
            $scope.filesList.files = res.data.files;
            $scope.filesList.files.unshift("None");
          }, function(errRes) {
            $scope.filesList.files = [];
            alert(errRes.data.message)
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

  //adds task to existing plan
  $scope.addTask = function(task) {
    s = "    "
    taskStr = "  - name: " + task.name + "\n" + s + $scope.module.selected +": " + task.mod + "\n"
    k = Object.keys(task)
    k.forEach(function(key) {
      if (key != "name" && key != "mod") {
        taskStr += s + key + ": " + task[key] + "\n"
      }
    }); 

    if ($scope.filesList.selected.content.slice(-1) != "\n") {
      $scope.filesList.selected.content += "\n"
    }
    $scope.filesList.selected.content += taskStr
  }

  //plan creation and generation
  generatePlanTemplate = function() {
    template = "name: \"insert plan name\"\nhosts:\n  - insert host group\nvars:\n  key: val\ntasks:\n"
    return template
  }
  $scope.createPlan = function(fname) {
    $http.post(
      HENCHMAN_API.url+$scope.fileOptions.selected+"/"+fname,
      {content: generatePlanTemplate()})
        .then(function(res) {
            alert(res.data.message)
            $scope.filesList.selected.name = fname
            $scope.getFileInfo(fname)
          }, function(errRes) {
            alert(errRes.data.message)
        });
  }
   var henchStatus = 0
   $scope.executePlan = function(planName, invName) {
     var getQuery = HENCHMAN_API.url+$scope.fileOptions.selected+"/exec/"+planName+"?inventory="+invName
     $http.get(getQuery)
      .then(function(res) {
          $scope.henchmanStdout = ""
          henchStatus = 1     
          console.log("started")
        }, function(errRes) {
          alert(errRes.data.message)
      });
   }
   var convertToHtml = function(message) {
      newStr = message.replace(/\r?\n|\r/g, '<br>')
      return ansi2html.toHtml(newStr)
   }

   // gets the stdout print out every second
   var getStdout = function() {
      var getQuery = HENCHMAN_API.url+$scope.fileOptions.selected+"/exec"
      if (henchStatus == 1) {
        $http.get(getQuery) 
          .then(function(res) {
            $scope.henchmanStdout = convertToHtml(res.data.message)
            henchStatus = res.data.status
            parseStdout()
          }, function(errRes) {
            alert(errRes.data.message)
            henchStatus = 0
          });
      }
   }
   $interval(function() {getStdout()}, 750);

   // parses stdout to get task data
   $scope.tasksList = [] 
   $scope.selectedTask = {"name": "", "data": [], "isSelected": false}
   parseStdout = function() {
      $scope.tasksList = []
      var strList = $scope.henchmanStdout.split("<br>")
      for (i = 0; i < strList.length; i++) {
        item = strList[i]
        if (item.search("TASK") >= 0) {
          taskItem = {"name": "", "data": []}
          // grabs the task name of the task
          taskItem["name"] = item.split(/\[(.*?)\]/)[1].split("|")[0]
          for (j = 1; j+i < strList.length ;j++) {
            item2 = strList[j+i] 
            // isolates only the host and state line
            if (item2.search(/(SHELL)/) < 0 && item2.search("=>") >= 0) {
              //removes uncessary messages and leaves host,span,state
              hostData = {}
              if (item2.split("=>")[0].search("skipped") >= 0) {
                res = item2.split("=>")[0].split(/\[(.*?)\]/)
                hostData["host"] = res[1].trim()
              } else {
                res = item2.split("=>")[0].split(/(<.*?>)/)
                hostData["host"] = res[0].replace(/[\[\] ]/g, "")
              }
              hostData["state"] = res[2].trim()
              hostData["color"] = setColor(hostData["state"])
              taskItem["data"].push(hostData)
              setSelectedTask(taskItem)
            } else if (item2.search(/(TASK|PLAN STATS)/) >= 0){
              break
            }
          }
          $scope.tasksList.push(taskItem)
        }
      }
   }
   setSelectedTask = function(task) {
     if (!$scope.selectedTask.isSelected) {
       $scope.selectedTask.name = task.name
       $scope.selectedTask.data = task.data
     }
   }
   setColor = function(state) {
     if (state == "ok" || state == "changed") {
       return "green-circle"
     } else if (state == "skipped") {
       return "grey-circle"
     }

     return "red-circle"
   }
 

});
