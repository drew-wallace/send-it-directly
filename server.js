var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');
var app = express();
app.use(bodyParser.json());
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname + '-' + Date.now());
    }
});
var upload = multer({storage: storage}).array('userPhoto');

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.status(500).json({message: "Error uploading file."});
        }
        res.json({message: "File is uploaded"});
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});