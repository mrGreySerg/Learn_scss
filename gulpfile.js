const gulp = require("gulp");
const scss = require("gulp-sass");
const clean = require("gulp-clean");
// const browserSync = require("browser-sync").create();
const browserSync = require("browser-sync").create();

function buildScss (){
    return gulp.src('./develop/scss/**/*.scss')
            .pipe(scss())
            .pipe(gulp.dest('./build/css'))
            .pipe(browserSync.stream())
}

function buildHtml (){
    return gulp.src('./develop/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream())
}

function cleanBuild(){
    return gulp.src('build/*')
            .pipe(clean());
}

    // gulp.watch('./develop/*.html', buildHtml);
    // gulp.watch('./develop/scss/*.scss', buildScss);


function watchScss(){
   return gulp.watch('./develop/scss/*.scss', gulp.series(buildScss, browserSync.reload));
}

gulp.task('scss', buildScss);
gulp.task('buildHtml', buildHtml);
gulp.task('clean', cleanBuild);
gulp.task('watch', watchScss);

gulp.task('production', gulp.series('clean', gulp.series(cleanBuild, buildHtml, buildScss, browser)));


// запускаем browser chrom и указываем папку, которую мониторить.
gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: './build'
        },
        notify: false,
        browser: 'chrome'

    });
});
                   