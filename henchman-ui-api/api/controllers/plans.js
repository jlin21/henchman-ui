'use strict';

var util = require('util');
var config = require('config');
var fs = require('fs');
var plansDir = config.get("henchman.plans")
var invDir = config.get("henchman.inventories")
var modDir = config.get("henchman.modules")

module.exports = {
  listPlans: listPlans,
  getPlan: getPlan,
  putPlan: putPlan,
  postPlan: postPlan,
  deletePlan: deletePlan,
  execPlan: execPlan,
  getExecStdout: getExecStdout
};

function listPlans(req, res) {
  var files = fs.readdirSync(plansDir)

  res.status(200).send({'files': files})
}

function getPlan(req, res) {
  var fname = req.swagger.params.file.value
  var content = fs.readFileSync(plansDir+fname, "utf8")

  res.status(200).send({'content': content})
}

function putPlan(req, res) {
  var fname = req.swagger.params.file.value;
  var path = plansDir + fname
  var content = req.body.content;

  fs.access(path, fs.F_OK, function(err) {
    if (err) {
      return res.status(400).send({'message': util.format("'%s' in '%s' does not exist, use post to create file.", fname, plansDir)})
    } else {
      fs.writeFile(path, content, function (err) {
        if (err) {
          return res.status(400).send({'message': err})
        }

        res.status(200).send({'message': util.format("Successfully updated '%s' in '%s'", fname, plansDir)})
      })
    }
  })
}

function postPlan(req, res) {
  var fname = req.swagger.params.file.value;
  var path = plansDir + fname
  var content = req.body.content;

  fs.access(path, fs.F_OK, function(err) {
    if (err) {
      fs.writeFile(path, content, function (err) {
        if (err) {
          return res.status(400).send({'message': err})
        }

        res.status(200).send({'message': util.format("Successfully created '%s' in '%s'", fname, plansDir)})
      })
    } else {
      return res.status(400).send({'message': util.format("'%s' in '%s' exists, use put to update file.", fname, plansDir)})
    }
  })
}

function deletePlan(req, res) {
  var fname = req.swagger.params.file.value
  var path = plansDir + fname;

  fs.unlinkSync(path)

  res.status(200).send({'message': util.format("Successfully removed '%s' in '%s'", fname, plansDir)})
}

var henchStdout = ""
var henchStatus = 0
var henchLock = 0
function execPlan(req, res) {
  var fname = req.swagger.params.file.value
  var planPath = plansDir + fname
  var inventory = req.swagger.params.inventory.value
  var invPath = invDir + inventory

  /*
  var exec = require('child_process').exec
  var cmd = util.format("./%s exec %s --inventory %s --modules %s", 
      config.get("henchman.exec"), planPath, invPath, modDir)
  exec(cmd, function(err, stdout, stderr) {
      if (err) {
        return res.status(400).send({'message': JSON.stringify(err)})
      }
      res.status(200).send({'message': stdout})
  });
  */
  if (henchLock) {
    return res.status(400).send({'message': 'henchman is running'})
  }

  henchLock = 1
  henchStatus = 1
  henchStdout = ""
  var spawn = require('child_process').spawn;
  var child = spawn("./"+config.get("henchman.exec"), [
    'exec', planPath,
    '--inventory', invPath,
    '--modules', modDir
  ]);

  child.on('error', function(err) {
      console.log('Failed to start child process.');
  });

  child.stdout.on('data', function(chunk) {
    henchStdout += chunk.toString()
  });

  child.on('close', function(code) {
    console.log(code)
    henchStatus = 0
    henchLock = 0
  });
  res.status(200).send({'message': 'henchman has started'})
}

function getExecStdout(req, res) {
  res.status(200).send({'message': henchStdout, 'status': henchStatus})
}
