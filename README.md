Henchman User Interface
===================

What is it
-------------

Henchman-ui is a web user interface for the orchestration and automation tool, Henchman (https://github.com/APIgee/Henchman).   This tool provides a RESTful API to utilize Henchman and a web application which uses the API.  

The API hosts various endpoints to create plans, inventories, and other necessary files used by Henchman.  It also has endpoints to run the Henchman executable. 

The web application is meant to be a vanilla user interface and an example UI for other developers.  It contains base features which are useful for a Henchman UI to have.

We'll go into more detail about specific components in the sections below.

----------


Purpose
-------------------
Currently, the only way to use Henchman is by using its command line interface (CLI).  Although the command line is the preferred method for many administrators, a visual user interface can provide more options and ease of use for administrators not familiar with a CLI.  Thus, the purpose of this project is to create a RESTful API for people to utilize Henchman, and an example UI to accompany it.  

----------

How to use
-------------
To use this tool make sure to have `npm` , `node.js`, and `swagger` on your system.  They are a multiple tutorials to install `npm` and `node.js` on the internet. Any of them will work as long as they are the right versions (check the component section for more information on versions).  `swagger` can be installed by following the setup instructions in the `swagger-node` package.  These instructions can be found by following the link in the "tools used subsection" located under "API".

After installing the tools run `npm install` in both the `henchman-ui-api/` and `webapp/` folders to get the necessary dependencies.  To initialize the API run `swagger project start` in the `henchman-ui-api/` folder, and to initialize the web application run `node server.js` in the `webapp/` folder.  In addition, it should be noted this repo contains a Henchman executable along with modules, plans, and inventories.  This ui is not dependent on which version of Henchman is being used, but previous versions of Henchman may require a different directory structure for the modules folder.

----------


Components
-------------
There are only two components to this tool, the web application frontend and the RESTful API backed.  The components are two separate services where the web application utilizes the API to use Henchman.  If the API was not running the web application would not be able to function.  Finally, looping back to the purpose, the web application is meant to be a vanilla example for people to get a grasp of how to use the API and what features may be good for a Henchman UI.

General tools used while developing both services

 - Javascript
 - Nodejs (v0.12.7)
 - Npm  (v2.11.3)


###Web application
------------------------
####Tools used

 - angular-js
 - bootstrap
 - html

####Overview
The web application is SPA with only one view, and is created using angular-js as the front end framework.  In addition it also utilizes vanilla bootstrap and the angular supported bootstrap module for css and js.  As mentioned before this application utilizes the Henchman-ui API to use Henchman, and contains features that are practical for a user interface meant for Henchman.

####List of features

 - Construction and modification of plans, inventories, tasks, vars files
 - Henchman output
 - Task status bar
 - Plan setup wizard

#####Construction and modification of plans, inventories, tasks, vars files
Construction and modification of plans, inventories, task, and vars files is self explanatory as why it's needed in this UI.  Here is what a base of what the UI looks like, this feature is promptly located on the right hand side and the area to modify text is located in the center.

![base](https://lh3.googleusercontent.com/gNwctkuAXidcNUXvNlC1VlEO7_BLTs6xE58_L29ojNKZlJHWn0b790q6eJ8wMlxFai3Y=s0 "base.png")


#####Henchman output
The Henchman output box is directly under the general text edit area.  This box allows users to see what is the output of the Henchman process.

![](https://lh3.googleusercontent.com/8BFvSD1fvfrSb__YUQibaico13pk31x0i7miCNYQlX54JTQRXoHsw8Zndzcg9jxTxUEy=s0 "henchman-output.png")

#####Plan setup wizard
The plan setup wizard helps users generate plans by creating a skeleton with common fields.  In addition, there is also a task generator which helps users create tasks by showing the supported fields without viewing the documentation and the available modules.  The purpose of this wizard is to help users grasp an idea of what a plan and task list should look like.

Users can create a plan skeleton file when "None" is selected.

![](https://lh3.googleusercontent.com/EQVGPdzhoygbluhrJ9gipinr9FWlHncckvt9o2vM6ukoMpYgka49DeuN_FtPFIaKJdV0=s0 "plan-create.png")

<br>
After creating a file a skeleton of a plan is created

![](https://lh3.googleusercontent.com/45erbGKjPMb2wcFqAlXZc9wMqRlLpT2GWhhILxwulsdZYkIUqJ2dqMqy84IIotJYjyyw=s0 "plan-template.png")

<br>
Users can insert a task by selecting "Toggle Add Task" and proceed to fill in the task parameters.

![](https://lh3.googleusercontent.com/Ld9tIh1bmW1kGD4BpT2XQfxemnCJr3ii6GC_KKqTNdTl8CZro3JJ4wcySH4p4pPjBZJ7=s0 "add-task.png")

#####Task status bar
The task status bar allows the user to see the status of each machine related to the current task running or the tasks that have already completed running.  This allows the user to see the status of the executed plan without having to scroll through the output.  The output of Henchman can be quick and may contain long messages at times.

Users will see a table including the task state of each host.  The statuses are represented by 3 colors: red (failure or error), green (changed or okay), and grey (generally skipped).  In addition, the tasks appear in the table in the order they were executed.

![](https://lh3.googleusercontent.com/u6wRVOhv9QIRBhdC5mIiz7CjRisZ7-pol6QgqmJTuA8vu-tTpA4qkM108TdHZtH3-NVD=s0 "task-status.png")

<br>
You can highlight a colored circle to see which host contains that status.

![](https://lh3.googleusercontent.com/Fuh6sG65v99qYR4Rns7a5zXNm_3lKHL5kW36u1r7QsjFQ4Kv8BKREbtybb4qM6JH-2Nq=s0 "status-hover.png")

----------

###API
----------
####Tools used

 - Swagger Node (https://github.com/swagger-API/swagger-node)
 - Henchman

####Overview

This API provides the essentials of what's needed to use Henchman:

 - CRUD options on plan, inventories, tasks, and var files
 - Executing Henchman and retrieving its output

To view each end point of the API go to  `Henchman-ui-api/` and run `swagger project edit`.   In addition, there is a configuration file in the `henchman-ui-api/` folder indicating where Henchman components can be accessed.  This file is a JSON formatted file and can be accessed at 
`henchman-ui-api/config/default.json`.

The image below shows the available endpoints in the swagger editor.  The `/inventory/{file}` endpoint shows supported HTTP methods. Note: the endpoints in the image are collapsed and a majority of them support multiple HTTP methods/CRUD options.

![](https://lh3.googleusercontent.com/rkHqruUX1-WTlZmevscVxWtDjuUCl9z2YAfMsOE2lU_xDTsyygm1TPJHyc6ecT3CivOe=s0 "endpoints.png")


####How to utilize the API
To utilize this API with other tools use the respective http libraries.  For example, in the web application angular's built in http module is used.  

A few examples will be provided below on how to access the endpoints and what response should received.

#####Retrieving contents of a file

This example shows how to retrieve the contents of a plan.yaml file.   To retrieve the the contents of a file the user puts the file name in the URL where `{file}` is.  An example being `localhost:10010/v0/plans/curlTest.yaml`.   After reaching this endpoint a JSON response following the response schema will be returned.

The figure below shows the swagger editor formatted version of the endpoint details.  Such as the expected request parameters and reponses.

![enter image description here](https://lh3.googleusercontent.com/zf_8ap3FeE2m0WUo9QGdWH5v9VljbMHF0yDPSDnK3U5bSr5Or2OPm_pI8qVRJ9Oho4I=s0 "plan-file.png")

<br>

The figure below shows the URL in the browser and the return object.  Notice the content field contains the information in curlTest.yaml

![enter image description here](https://lh3.googleusercontent.com/A2Gs8YqCYdtn3pSc7Bintn0WFErKOauRmHQZrDjGeuq4k52Z-TNXf2JQF5I1VmlreJ4=s0 "plan-file-return.png")

#####Executing Henchman and retrieving output

Executing Henchman and retrieving its output requires reaching two different URLs.  One URL is responsible for executing Henchman and will only return a message letting the user know if henchman has been run or another process is already running Henchman.  The other URL returns the output and the current status of the Henchman process.  In addition, only one henchman instance can be run at a time.   This limitation will be addressed in a section labeled "Limitations, proposed solutions, and insights".  Note: To check if another instance can be run hit the endpoint which returns the output and status.

The examples below will show how to execute henchman and retrieve its output.  curlTest.yaml and testInventory.yaml will be used and is provided as a resource in this repo.

######Executing henchman
Here is an example of the URL executing curlTest.yaml with testInventory.yaml: `localhost:10010/v0/plans/exec/curlTest.yaml?inventory=testInventory.yaml`
By going to that URL Henchman will be executed and a message will confirm or deny if Henchman has started.  If another instance of Henchman is running the message will let the user know accordingly.

The figure below shows the request parameters and response schemas for this URL.

![enter image description here](https://lh3.googleusercontent.com/N3XBxM4JcqtQrbmYJfEw52Uu2PlkynUkFGM9GpMiTSavvSlmc316KTgIqvCELUZOPrY=s0 "plan-exec-file.png")

<br>

The figure below shows the URL in a browser and the response JSON.  The response object contains a message confirming henchman has started.

![](https://lh3.googleusercontent.com/9x1xkSsE60ndfGjfDqD_XfbWQ9LuQzWkh6nyW_WofA6eK2JKlWLRmWii-Rgnyx02gqI=s0 "plan-exec-file-return.png")
<br>

######Retrieving output
To retrieve the output of the running Henchman process go to `localhost:10010/v0/plans/exec`.  The URL will return the current stdout and the status of the process.  If status is 0 then the process is finished and no other extra stdout information will be returned.  If the status is 1 then the process is still running and calling the URL again will return an updated output in the message field.

For example after executing Henchman, the user would constantly poll the URL above until status reaches 0 to get a live stream of what the stdout is.

The figure below shows the request parameters and response schemas for this URL.

![](https://lh3.googleusercontent.com/GhEfM61gPtR1Zrx8WaSWK60h_Xbqdv_R9DghsoIws3o5mCCk4DbK77E-ZhLYE9DMoWo=s0 "plan-exec.png")

<br>

The figure below shows the URL in a browser and the response JSON.  The response object contains a message with the completed output of the process and a status message indicating henchman is done and a separate henchman process can be run.
 
![](https://lh3.googleusercontent.com/6ZDGjF8WOh0mnQQI53wkMRY-zRhuTaZEwI0CdX7d1ff5TImMoyXXj-UABQRFRM7f4tE=s0 "plan-exec-return.png")

####Design Choices and Insights
#####Why Swagger?
This API is created using Swagger-Node so I'll discuss why I chose to use Swagger over other tools.  Swagger is an extremely useful tool to create RESTful APIs.  It sets up the "server" side of things such as routing and exposing endpoints.  The developer is responsible for creating the logic when such endpoints are accessed and creating the documentation for each endpoint.  One of the main reasons for using Swagger is it requires the user to document first before creating the endpoint logic.  What this means is the user has to create the URL, write out the supported parameters for each endpoint, and detail the response schema (such as a JSON object with certain fields).  For example, the `plan/{file}` has a file parameter in the path and returns a JSON object with a contents field. In addition, Swagger validates that the logic in the controller follows the schema the developer laid out beforehand (e.g the 200 response code has a content field and is a JSON object).  Basically Swagger takes out the headache of hosting an API and allows the developer to focus on developing the API!

#####Limitations, proposed solutions, and insights
As mentioned above a limitation with this API is that only one Henchman process can be run at a time, and there is a general endpoint to retrieve the output and status of any Henchman process.  If users wanted to start another process it could not even be put into a queue.  There are other factors to this limitation such as if the server hosting the API is capable of running more than one Henchman process at a time.

However, a solution to this limitation is having a queueing system in place (this would have to go into the controller and model logic).  When the server receives a request to run a Henchman process it should place the process into a queue to be run after the currently running process, or (if the system allows) run it in parallel.  In addition, the response schema should contain a message notifying the user if the process is running or in queue, and a unique index to query the current status of the process.  The URL to retrieve the output and status of the Henchman process should be changed from a single bottle necked location of  `localhost:10010/v0/plans/exec` to `localhost:10010/v0/plans/exec?index=some_num`.   This way the user can check the status and output of any Henchman process.


----------

Contributing
---------------
There are some pending tasks which need to be completed for both the web application and API;  however, the best way to contribute is to create your own UI with the feature set described in the web application section in mind!

Here are some pending tasks for each component
#####Web application tasks

 - Find better placement of features
 - spice things up with better css and js libraries

#####API tasks

 - Finish endpoints for tasks and vars
 - Add options as params for Henchman executable
 - Apply queuing system and update URLs
