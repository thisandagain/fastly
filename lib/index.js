/**
 * Fastly API client.
 *
 * @package fastly 
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var request = require('request');

/**
 * Constructor
 */
function Fastly (apikey) {
    this.apikey = apikey || '';
}

/**
 * Adapter helper method.
 *
 * @param {string} Method
 * @param {string} URL
 * @param {string, optional} Host
 *
 * @return {Object}
 */
Fastly.prototype.request = function (method, uri, host, callback) {
    var self = this;

    // Handle params
    if (typeof callback === 'undefined') {
        callback = host;
        host = false;
    }

    // Construct headers
    var headers = { 'X-Fastly-Key': self.apikey };
    if (host) headers.Host = host;

    // HTTP request
    request({
        method:     method,
        url:        'https://api.fastly.com' + url,
        headers:    headers,
        json:       {}
    }, function (err, response, body) {
        if (err) return callback(err);
        if (response.code < 200 || response.code > 302) return callback(body);
        callback(null, body);
    });
};

// -------------------------------------------------------

Fastly.prototype.purge = function (host, url, callback) {
    this.request('PURGE', url, host, callback);
};

Fastly.prototype.purgeAll = function (service, callback) {
    var url = '/' + encodeURIComponent(service) + '/purge_all';
    this.request('POST', url, callback);
};

Fastly.prototype.purgeKey = function (service, key, callback) {
    var url = '/' + encodeURIComponent(service) + '/purge/' + key;
    this.request('POST', url, callback);
};

Fastly.prototype.stats = function (service, callback) {
    var url = '/' + encodeURIComponent(service) + '/stats/summary';
    this.request('GET', url, callback);
};

/**
 * Export
 */
module.exports = function (apikey) {
    return new Fastly(apikey);
};