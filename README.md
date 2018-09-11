# Bacteria Speciation Website

Hello! Welcome to our website! This is where we will be hosting our bacteria speciation project for the world to test against.

## Technologies
  - node.js
  - AngularJS
  - Bootstrap
  - (HTML/CSS)
  - Magic

## The File Structure
An overview of the file structure once the server is deployed. Tree outlines important files only. Files marked `***` are not shipped and instead pulled dynamically at init or
```
.
+-- .ebextensions 			// a hidden folder, must be named this to be found by AWS
|   +-- 01run.config 		//echos `ebextensions ran` you can search for in launch logs 
|   +-- 02commands.config	// tells launch scripts to run 'init.sh'
+-- app.js					// the server
+-- build.sh				// compiles the project
+-- efs				// short for 'elastic file system'. legacy name, AWS EFS is not used.
|   +-- progs				// all programs that are called are stored here.
|   |   +-- mafft
|   |   +-- usearch
|   |   +-- etc.
|   +-- results				// the location of the 'database' to compare against.
|   |   +-- Acetobacter_pasteurianus // *** database is dynamically loaded, ships empty.
|   |   +-- etc.
|   +-- uploads				// the location of the comparison files
|   +-- ConSpeciFix			// *** cloned from github on deployment
|   +-- ExploratoryPhase 	// *** cloned from github on deployment
+-- engines					// holds the first code we run that is not node.js
|   +-- go.py				// kicks off the whole comparison or exploration process.
+-- graphAnalyzer 			// holds http://www.conspecifix.com/graphAnalyzer
+-- index.html				// the website parent page.
+-- init.sh					// initializing script run at server launch
+-- package.json			// tells AWS dependencies for server.
+-- res						// pictures, example output, etc.
+-- uploads					// the first destination of all uploaded files.
+-- webapp.css/js			// javascript and css files for website.
```

## Setting up the Server

An overview of how to deploy the server to AWS, and special notes about configuration that have been modified from vanilla elastic beanstalk.
1. From the `app` directory, run `./build.sh`. This script gathers together the necessary files from the app folder, zips them together, and places the completed build in the `dist` directory, titled with a timestamp.
2. Upload the zip file to the ConSpeciFix environment via the "upload and deploy" button. This kicks off a large chain of automated steps:
	-  The application is loaded onto an AWS node.js server instance
	- `app/.ebextensions/02commands.config` tells AWS configuration settings to run `app/init.sh`. When `init.sh` is run, the application exists at the file path: `/tmp/deployment/application/`. 
	- `init.sh` begins by cloning the most up-to-date versions of the github repo and installing all necessary software. It also marks the `efs` directory as usable by all user-groups, allowing processes started  by node.js to run the scripts we just cloned.
	- The project is moved by AWS launching scripts to `/var/app/current/`
	- the node.js server is started and is hooked up to listen to ports connecting the server to the `www.conspecifix.com` website.

## A Walkthrough: Calling a Comparison
A step-by-step guide to how a comparison is launched.

1. The form is filled out in `app/home/home.html`. This form connects to the angular variables through `ng-model`, the current state of the form item, as well as `ng-disabled` and `ng-click`, which determine actions of when the item is disabled and what function to call when it is clicked.

2. The angular logic behind `ng-model` and `ng-click` is defined in `app/home/home.js`. The important parts of this file are `$scope.uploadFile = function() {` where we define what happens when a user uploads their file. First, we create a `FormData()` object and append all of the relevant fields from the angular model (`$scope.email`, etc.). Second, we send this form via an XMLHttpRequest to the server in the last two lines:
```
xhr.open("POST", "/upload")
xhr.send(fd)
```

3. The nodejs server in `app/app.js` receives the request near the logic `request.method==="POST"` and `request.url === "/upload"`. Here, we receive the incoming form and place the file from it into `app/uploads/<timestamp>/`. We then start `app/engines/go.py` making sure to give it through parameters some user information.

4. `app/engines/go.py` then begins to prepare for the comparison by unzipping the upload, renaming it, and moving it to the correct location. Here, the process begins to differ for a comparison versus an exploratory phase. Continuing on we will only look at the comparison.
5. `app/efs/ConSpeciFix/web/runner.py` is then called, properly initialized to run the correct files and uploads. 

## A note on site design

This Angular / Bootstrap website has two different layers:

 - `index.html` contains the "wrappers" on the website, including
   - the nav bar
   - the background image
   - the box that content appears in
 - Content pages, like the `home` page, `people`, `process`, etc. are all segregated into folders and related files.
