const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const ts = require("gulp-typescript");
const tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', function(){
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist/js'));
});

gulp.task('default', gulp.series('ts'));


// minify
gulp.task('minify', function () {
    return gulp.src('dist/js/searchJS.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
});

// watch 설정
gulp.task('watch', function(){
    gulp.watch('assets/js/searchJS.ts', gulp.series('ts', 'minify'));
});

// gulp를 실행하면 default 로 concat, watch를 실행하는데 병렬로!
gulp.task('default', gulp.series('ts', 'minify', 'watch'));