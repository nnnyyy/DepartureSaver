var express = require('express');
var request = require('request');
var xml2js = require('xml2js');
var xmlParser = xml2js.Parser();
var app = express();

app.get('/parkinginfo', function (req, res_parent) {

    var reqOptions = {
        url: 'http://openapi.airport.kr/openapi/service/StatusOfParking/getTrackingParking?serviceKey=%2BldNua%2Fn0VEJt%2BtrwNRRz74Mvewgmu%2Fwz3P%2Fxtrc4GD%2BKO5Zx6oNgWYAaLpuTuBrWI6eCRMrgui%2BbdMVFvl4HQ%3D%3D&pageNo=1&startPage=1&numOfRows=10&pageSize=100',
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
        url: 'http://openapi.airport.kr/openapi/service/StatusOfDepartures/getDeparturesCongestion?serviceKey=%2BldNua%2Fn0VEJt%2BtrwNRRz74Mvewgmu%2Fwz3P%2Fxtrc4GD%2BKO5Zx6oNgWYAaLpuTuBrWI6eCRMrgui%2BbdMVFvl4HQ%3D%3D&terno=' + no,
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