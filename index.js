//growlnotify -n "My App" -m "Hello world"
//osascript -e 'display notification "Lorem ipsum dolor sit amet" with title "Title"'
//os.platform`
var child = require('child_process');

/**
 * [get_notify description]
 * @param  {Function} callback
 * @return {[type]}
 */
var get_notify = function(callback) {
    var err;

    return child.exec('which notify-send || which growlnotify || which osascript', function(e, so, se) {
        if (e !== null) {
            if (se.length === 0) {
                se = 'no suitable notifiers found';
            }

            err = new Error('os-notify:'+' '+se);
        } else {
            so = so.trim();

            if (callback !== void(0)) {
                callback(err, so);
            }
        }
    });
};

/**
 * [notify description]
 * @param  {[String]} caption
 * @param  {[String]} body
 * @param  {[Object]} ext_opts
 * @return {[type]}
 */
var notify = function(caption, body, ext_opts) {
    var _child;

    if (caption == void(0) || caption === null || caption.length === 0) {
        if (this.name != void(0) && this.async != void(0)) {
            // Possibly Grunt
            caption = this.name;
        } else {
            caption = 'os-notify';
        }
    }

    if (body == void(0)) {
        body = 'Notification triggered.';
    }

    body = '\n'+body; 

    get_notify(function(e, cmd) {
        if (e) {
            throw e;
        }

        _child = child.execFile(cmd, [caption, body], {}, function(e) {
            if (e) {
                console.log(e);
            }
        });
    });
};

// module.exports = function(title, body, ext_opts) {
//     if (ext_opts == void(0)) {
//         ext_opts = {};
//     }

//     notify(title, body, ext_opts);
// };

module.exports = notify;
