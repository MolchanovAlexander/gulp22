import fs, { appendFile } from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    // looking for font files .otf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        //converting to .ttf
        .pipe(fonter({
            formats: ['ttf']
        }))
        //upload in to src folder
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))

}
export const ttfToWoff = () => {
    // looking for font files .ttf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        //converting to .woff
        .pipe(fonter({
            formats: ['woff']
        }))
        //upload in to build folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}/`))
        // looking for font files .ttf
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        //convert it to .woff2
        .pipe(ttf2woff2())
        // uploading in to build folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}
export const fontsStyle = () => {
    // file of styles connecting to fonts
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    // checking for existing fonts file
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            if (!fs.existsSync(fontsFile)) {
                //if not exist - creating it
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    // writing fonts connection to file
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin ') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile,
                            `@font-face{\n font-family: ${fontName};\n font-display: swap; \n src: url("../fonts/${fontName}.woff") format("woff"), url("../fonts/${fontName}.woff2") format("woff2");\n font-weight: ${fontWeight};\n font-style: normal;\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                // if file exist - output message
                console.log("File scss/fonts.scss already exist. For it's updating file need to be deleted");
            }
        }
    });
    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
}