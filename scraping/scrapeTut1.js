var request = require('request');
var cheerio = require('cheerio');
var proxReq = request.defaults({proxy:"http://ms13s011:Venkatram%40123@hproxy.iitm.ac.in:3128/"});
//request = request.defaults({proxy: process.env.HTTP_PROXY });

pools = {'Aloha': 3, 'Beaverton':15, 'Conestoga':12, 'Harman':11, 'Raleigh':6, 'Somerset':22, 'Sunset':5, 'Tualatin Hills': 2};

days = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

for (pool in pools) {
var url = 'http://www.thprd.org/schedules/schedule.cfm?cs_id='+ pools[pool];
console.log('urlID: '+ pools[pool] + ' urlSrc: ' + pool );

// use request object with PROXY settings to scrape website.
proxReq(url, (function(pool) { return function(err, resp, body) {
		if (err) throw err; 
        $ = cheerio.load(body);
        $('#calendar .days td').each(function(day) {
            $(this).find('div').each(function() {
                event = $(this).text().trim().replace(/\s\s+/g, ',').split(',');
                if (event.length >= 2 && (event[1].match(/open swim/i) || event[1].match(/family swim/i)))
                    console.log(pool + ',' + days[day] + ',' + event[0] + ',' + event[1]);
            });
        });
    }})(pool));

} //end for

