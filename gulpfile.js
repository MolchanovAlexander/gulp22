// function defaultTask(cb) {
//     // place code for your default task here
//     cb();
// }

// exports.default = defaultTask

import gulp from "gulp"
import { path } from "./gulp/config/path.js";
import { plugins } from './gulp/config/plugins.js';

global.app = {
    gulp: gulp,
    path: path,
    plugins: plugins
}

import { copy } from "./gulp/tasks/copy.js"
import { reset } from "./gulp/tasks/reset.js"
import { html } from "./gulp/tasks/html.js"
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";

// watcher
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);

}

const mainTasks = gulp.parallel(copy, html, scss);
// scenario bilder
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

gulp.task('default', dev);