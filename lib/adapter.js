/**
 * Fastly API adapter.
 *
 * @package fastly 
 * @author Andrew Sliwinski <andrew@diy.org
 */

/**
 * Dependencies
 */
var request = require('request');
            
/**
 * Constructor
 *
 * @param {String} Fastly API key (see: http://www.fastly.com/docs/api)
 */
function Adapter (apikey) {
    /**
     * Generic API interface.
     *
     * @param {String} HTTP method
     * @param {String} URL
     * @param {String, Optional} Hostname
     *
     * @return {Object}
     */
    return function (method, url, host, callback) {
        // Parse optional arguments
        if (typeof callback === 'undefined') {
            callback    = host; 
            host        = null;
        }

        // Construct headers
        var headers     = { 'X-Fastly-Key': apikey };
        if (host) headers['Host'] = host;

        // Perform HTTP request
        request({
            method:     method,
            url:        'https://api.fastly.com/service/' + url,
            headers:    headers,
            json:       {}
        }, function (err, response, body) {
            if (err) return callback(err);
            if (response.code < 200 || response.code > 302) return callback(body);
            callback(null, body);
        });
    }
}

/**
 * Export
 */
module.exports = Adapter;