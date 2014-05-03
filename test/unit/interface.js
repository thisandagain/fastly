var test    = require('tap').test,
    fastly  = require(__dirname + '/../../lib/index.js');

test('unit', function (t) {
    t.type(fastly, 'function', 'module is a function');

    var ready = fastly('apikey');
    t.type(ready, 'object', 'module exposes an object');
    t.type(ready.request, 'function', 'request method exists');
    t.end();
});
