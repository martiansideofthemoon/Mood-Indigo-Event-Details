var express=require("express");
var app=express();
var http=require("http");
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile')
var util = require('util')
var urlEncodedParser = bodyParser.urlencoded({extended:false, limit:'50mb'} );
var file="eventsdata.json";
var fs = require('fs');
var valid_users = [
	{
	"username": "kalpesh",
	"password": "kalpesh"
	}
	]
function supportCrossOriginScript(req, res, next) {
    res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
}

app.use('/',express.static(__dirname));

app.get('/api/data',supportCrossOriginScript,function(req,res){
	console.log("yolo");
	jsonfile.readFile(file, function(err, obj) {
	  res.send(obj);
	});
});
app.post('/checkLogin',urlEncodedParser,supportCrossOriginScript,function(req,res){
	console.log(req['body']);
	if (req['body']['username']===valid_users[0]['username'] && req['body']['password']===valid_users[0]['password'])
		res.send(true);
	else
		res.send(false);
});
app.post('/updateDetails',urlEncodedParser,supportCrossOriginScript,function(req,res){
	console.log(req['body']['data']);
	
	/*jsonfile.writeFile(file, JSON.stringify(JSON.parse(req.body.data),0,4), function (err) {
  		console.error(err);
	});*/
	fs.writeFile(file, req['body']['data'], function (err) {

	});
	res.send(true);
	});

http.createServer(app).listen(8888);