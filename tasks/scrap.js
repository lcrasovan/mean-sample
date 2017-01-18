var fs = require('fs'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    extend = require('node.extend'),
    request = require('request'),
    cheerio = require('cheerio'),
    walk = require('walk'),
    q = require('q'),
    config = require('../config/scraping.json');

var createFileStreamFromString = function(filename, string) {
    var src = require('stream').Readable({ objectMode: true });

    src._read = function () {
        this.push(new gutil.File({ cwd: '', base: '', path: filename, contents: new Buffer(string) }));
        this.push(null);
    };

    return src;
};

var storeToFile = function(outfile, obj){
    return createFileStreamFromString(outfile, JSON.stringify(obj))
        .pipe(gulp.dest(config.path));
};

var getPagesToScrap = function(regionIndex) {
    var numberOfPages = config['regions'][regionIndex]["number_of_pages"],
        pages = [];
    for(var i = 1; i <= numberOfPages; i++) {
        pages.push(config['regions'][regionIndex]['main_url'] + '?page=' + i);
    }
    return pages;
};

var getCompingUrls = function(pageUrl) {
    var def = q.defer();
    
    request.get({
            url: pageUrl
        },
        function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);

                var campingUrls = [];
                $('.make_online_reserve.more_info').each(function(){
                    if($(this).attr('href').indexOf('ajax') === -1) {
                        campingUrls.push($(this).attr('href'));
                    };
                });
                console.log('page: ' + pageUrl);
                console.log(campingUrls);

                def.resolve(campingUrls);
            }else{
                def.reject('GET ERROR: ' + pageUrl + ' Returned ' + response.statusCode);
            }
        }
    );
    
    return def.promise;
} ;

var getCampingsUrls = function(outfile){
    var campingUrlsPromises = [],
        regionsDefer = q.defer(),
        regions = config['regions'];

    regions.forEach(function(region, index) {
        var regionPages = getPagesToScrap(index);
        regionPages.forEach(function(regionPage) {
            campingUrlsPromises.push(getCompingUrls(regionPage));
        });
    });

    q.all(campingUrlsPromises).then(function() {
        var campings = [];
        campingUrlsPromises.forEach(function(campingUrlPromise) {
            campings = campings.concat(campingUrlPromise);
        });
        regionsDefer.resolve(campings);
    });

    return regionsDefer.promise;
};

var getCampingData = function(relativeUrl) {
    var baseUrl = config['baseUrl'],
        campingDef = q.defer(),
        pageUrl = baseUrl + relativeUrl;

    request(pageUrl, function(error, response, html){
        if(!error && response.statusCode === 200){
            var $ = cheerio.load(html),
                email = 'info@' + pageUrl.split('/')[4] + '.com';

            var campingName = $('h1').text(),
                phoneInfoDiv = $('.camping_item_finfo').find('.line')[2],
                phoneNumber = $(phoneInfoDiv).find('div:nth-child(2) p').text().trim(),
                address = $('.more_localization').find('div:nth-child(2)').text(),
                geoString = $('.more_localization').find('div:nth-child(4)').text().trim(),
                lat = typeof geoString.split('Latitud: ')[1] !== 'undefined' ? geoString.split('Latitud: ')[1].split('(')[0].trim() : '',
                lon = typeof geoString.split('Longitud: ')[1] !== 'undefined' ? geoString.split('Longitud: ')[1].split('(')[0].trim() : '',
                data = {
                    name: campingName,
                    address: address,
                    phone: phoneNumber,
                    email: email,
                    loc: [Number(lon), Number(lat)]
                };
            campingDef.resolve(data);
        } else {
            campingDef.reject('GET ERROR when dowloading ' + pageUrl + ' Code: ' + response.statusCode);
        }
    });

    return campingDef.promise;
};

var storeCampingsData = function(campingsUrls, file){

    var promisesCampingsData = [],
        campingsDataDefer = q.defer();

    campingsUrls.forEach(function(campingUrl) {
        promisesCampingsData.push(getCampingData(campingUrl));
    });

    q.all(promisesCampingsData).then(function() {

        console.log("in alll!!!!");

        var campingsData = [];
        promisesCampingsData.forEach(function(campingDataPromise) {
            campingsData.push(campingDataPromise);
        });
        storeToFile(file, campingsData).on('end', campingsDataDefer.resolve);
    });

    return campingsDataDefer.promise;
};

var scrap = function(){

    var campingsUrlsPromise = getCampingsUrls(config['pathCampingsUrls']),
        file = config['pathCampingsData'];

    campingsUrlsPromise.then(function(campingsUrls) {
        storeCampingsData(campingsUrls, file);
    });
};

gulp.task('scrap', function(){
    return scrap();
});
