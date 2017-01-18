var gulp = require('gulp');

config = {

    app: {
        name: 'MEAN Sample application'
    },

    env: {
        dev: {
            debug: true,
            minify: false,
            folder: 'build',
            temp: 'path/to/temp/folder'
        },
        prod: {
            debug: false,
            minify: true,
            folder: 'build',
            temp: 'path/to/temp/folder'
        }
    },
    
    sourceDir: './public/',
    buildDir: './build/',
    
    assets: 'XXX',

    scripts: {
        src: 'public/js/**/*.js',
        dest: 'build/scripts'
    },

    images: {
        src: 'public/images/**/*',
        dest: 'build/images'
    },
    
    fonts: {
        src: 'public/fonts/**/*',
        icons: 'public/fonts/icons.*',
        dest: 'build/fonts'
    },

    assetExtensions: [
        'js',
        'json',
        'css',
        'png',
        'jpe?g',
        'gif',
        'svg',
        'eot',
        'otf',
        'ttc',
        'ttf',
        'woff',
        'woff2?'
    ],

    styles: {
        src: 'public/styles',
        app_src: ['public/styles/main.scss', 'public/styles/unsupported.scss'],
        autoprefixer: ['last 5 version', '> 0.1%', 'ie 9']
    },
    
    mainHTML: 'public/index.html',
    
    test: {
        karma: 'test/karma.conf.js',
        protractor: 'test/protractor.conf.js'
    }
};

global.env = 'dev';

require('./tasks/scrap');
require('./tasks/clean');
require('./tasks/deploy');
require('./tasks/development');
require('./tasks/production');
require('./tasks/mainhtml');
require('./tasks/scrap');
require('./tasks/watch');
require('./tasks/jshint');
require('./tasks/images');
require('./tasks/fonts');

gulp.task('default', ['scrap']);
