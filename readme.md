This uploader application is a HTML5 only file sharing platform. Currently only browsers which support the [File Reader API](http://www.html5rocks.com/en/tutorials/file/dndfiles/) will work (Chrome and Firefox).   

The application uses [jquery-filedrop](https://github.com/weixiyen/jquery-filedrop) for upload progress/drag + drop, [Nodejs](http://nodejs.org) to process and move the uploaded files to [Amazon S3](http://aws.amazon.com/s3/) and [MongoDB](http://www.mongodb.org/) to store it's data.  

Currently there is no authorisation model, users can create their own 'secret' url which they can share with friends. If this url is ever discovered by somebody they will have access to all of your uploaded files!

[Click here for a demo, courtesy of Nodejitsu](http://uploader.nodejitsu.com) (Files will be deleted every few hours).

## Features:
* Drag + Drop uploads
* Upload progress
* Simultaneous uploads
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

## License 

(The MIT License)

Copyright (c) 2011 Bradley Griffiths &lt;bradley.griffiths@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.