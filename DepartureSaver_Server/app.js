var express = require('express');
var request = require('request');
var xml2js = require('xml2js');
var xmlParser = xml2js.Parser();
var app = express();
const dataAPIKey = '%2BldNua%2Fn0VEJt%2BtrwNRRz74Mvewgmu%2Fwz3P%2Fxtrc4GD%2BKO5Zx6oNgWYAaLpuTuBrWI6eCRMrgui%2BbdMVFvl4HQ%3D%3D';
const weatherFreeAPIKey = '42d9865a1ddccdaa8f5d2bd8494a3f6b'

app.get('/parkinginfo', function (req, res_parent) {

    var reqOptions = {
        url: 'http://openapi.airport.kr/openapi/service/StatusOfParking/getTrackingParking?serviceKey='+dataAPIKey+'&pageNo=1&startPage=1&numOfRows=10&pageSize=100',
        method: 'GET',
        headers: {
            'Accept' : 'application/xml',
            'Accept-Charset' : 'utf-8',
            'User-Agent' : 'my-reddit-client'
        }
    };

    try {
        request( reqOptions, function(err, res, body) {
            xmlParser.parseString(body, function(err, result) {
                res_parent.send(result.response.body[0].items[0].item);
            })
        });
    }
    catch(err) {
        console.log(err);
        res_parent.end(err);
    }
});

app.get('/terminalinfo/:no', function (req, res_parent) {

    var no = req.params.no;
    var reqOptions = {
        url: 'http://openapi.airport.kr/openapi/service/StatusOfDepartures/getDeparturesCongestion?serviceKey='+dataAPIKey+'&terno=' + no,
        method: 'GET',
        headers: {
            'Accept' : 'application/xml',
            'Accept-Charset' : 'utf-8',
            'User-Agent' : 'my-reddit-client'
        }
    };

    try {
        request( reqOptions, function(err, res, body) {
            xmlParser.parseString(body, function(err, result) {
                res_parent.send(result.response.body[0].items[0].item);
            })
        });
    }
    catch(err) {
        console.log(err);
        res_parent.end(err);
    }
});

app.listen(4000, function() {
    console.log('Example app listening on port 4000!');
})