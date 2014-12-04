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
    var ret;
    child.exec('which notify-send || which growlnotify || which osascript', function(e, so, se) {
        if (e !== null) {
            if (se.length === 0) {
                se = 'no suitable notifiers found';
            }

            throw new Error('os-notify:'+' '+se);
        } else {
            so = so.trim();

            if (callback !== void(0)) {
                callback(so);
            } else {
                ret = so;
                process.nextTick();
            }
        }
    });

    return ret;
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

    if (taskName == void(0) || taskName === null || taskName.length === 0) {
        if (this.name != void(0)) {
            taskName = this.name;
        } else {
            taskName = 'os-notify';
        }
    }
    if (msg == void(0)) {
        msg = 'Task'+' `'+taskName+'`'+' done.';
    }

    msg = '\n'+msg; 

    get_notify(function(cmd) {

    })

    _child = child.execFile('notify-send', ['-t', '1', 'Grunt message', msg], {}, function(e) {
        if (e) {
            console.log(e);
        }
    });
};

// get_notify(function(c) {
//     console.log(c);
// });
console.log(get_notify());
