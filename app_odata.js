//
var express = require('express');
var jaydata = require('jaydata');
window.DOMParser = require('xmldom').DOMParser;
var q = require('q');
var model = require('./model.js');
var app = express();

// Serverconfig
app.use(express.query());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'session key' }));
app.use("/balges", $data.JayService.OData.Utils.simpleBodyReader());
app.use("/balges", $data.JayService.createAdapter(balges.Context, function (req, res) {
    return new balges.Context({name: "mongoDB", databaseName:"balges", address: "localhost", port: 27017 });
    }));
app.use("/", express.static(__dirname));
app.use(express.errorHandler());

// Server start
app.listen(8090);
