import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; //compress css file
import webpcss from 'gulp-webpcss'; // rendering WEBP images
import autoPrefixer from 'gulp-autoprefixer'; // adding wendor prefix (crossbrowser)
import groupCssMediaQueries from 'gulp-group-css-media-queries';//all clear from name

const sass = gulpSass(dartSass)

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.if(
            app.isBuild, groupCssMediaQueries()))
        .pipe(app.plugins.if(
            app.isBuild, webpcss(
                {
                    webpClass: ".webp",
                    noWebpClass: ".no-webp"
                }
            )))
        .pipe(app.plugins.if(
            app.isBuild, autoPrefixer({
                grid: true,
                overrideBrowserslist: ["last 3 versions"],
                cascade: true
            })))
        // uncomment if you need decompressed file to
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.if(
            app.isBuild, cleanCss()))
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}