/**
 * Test suite
 *
 * @package fastly
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var test    = require('tap').test,
    fastly  = require(__dirname + '/../lib/index.js');

/**
 * Definition
 */
test('module definition', function (t) {
    t.type(fastly, 'object', 'component should be an object');
    t.type(fastly.authenticate, 'function', 'method should be a function');
    t.type(fastly.request, 'function', 'method should be a function');
    t.end();
});

/**
 * API "helper" methods
 */
test('module helper methods', function (t) {
    t.type(fastly.purge, 'function', 'method should be a function');
    t.type(fastly.purgeAll, 'function', 'method should be a function');
    t.type(fastly.stats, 'function', 'method should be a function');
    t.end();
});