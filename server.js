// requires
var express = require("express");
var knox = require('knox');
var mongoose = require('mongoose');
var config = require('./config/config.js');
var app = express.createServer();

// express
app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);
  app.use('/assets', express.static(__dirname + '/assets'));
  app.set("views", __dirname + '/views');
  app.set("view options", { layout: false });
});

// knox
var client = knox.createClient({
    key: config.s3.key, 
    secret: config.s3.secret, 
    bucket: config.s3.bucket
});

// mongoose
mongoose.connect(config.mongo.db);
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
    
var FileEntry = new Schema({
  url: { type: String }, 
  shortUrl: { type: String }, 
  name: { type: String }, 
  secret: { type: String }, 
  date: { type: Date, default: Date.now }
});

var fileModel = mongoose.model('FileEntry', FileEntry);

// routes
require('./lib/routes')(app, fileModel, client, config);

// server
app.listen(process.env.PORT || 3000);