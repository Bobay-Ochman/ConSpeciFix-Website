# Bacteria Speciation Website

Hello! Welcome to our website! This is where we will be hosting our bacteria speciation project for the world to test against.

## Technologies
  - node.js
  - AngularJS
  - Bootstrap
  - (HTML/CSS)
  - Magic

## Other thoughts
This Angular / Bootstrap website has two different layers:

 - `index.html` contains the "wrappers" on the website, including
   - the nav bar
   - the footer
 - Content pages, like the `home` page, `people`, `process`, etc. are all segregated into folders and related files.

This website was branched off of www.brianellissound.com, and thus was origionaly planned for launch using Amazon Web Service's Elastic Beanstalk. Several of the files (`init.sh`, `test.sh`, and `.ebextensions`) all refer to tests, initiation scripts, or configuration settings that are needed to run this website on EB.
