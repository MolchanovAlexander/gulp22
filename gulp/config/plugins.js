import replace from "gulp-replace";     // replace 
import plumber from "gulp-plumber";     // handler errors 
import notify from "gulp-notify";       // messages
import browserSync from "browser-sync"; // local server autoupdate
import newer from "gulp-newer";
import ifPlugin from "gulp-if"

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browserSync,
    newer: newer,
    if: ifPlugin
}