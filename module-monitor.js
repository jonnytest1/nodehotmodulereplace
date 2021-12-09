const chokidar = require('chokidar');

function intecept(oldModule, moduleCall) {
    Object.keys(oldModule).forEach(key => {
        Object.defineProperty(oldModule, key, {
            get: () => {
                return moduleCall()[key];
            },
            set: (val) => {
                moduleCall()[key] = val;
            }
        });
    });
}
module.exports = function NodeModuleMonitor(mainPath) {
    chokidar.watch(mainPath, {
        ignoreInitial: true
    })
        .on('all', (event, path) => {
            if(require.cache[path]) {
                const oldModule = require.cache[path];
                let newMOdule;
                intecept(oldModule.exports, () => newMOdule);
                console.log('delete relaoding');
                delete require.cache[path];
                newMOdule = require(path);
            } else {

                console.log('module didnt exist');
            }
        });
};