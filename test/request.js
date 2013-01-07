/**
 * Test suite
 *
 * @package fastly
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var async   = require('async'),
    test    = require('tap').test,
    fastly  = require(__dirname + '/../lib/index.js');

/**
 * Test suite
 */
async.auto({
    request:    function (callback) {
        fastly.request('GET', '/test', function (err, result) {
            callback(null, err);
        });
    },
    helper:     function (callback) {
        fastly.purge('somedomain.com', '/test', function (err, result) {
            callback(null, err);
        });
    }
}, function (err, obj) {
    test('request handling', function (t) {
        t.equal(obj.request, 'Authentication required.', 'should return authentication error');
        t.equal(obj.helper, 'Authentication required.', 'should return authentication error');
        t.end();
    });
});