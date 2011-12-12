var formidable = require('formidable'),
    fs = require('fs');

module.exports = function(app, fileModel, client, config, googl){
  
  app.get('/:secret?', function(req, res){
    if(typeof req.params.secret === 'undefined'){
      var secret = "root";
    }
    else {
      var secret = req.params.secret;
    }
    fileModel.find({ secret: secret }, {}, { sort: {date: -1} }, function (err, files) {
      res.render('index.jade', {
        files: files,
        domain: config.s3.domain,
        host: req.headers.host
      });
    });
  });

  app.post('/delete', function(req, res){
    var id = req.body.id;
    fileModel.findById(id, function(err, files){  
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
  });

  app.post('/:secret?', function(req, res){
    if(typeof req.params.secret === 'undefined'){
      var secret = "root";
    }
    else {
      var secret = req.params.secret;
    }
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req);
    form.on('file', function(name, file){     
      var safeName = file.filename.replace(/ /g, "-").replace(/[?\[\]/\\=<>:;,''""&$#*()|~`!{}]/g, '');
      var safePath = new Date().getTime() + '/' + safeName;
      client.putFile(file.path, safePath, function(err, response){
        googl.shorten(config.s3.domain + "/" + safePath, function (shortUrl) {
          fs.unlink(file.path, function(err){
            var file = new fileModel();
            file.name = safeName;
            file.shortUrl = shortUrl.id;
            file.url = safePath;
            file.secret = secret;
            file.save(function (err) {
              var data = {
                status: {
                  message: 'success',
                  url: safePath,
                  name: safeName,
                  id: file._id,
                  shortUrl: shortUrl.id
                }
              }
              res.json(data);
            });      
          });
        });
      });
    });
  });
  
}