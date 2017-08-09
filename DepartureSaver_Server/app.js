var express = require('express');
var urlencode = require('urlencode');
var request = require('request');
var cheerio = require('cheerio')
var xml2js = require('xml2js');
var xmlParser = xml2js.Parser();
var app = express();
const dataAPIKey = '%2BldNua%2Fn0VEJt%2BtrwNRRz74Mvewgmu%2Fwz3P%2Fxtrc4GD%2BKO5Zx6oNgWYAaLpuTuBrWI6eCRMrgui%2BbdMVFvl4HQ%3D%3D';
const weatherFreeAPIKey = '42d9865a1ddccdaa8f5d2bd8494a3f6b'
const youtubeBrowerKey = 'AIzaSyCKfmVmbkI1-bFKVanEOwFTBDQr6sKZOuw'

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
                var retCode = result.response.header[0].resultCode[0]
                var contentbody = result.response.body[0]
                var items = contentbody.items
                if(retCode == "00") {
                    var list = []
                    do {
                        if(items[0] == null || items[0].item == null) {
                            retCode = "99"
                            break
                        }
                        var contentLen = items[0].item.length
                        try {
                            for( var i = 0 ; i < contentLen ; ++i) {
                                var data = items[0].item[i]
                                var tm = data.datetm[0]
                                var floor = data.floor[0]
                                var parkingarea = data.parkingarea[0]
                                var parking = data.parking[0]
                                list.push({name:floor, time:tm, parking:parking, parkingarea: parkingarea})
                            }
                        }
                        catch(e) {
                            retCode = "99"
                        }
                    }while(false);

                    res_parent.send({ret:retCode, list:list});
                }
                else {
                    res_parent.send({ret:retCode});
                }
            })
        });
    }
    catch(err) {
        console.log(err);
        res_parent.end({ret:"100"});
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
                var retCode = result.response.header[0].resultCode[0]
                if(retCode == "00") {
                    do {
                        var depainfos = []
                        if( result.response.body[0].items[0].item == null) {
                            retCode = "99"
                            break;
                        }
                        var item = result.response.body[0].items[0].item[0]
                        var refreshDate = item.cgtdt[0]
                        var refreshTime = item.cgthm[0]
                        var depa2gate = item.cgtlvlg2[0]
                        var depa3gate = item.cgtlvlg3[0]
                        var depa4gate = item.cgtlvlg4[0]
                        var depa5gate = item.cgtlvlg5[0]
                        var depa2waiting = item.pwcntg2[0]
                        var depa3waiting = item.pwcntg3[0]
                        var depa4waiting = item.pwcntg4[0]
                        var depa5waiting = item.pwcntg5[0]
                        depainfos.push({name:"2번 게이트", lvlg:depa2gate, wait: depa2waiting})
                        depainfos.push({name:"3번 게이트", lvlg:depa3gate, wait: depa3waiting})
                        depainfos.push({name:"4번 게이트", lvlg:depa4gate, wait: depa4waiting})
                        depainfos.push({name:"5번 게이트", lvlg:depa5gate, wait: depa5waiting})
                    }while(false);

                    // depa2waiting
                    // depa2gate value
                    // 0 = ��Ȱ
                    // 1 = ����
                    // 2 = ȥ��
                    // 3 = �ſ� ȥ��
                    // 9 = ����
                    res_parent.send({ret:retCode,refreshDate:refreshDate, refreshTime: refreshTime, data:depainfos});
                }
                else {
                    res_parent.send({ret:retCode});
                }
            })
        });
    }
    catch(err) {
        console.log(err);
        res_parent.end({ret:"100"});
    }
});

app.get('/PassengerNotice/:no', function (req, res_parent) {

    var no = req.params.no;
    var reqOptions = {
        url: 'http://openapi.airport.kr/openapi/service/PassengerNoticeKR/getfPassengerNoticeIKR?serviceKey='+dataAPIKey+'&selectdate=' + no,
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
                var retCode = result.response.header[0].resultCode[0]
                if(retCode == "00") {
                    do {
                        var passnotis = []
                        if( result.response.body[0].items[0].item == null) {
                            retCode = "99"
                            break;
                        }

                        var items = result.response.body[0].items[0].item;

                        for( var i = 0 ; i < items.length ; ++i ) {
                            var item = items[i];
                            console.log(item);
                            passnotis.push(
                                {
                                    adate: item.adate[0],
                                    atime:  item.atime[0],
                                    sum1: item.sum1[0],
                                    sum2: item.sum2[0],
                                    sum3: item.sum3[0],
                                    sum4: item.sum4[0],
                                    sum5: item.sum5[0],
                                    sum6: item.sum6[0],
                                    sum7: item.sum7[0],
                                    sum8: item.sum8[0],
                                    sumset1: item.sumset1[0],
                                    sumset2: item.sumset2[0]
                                }
                            );
                        }

                    }while(false);

                    res_parent.send({ret:retCode, data:passnotis});
                }
                else {
                    res_parent.send({ret:retCode});
                }
            })
        });
    }
    catch(err) {
        console.log(err);
        res_parent.end({ret:"100"});
    }
});

app.listen(4343, function() {
    console.log('Departure Saver Listening... 4343!');
})