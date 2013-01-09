/**
 * Technical debt CI clamp.
 *
 * @package fastly
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var bux     = require('codebux'),
    test    = require('tap').test;

/**
 * Test
 */
bux(__dirname + '/../lib', function (err, obj) {
    test('Debt', function (t) {
        t.equal(err, null, 'Errors should be null');
        t.type(obj, 'number', 'Results should be a number');
        t.ok(obj > 80, 'Total should be greater than 80');
        t.end();
    });
});