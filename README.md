Henchman User Interface
===================


What is it?
-------------

Henchman-ui is a user web interface for the orchestration and automation tool, Henchman (https://github.com/apigee/henchman).   This tool provides an restful API to utilize Henchman and a web application which uses the API.  We'll go more into detail about specific components in the sections below.

The API hosts various end points to create plans, inventories, and other necessary files used by henchman.  It also has end points to run the henchman executable. 

The web application is meant to be a vanilla user interface and meant to be an example UI for other developers.  It contains base features which are useful for a henchman UI to have.

----------


Purpose
-------------------
Currently the only way to use henchman is through the command line.  Although the command line is the preferred method for many administrators, visual user interface can provide more options and ease of use for administrators not familiar with a CLI.  Thus, the purpose of this project is to create a restful API for people to utilize henchman, and an example UI to accompany it.  

----------

How to use
-------------
To use this tool make sure to have npm and nodejs on your system.  After installing both tools go into the `henchman-ui-api/` and `webapp/` folder and run `npm install` to get the necessary dependencies.  To initialize the api run `swagger project start` in the `henchman-ui-api/` folder, and to initialize the web application run `node server.js` in the `webapp/` folder.  In addition, it should be noted that this repo contains a henchman executable along with modules, plans, and inventories.  This ui is not dependent on which version of henchman is being used, but previous versions of henchman may require a different directory structure for the module folder.

----------


Components
-------------
General tools used

 - Javascript
 - Nodejs (v0.12.7)
 - Npm  (v2.11.3)

###API
----------
Tools used

 - Swagger Node (https://github.com/swagger-api/swagger-node)
	 - make sure to have swagger installed before continuing
 - henchman

This restful API was created as a separate restful service so users could create other user interfaces to utilizes this api without needing to know how other web application interacted and utilized henchman.  

This API provides the essentials of what's need to use henchman which is:

 - Creation, deletion, and modification of plans, inventories, tasks, and var files
 - Executing henchman

To view each end point of the api go to  `henchman-ui-api/` and run `swagger project edit`.   In addition, there is a configuration file in the `henchman-ui-api/` folder which indicates where the henchman components can be accessed.  This file is a JSON formatted file and can be accessed at `henchman-ui-api/config/default.json`.

####To do:

 - Finish endpoints for tasks and vars
 - Add options as params for henchman executable

----------


###Web application
----------
Tools used

 - angular-js
 - bootstrap
 - html

The web application is SPA with only one view, and is created using angular-js as the front end framework.  In addition it also utilizes vanilla bootstrap for css and js, and the angular supported bootstrap module.  As mentioned before this application utilizes the henchman-ui api to use henchman, and contains features that are practical for a user interface meant for henchman.

These are the current list of features

 - Construction and modification of plans, inventories, tasks, vars files
 - Plan setup wizard
 - Task status bar
 - Henchman Output

Construction and modification of plans, inventories, task, and vars files is self explanatory as why it's needed in this UI.  Here is what a base of what the UI looks like, this feature is promptly located on the right hand side and the area to modify text is located in the center.

// image goes here

The henchman output box is directly under the general text edit area.  This output allows users to see what the output of the henchman executable is.

// image goes here

The plan setup wizard helps users generate plans by creating a skeleton with common fields.  In addition, there is also a task generator which helps users create tasks by allowing to see the supported fields without viewing the documentation and the available modules.  The purpose of this wizard is to help users get an idea of what a plan and task list should look like.

// images goes here

The task status bar allows the user to see the status of each machine related to the current task running or the tasks that have already completed running.  This allows the user to see the status of their plan without having to scroll through the output.  The output of henchman can be quick and may contain long messages at times.

// image goes here

####To do

 - Find better placement of features
 - Spice things up with better css and js libraries

----------

Contributing
---------------
To contribute finish off anything in the To Do section of the components.  Better yet, create your own UI with the feature set described above in mind!
