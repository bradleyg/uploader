
var express = require("express"),
    googl = require('goo.gl'),
    knox = require('knox'),
    mongoose = require('mongoose'),
    config = require('./config/config.js'),
    app = express.createServer();
    
mongoose.connect(config.mongo.db);

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);
  app.use('/assets', express.static(__dirname + '/assets'));
  app.set("views", __dirname + '/views');
  app.set("view options", { layout: false });
});

var client = knox.createClient({
    key: config.s3.key, 
    secret: config.s3.secret, 
    bucket: config.s3.bucket
});

var Schema = mongoose.Schema, 
    ObjectId = Schema.ObjectId;
    
var FileEntry = new Schema({
  url: { type: String }, 
  shortUrl: { type: String }, 
  name: { type: String }, 
  secret: { type: String }, 
  date: { type: Date, default: Date.now }
});

var fileModel = mongoose.model('FileEntry', FileEntry);

require('./lib/routes')(app, fileModel, client, config, googl);

app.listen(process.env.PORT || 3000);