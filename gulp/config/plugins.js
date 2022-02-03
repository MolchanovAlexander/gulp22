import replace from "gulp-replace";     // replace 
import plumber from "gulp-plumber";     // handler errors 
import notify from "gulp-notify";       // messages
import browserSync from "browser-sync"; // local server autoupdate

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browserSync
}