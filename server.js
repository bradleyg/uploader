// requires
var cluster = require('cluster')
var express = require("express")
var stylus = require("stylus")
var knox = require('knox')
var mongoose = require('mongoose')
var config = require('./config/config.js')
var app = express.createServer()

config.mongo.db = process.env.MONGOHQ_URL || config.mongo.db
config.s3.key = process.env.S3_KEY || config.s3.key
config.s3.secret = process.env.S3_SECRET || config.s3.secret

var numCPUs = require('os').cpus().length

// express
app.configure(function(){
  app.use(stylus.middleware({ src: __dirname + '/public' }))
  app.use(express.methodOverride())
  app.use(express.bodyParser())
  app.use('/', express.static(__dirname + '/public'))
  app.set("views", __dirname + '/views')
  app.set("view options", { layout: false })
  app.use(app.router)
})

// knox
var s3Client = knox.createClient({
    key: config.s3.key,
    secret: config.s3.secret,
    bucket: config.s3.bucket
})

// mongoose
mongoose.connect(config.mongo.db)
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var FileEntry = new Schema({
  url: { type: String },
  shortUrl: { type: String },
  name: { type: String },
  secret: { type: String },
  date: { type: Date, default: Date.now }
})

var fileModel = mongoose.model('FileEntry', FileEntry)

// routes
var routes = require('./lib/routes')(app, fileModel, s3Client)

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork()
    console.log('Starting worker...')
  }

  cluster.on('death', function(worker) {
    cluster.fork()
  })
}
else {
  app.listen(process.env.PORT || 3000)
}
