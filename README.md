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


----------


Construction and modification of plans, inventories, task, and vars files is self explanatory as why it's needed in this UI.  Here is what a base of what the UI looks like, this feature is promptly located on the right hand side and the area to modify text is located in the center.

![base](https://lh3.googleusercontent.com/gNwctkuAXidcNUXvNlC1VlEO7_BLTs6xE58_L29ojNKZlJHWn0b790q6eJ8wMlxFai3Y=s0 "base.png")


----------


The henchman output box is directly under the general text edit area.  This output allows users to see what the output of the henchman executable is.

![henchman-output](https://lh3.googleusercontent.com/z-N6Iz2H0tVysPLoYhWXGsydRtOZm2pVfqwIYre6FFYtsjNNDONQooVKmoN5uav5T5B_Z8qaeP_v_O_auLWu2zj164-K_-7ZR9duMPhNCpDNQ54Z9rS_z9LFEz1YhfxLq0NQSEcYHB2jNXj5fJ_Rfd83Fe7CM8myeyKLqiRIuJq6JeXs1lItdx92m3BMbbZ5m_52reiFFkNZ4BwegjMYszaVVTCBHH4vxHO2F86qczDoyMX4R7OVCoHmE9swkiRoG4-Hz3K6nadr7d3A6iCasJIVaLzqluDKllZKYAT0LNJozK3DeQaQ96tSG3YSI-7zq1FWwFJNfEMVne14O67tSnhouzQKkuKtTlwFt5zpc4NFjZzeL_w_gk6suPbd_ZVduR6vm1JXW9aY-ZGOAd6DQPEQEfXh3kt0oeCDC3NfAr_NeuyfgupFRhbyLNN0lR9V8VzmSI5tt4OFvjLI8ldXKlhsvfBgh9-8RUrUd5BekkP4osdExjVdlSF576weUD4VFXjLkK83ZfxhXdUlQwPaLBB5u4BphVfs0SBBxrZ1hgl78Pmgsqoep1fNp3LbKC9C_CrK=w1438-h781-no)
 


----------


The plan setup wizard helps users generate plans by creating a skeleton with common fields.  In addition, there is also a task generator which helps users create tasks by allowing to see the supported fields without viewing the documentation and the available modules.  The purpose of this wizard is to help users get an idea of what a plan and task list should look like.

Users can create a file when "None" is selected.

![base](https://lh3.googleusercontent.com/CqPPbwUUkggAyeWmgDH0rUXowcyD8fpwTsMpp2IW-dL0RaDCY45OUQjp1znEYvSXvxah_Cj-kUcbuxs7rBnUBcUPZZkSTXyFMkhGnynVbvegwaT03OoTvP3e8FlyNBr6Dh2GeTSemTy36M2R2lgAS5gZ_wAGCMVrIAVcriJW4Dy803UGLeVfDFPWcoqpEXfSP38rhMRzDQXwVTSMcI7xPxT7pQu3uAjzUNT51N7wWVoOIlG13j1B13hY5DHvzsu5eUZ7sVD67gwa7Zh4ke9yEq2n8C5Iy3Wr6juxQJDqMxMhmtglhLq7YJ39OBooFCFpLRiMMha5dxdSW8FaJFyPyfaBF60THx7PHQokbv5w5X5qktNz2rHBuFdcy1jCX8abszlBN5-pdDFY8EFZrkr1rIojd3357_aDXsmlujizzMiJEFnsg-0rQmd2jdn9ONrlpi6ceAXPsde2Ybh6U0KnBvEdGZaxyG0l6e6jXqku5spe1IXCSWWOgnXXRUF_9xEaISgQZ_oXXL_Sl1oVdc_ymvuJRgsSuOkb_Ca2J0UW21NCjWYIdVLRglCXmQ6hgH09qGj8=w1359-h647-no)

<br>
After creating a file a skeleton of a plan file is created

![base](https://lh3.googleusercontent.com/M2PEBm6NDmxda9mfMSLnYFMR8dvkIy09IU0tEY6lHaVxQTFoPNDt4JfmIcOLIbCgTuTnWVO4s270ALK0DskUmva3wm1BKNQL7yYlrPPJJhcZ3gzP97zWdpG1BEOU_o_xcrDQSPUqdmJNaFRJk3sZQa0cGNnWKVJLs_crYvbo9CoenBDoPwhYUH2iVV5EEXZE7f_7buKWUhdaL0H35N7xJfR5-lu_ZjM_PTfh0TsslkEvqNQfNF2-SVzOEUv2aMkvyP7f6gSHMSkJflh152vWl59_jFhB59km6iYQJcDVwqXqa-vf15mALJN5rvzL9ncT5GCs2uJFjtDX-g_UpKfMcJ6gNb_Cgwz2UWob6htF5POB2IYDFjuyn0Dqg5oSV8eG85n-BrKsfR3tIykwnhH3EEY_6NSBntxI-Bx8hLtoxfHwSwWqgS8S4fmKq7JC27ZExZ9WwwLPt8TixOkUyQXItI8PG6X1LGKbKn3sHM-fM2G3BmC0VjXWUOmglbwWr5hK-SuSfyZzMZRhr3Fm5vFo9ZVm-Uro9vM8jiKfhqdeEjwB8oUVD5Ngcpsz3T4JZ4HUsFgh=w1359-h649-no )

<br>
Users can insert a task by selecting "Toggle Add Task" and proceed to fill in the task parameters.

![base](https://lh3.googleusercontent.com/k23fsc-Vir-upbDeI13IyAkEOYBfrHdhx8CHuqXOS8GZlBxMzB9O15O9je02VrA4G2jT7uryBpt-L2Egb4iQXSmclVBL5N2jYJm6sDyl5Y1RHGURLQ1GWux2LdyWtt3b54My4wzHovS3VN4jL925WaBkC6bplEFW8D9jYD94RfoqDq1Ko_FTuYEA6PGCYPShN_zPGNxrs9H5_UPT7ru5ctQTecOqIDhODC50yV9wdJdGaai1MfoG3of1w63E9fC-najNlzOSMvkX5XaMFMsuAF5hyNvKXUrecSk5nrOg0dVIIMpWNvFZt4sSbtu7rtZ4jVLrwlFi6mvISjt1ytBz_W7NMKnczaD7vtfT3Gp88HvjnU_5DNFXiuaaBKJz4A1P_Y9PIky2plVkY8AgtxuplOekHBNFOqNdE273AEIxwOzte2rH0kSuUii6__w4wGC1k5Sx6Xn3mhadUliuQi-b74ICV0mE3pvZ_meMB22UKTfL5dReeAYVsxjMASBxKAhDGajRZqCu_-s-TNasBYKotS4T_MibXfZxOpmk93soupLcLMk9GNcVyIp08dw6GZLhWj_v=w1358-h646-no )


----------


The task status bar allows the user to see the status of each machine related to the current task running or the tasks that have already completed running.  This allows the user to see the status of their plan without having to scroll through the output.  The output of henchman can be quick and may contain long messages at times.

<br>
Users will see the most current running task and the status of each host.  The statuses are represented by 3 colors: red (failure or error), green (changed or okay), and grey (generally skipped).  In addition, they can also view the states of previous tasks by selecting them in the drop down menu.

![](https://lh3.googleusercontent.com/mQYuLchT6rUwwB5CjwFY1Ldo02Uj1-9mUVhc27QT-KJbK4WLQQ7KM_4n3M28s7iIZ85YQmDgwWaQbufO2aX4aNHHlowo6HckCZzTUjHL7QMpyrD0Ta9Z-tMRbIC13zXD_Gm2t9-bbf5uIV0sIcfYsejxvL1vvaY5lA6kPPdkSgcCajI0u2by45xLeAx00eOzt3wlII25QFQNw0f3mmmvljh_jgl6mC2GL20k8t_jYN-Zcuoe_SfKnPpJQJwnwqCwGZCsCzh29a7AV2QByM1YAXGkjr1in18v5jhfczllI5qbZ77WroEaziaDyRqvbaMYD0lkp5rpDCpQRc52KUWu6xw92GV-k-dmMXTLBS-8YyeNHI3BHdAd0-JXnLbW6dmnsAZM1fpGvJ_3TPNnEpfwPX5DAhs6W13IwjDTr1llS2BrYBh3Qz3Y-X1oTF8L5qDdHbhsS9ymvAhpgQGgwOBKH0pSY8gXU8ogwX_0mpwkG_4BAUMAgiULQdrugIQUyXtRFIdmuoVsd2lpJ_RKeeL0lWWUnDoq_twXXZBgREjnCBkNK7KTPoKh9pyovVkhbG8J_kID=w1440-h782-no)

<br>
You can highlight a colored circle to see which host contains that status
![](https://lh3.googleusercontent.com/6Nii-0ViJVKHnm5KHzDaQAYWOkMra2MxMUOuoUv8mR_Iy8BxveALpg5ADDcGU9Iq8jm6pGYZjouuxrrXYmF7hiaJvdh2VcQWEAIvAr6OIDXFvxE3IHlmyDx7a2pB_oisVkU3tWxPvW94ZK7EPZxyOW6fYyVC47PF3ozkA8fHmVXyTruCz7cB8cEjNgd-9nNQ_QxKM1jkzIh0dg4Bg8L8JXTwLtrawYRwBAvk3ba1xCkHVHhGRETXMzoKlFCA-fxurQVTiWzDAaKlhhHRcXq-alb1EPYUTIjD1x6zLlttefZpyvC-bszo38MVKDAsOEna2Fkhdmqm8FjY7dXyGByds41wlbRGRI86lZe_C9HT5iGuh4gmLqZ3k7oWwMtTfkbhDL0Ko--0EdhGyM_TZSue74adY0Ym66SQ3ERLu0eDj7r3vT6S5oZx2G0D3VG7g_x4MxrrCQhfmeQ8hi_yNfh1kKQdlZiD__p-DZTErmMcXMuv1AdS2BA644tGMHpL-X2qy8_8bQrFY7iKsjW6Amc1eYYsowZJuEohRI6W87Siv8JHQTr-9sE8l3u6kXTFcvqJWCYI=w1440-h784-no)


----------


####To do

 - Find better placement of features
 - Spice things up with better css and js libraries

----------

Contributing
---------------
To contribute finish off anything in the To Do section of the components.  Better yet, create your own UI with the feature set described above in mind!
