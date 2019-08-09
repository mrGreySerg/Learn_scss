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


// и browserSync.stream() срабатывает и .pipe(browserSync.reload({stream: true}))
function buildHtml (){
    return gulp.src('./develop/*.html')
    .pipe(gulp.dest('./build'))
    // .pipe(browserSync.reload({
    //     stream: true
    //   }))
    .pipe(browserSync.stream())
}

function cleanBuild(){
    return gulp.src('build/*')
            .pipe(clean());
}

    // gulp.watch('./develop/*.html', buildHtml);
    // gulp.watch('./develop/scss/*.scss', buildScss);


// function watchScss(){
//    return gulp.watch('./develop/scss/*.scss', gulp.series(buildScss, browserSync.reload));
// }

function watch(){
    gulp.watch('./develop/*.html', buildHtml);
    gulp.watch('./develop/scss/*.scss', buildScss);
}

gulp.task('scss', buildScss);
gulp.task('buildHtml', buildHtml);
gulp.task('clean', cleanBuild);
// gulp.task('watch', watchScss);




// запускаем browser chrom и указываем папку, в которой отслеживаемый index.html.
// но автоматической перезагрузки браузера не происходит.
gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: './build'
        },
        notify: false,
        browser: 'chrome'

    });
});

gulp.task('production', gulp.series(cleanBuild, buildHtml, buildScss,
                        gulp.parallel(watch, 'browser-sync')));                   