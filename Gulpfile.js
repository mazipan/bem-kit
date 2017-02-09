var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var header = require('gulp-header');
var rename = require("gulp-rename");
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');

var input = ['./src/**/*.scss'];
var output = './dist';

var pkg = require('./package.json');
var banner = ['/*!',
              ' * <%= pkg.name %> v<%= pkg.version %>',
              ' * @author : Irfan Maulana',
              ' * @repo   : https://github.com/mazipan/bem-kit',
              ' */',
              ''
              ].join('\n');


gulp.task('clean', function () {
    return gulp.src([output], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('sass', ['clean'], function () {

    var autoprefixerOptions = {
        browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
    };

    var sassOptions = {
        outputStyle: 'compact'
    };

    return gulp
        .src(input)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest(output));
});

gulp.task('watch', ['sass'], function() {
    return gulp
        .watch(input, ['sass'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('uglify-js', ['clean'], function (cb) {

  var uglifyOptions = {
    mangle: true,
    preserveComments: 'license'
  };
 
  pump([
      gulp.src('./src/*.js'),
      uglify(),
      gulp.dest(output)
    ], cb);

});

gulp.task('rename', ['sass', 'uglify-js'], function () {
     return gulp.src(["./dist/*.css", "./dist/*.js"])
          .pipe(rename(function (path) {
            path.basename += ".min";
          }))
          .pipe(gulp.dest(output));
});

gulp.task('minify-css', ['rename'], function() {
    return gulp.src('./dist/*.min.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest(output));
});


gulp.task('build:prod', ['clean', 'sass', 'uglify-js', 'rename', 'minify-css']);
gulp.task('build:dev',  ['clean', 'sass', 'watch']);
gulp.task('default',    ['build:dev']);