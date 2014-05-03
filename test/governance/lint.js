/**
 * Linter.
 *
 * @package api
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var hint    = require('hint-hint');
var config  = require('../fixtures/jshint.json');

/**
 * Export
 */
hint(__dirname + '/../../lib/*.js', config);
