const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// munufy
gulp.task('minify', function () {
    return gulp.src('assets/js/searchJS.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
});

// watch 설정
gulp.task('watch', function(){
    gulp.watch('assets/js/searchJS.js', gulp.series('minify'));
});

// gulp를 실행하면 default 로 concat, watch를 실행하는데 병렬로!
gulp.task('default', gulp.series('minify', 'watch'));