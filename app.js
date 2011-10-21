
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

var io = require('socket.io').listen(app);
// MongoDB

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    DocumentObjectId = mongoose.Types.ObjectId;
//Mongo connection
var db = mongoose.createConnection("mongo://localhost/ticker-plant");

//Schemas
var Exchange = new Schema({
  exchange: { type: String}
});
mongoose.model('exchanges',Exchange);
var Exchanges = db.model('exchanges', Exchange);
var Group = new Schema({
  name: { type: String},
  ticker: { type: String},
  exchange: { type: String}
});
mongoose.model('groups', Group);
var Security = new Schema({
  ticker: { type: String},
  exchange: {type: String},
  currency: {type: String}
});
mongoose.model('securities',Security);



// Redis
var redis = require("redis");
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});
//get exchanges
app.get('/exchanges', function(req,res){
  Exchanges.find({}, function(err, data){
    if(err) {
      throw(err);
    }
     exchanges=JSON.parse(data);
     res.send(exchanges); 
  });
});
//get groups
app.get('/exchange/:exchange/', function(req,res){
  Group.findByExchange(req.params.exchange, function(err, data){
    if(err) {
      throw(err);
    }
     res.send(JSON.stringify(data)); 
  });
});
//get group tickers
app.get('/exchange/:exchange/:group', function(req,res){
  Group.findByName(req.params.group, function(err, data){
    if(err) {
      throw(err);
    }
     res.send(JSON.stringify(data)); 
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
