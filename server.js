/**
 * Created by Jason Wong on 4/9/2017.
 */
var express = require('express'); //this is the app
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var path = require("path");
var cookieParser = require('cookie-parser');
var router = require('./server/routes');
const open = require('open');


app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(router);

// Set the default routes
//Serving static files here
app.use("/dev/html", express.static(__dirname + '/html'));
app.use("/dev/js", express.static(__dirname + '/js'));
app.use("/dev/assets", express.static(__dirname + '/assets'));
app.use("/dev/style", express.static(__dirname + '/style'));

app.use("/prod/assets", express.static(__dirname + '/assets'));
app.use("/prod/dist", express.static(__dirname + '/dist'));

app.get('/', function(req, res){
    res.json({
        status: "Server Running"
    })
})

app.get('/dev', function (req, res) {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname + '/dev.html'));
});

app.get('/prod', function (req, res) {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname + '/prod.html'));
});

app.listen(8080, function () {
    open('http://localhost:8080/dev/');
});