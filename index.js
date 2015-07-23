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
	  if(err){throw err;}
	  else{
	  	createbackup(obj)
	  	res.send(obj);	
	  }
	  
	});
	function createbackup(obj){
		console.log("creating one");
		var filebackup="eventsdata_backup.json";
		fs.writeFile(filebackup,obj, function (err) {
			if(err){
				console.log("backup failed");
			}
			else
			{
				console.log("data successfull backuped");
			}
		});
	}
});
app.post('/checkLogin',urlEncodedParser,supportCrossOriginScript,function(req,res){
	console.log(req['body']);
	if (req['body']['username']===valid_users[0]['username'] && req['body']['password']===valid_users[0]['password'])
		res.send(true);
	else
		res.send(false);
});
app.post('/updateDetails',urlEncodedParser,supportCrossOriginScript,function(req,res){
	
	fs.writeFile(file, req['body']['data'], function (err) {
		if(err){res.send(false);}
		else{res.send(true);}
	});
	
	});

http.createServer(app).listen(8888);