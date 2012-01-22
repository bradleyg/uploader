var googl = require('goo.gl');
var fs = require('fs');

module.exports = function(app, fileModel, client, config){
  
  // get files
  var getFiles = function(req, res) {
    var secret = req.params.secret ? req.params.secret : 'root';
    
    fileModel.find({ secret: secret }, {}, { sort: {date: -1} }, function (err, files) {
      if(err) {
        return res.send(err, 500);
      }
      
      res.render('index.jade', {
        files: files,
        domain: config.s3.domain,
        host: req.headers.host
      });
    });
  }

  // upload file, shorten url and save to db
  var addFile = function(req, res) {
    var files = req.files.files;
    var safe = {};
    
    safe.secret = req.params.secret ? req.params.secret : 'root';      
    safe.name = files.name.replace(/ /g, "-").replace(/[?\[\]/\\=<>:;,''""&$#*()|~`!{}]/g, '');
    safe.path = new Date().getTime() + '/' + safe.name;      
    
    client.putFile(files.path, safe.path, function(err, response){
      if(err) {
        return res.send(err, 500);
      }
      
      googl.shorten(config.s3.domain + "/" + safe.path, function (url) {
        fs.unlink(files.path, function(err){      
          if(err) {
            return res.send(err, 500);
          }
          
          save(safe, url, function(err, data){
            if(err) {
              return res.send(err, 500);
            }
            
            res.json(data, 200);
          })
        });
      });
    });
  }
  
  // delete file
  var removeFile = function(req, res){
    var id = req.body.id;
    fileModel.findById(id, function(err, files){
      if(err) {
        return res.send(err, 500);
      }
      
      if(files !== null){
        client.deleteFile(files.url, function(){
          files.remove();
        });
      }
      
      var data = {
        success: "file deleted"
      }
      
      res.json(data);
    });
  }
  
  // save to the db
  var save = function(safe, url, cb) {
    var file = new fileModel();
    file.name = safe.name;
    file.shortUrl = url.id;
    file.url = safe.path;
    file.secret = safe.secret;
    file.save(function(err) {
      var data = {
        status: {
          message: 'success',
          url: safe.path,
          name: safe.name,
          id: file._id,
          shortUrl: url.id
        }
      }
      cb(err, data);
    });  
  }
  
  // routes
  app.post('/delete', removeFile);
  app.post('/:secret?', addFile);
  app.get('/:secret?', getFiles); 
  
}