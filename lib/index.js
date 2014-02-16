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
 *
 * @return {Object}
 */
Fastly.prototype.request = function (method, url, callback) {
    var self = this;

    // Construct headers
    var headers = { 'x-fastly-key': self.apikey };

    // HTTP request
    request({
        method:     method,
        url:        'https://api.fastly.com' + url,
        headers:    headers
    }, function (err, response, body) {
        if (err) return callback(err);
        if (response.statusCode < 200 || response.statusCode > 302)
            return callback(body);
        if (response.headers['content-type'] === 'application/json') {
            try {
                body = JSON.parse(body);
            } catch (er) {
                return callback(er);
            }
        }
        callback(null, body);
    });
};

// -------------------------------------------------------

Fastly.prototype.purge = function (host, url, callback) {
    this.request('POST', '/purge/' + host + url, callback);
};

Fastly.prototype.purgeAll = function (service, callback) {
    var url = '/service/' + encodeURIComponent(service) + '/purge_all';
    this.request('POST', url, callback);
};

Fastly.prototype.purgeKey = function (service, key, callback) {
    var url = '/service/' + encodeURIComponent(service) + '/purge/' + key;
    this.request('POST', url, callback);
};

Fastly.prototype.stats = function (service, callback) {
    var url = '/service/' + encodeURIComponent(service) + '/stats/summary';
    this.request('GET', url, callback);
};

/**
 * Export
 */
module.exports = function (apikey) {
    return new Fastly(apikey);
};
