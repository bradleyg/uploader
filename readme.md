[![Build Status](https://secure.travis-ci.org/bradleyg/uploader.png)](http://travis-ci.org/bradleyg/uploader)  
  
This uploader application is a HTML5 only file sharing platform. Currently only browsers which support the [File Reader API](http://www.html5rocks.com/en/tutorials/file/dndfiles/) will work (Chrome and Firefox).   

The application uses [jquery-filedrop](https://github.com/weixiyen/jquery-filedrop) for upload progress/drag + drop, [Nodejs](http://nodejs.org) to process and move the uploaded files to [Amazon S3](http://aws.amazon.com/s3/) and [MongoDB](http://www.mongodb.org/) to store it's data.  

Currently there is no authorisation model, users can create their own 'secret' url which they can share with friends. If this url is ever discovered by somebody they will have access to all of your uploaded files!

[Click here for a demo, courtesy of Nodejitsu](http://uploader.nodejitsu.com) (Files will be deleted every few hours).

## Features:
* Drag + Drop uploads
* Upload progress
* Amazon S3 as the storage platform
* 'Secret' urls

## Setup:
* `npm install uploader`  
* Provide your Amazon/MongoDB database details in config/config.js
* `node server.js` (started on port: 3000)  
  
## TODO:
* Show error messages.
* Support Safari

## Good stuff:
[jquery-filedrop](https://github.com/weixiyen/jquery-filedrop)  