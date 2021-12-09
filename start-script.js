const modmon = require('./module-monitor');

modmon(__dirname);

const exec = require('./changing-script');


setInterval(() => {
    exec.trigger();
}, 2000);