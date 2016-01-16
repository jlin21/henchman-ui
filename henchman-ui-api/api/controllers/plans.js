'use strict';

var util = require('util');
var config = require('config');
var fs = require('fs');
var plansDir = config.get("henchman.plans")

module.exports = {
  listPlans: listPlans,
  getPlan: getPlan,
  putPlan: putPlan,
  postPlan: postPlan,
  deletePlan: deletePlan
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
