const gulp = require('gulp');//引入gulp
const html = require('gulp-minify-html');//引入压缩html插件
const css = require('gulp-clean-css');
const jscript = require('gulp-uglify');//引入js压缩插件

//Es6转Es5
const babel = require('gulp-babel');
const babelcore = require('babel-core');
const es2015 = require('babel-preset-es2015');

//图片压缩
const imagemin = require('gulp-imagemin');


//复制文件
gulp.task('copyfile',()=>{
    return gulp.src('src/thirdplugins/*.js')
        .pipe(gulp.dest('dist/thirdplugins'));
});
gulp.task('copyicon',()=>{
    return gulp.src('src/icon/*.woff')
        .pipe(gulp.dest('dist/icon'));
});


//压缩html文件
gulp.task('compresshtml',()=>{
    return gulp.src('src/*.html')
        .pipe(html())//执行压缩html
        .pipe(gulp.dest('dist/'));
});

//压缩css文件
gulp.task('compresscss',()=>{
    return gulp.src('src/css/*.css')
        .pipe(css())
        .pipe(gulp.dest('dist/css'));
});

//sass编译成css

//压缩js文件
gulp.task('compressjs',()=>{
    return gulp.src('src/script/*.js')
        .pipe(babel({
            presets:['es2015']            
        }))
        .pipe(jscript())
        .pipe(gulp.dest('dist/script'));
});

// 图片压缩 - jpg/gif/bmp/webp/ [png] - imagemin
gulp.task('compressimg', () => {
    return gulp.src('src/img/*.{jpg,png,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});