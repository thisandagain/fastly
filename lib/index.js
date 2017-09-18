var request = require('request');

/**
 * Constructor
 * @param {string} apikey API key for Fastly API
 */
function Fastly (apikey) {
    this.apikey = apikey || '';
}

/**
 * Adapter helper method.
 *
 * @param {string} method HTTP method
 * @param {string} url API service endpoint
 * @param {params} params Optional params to update
 * @callback {object}
 */
Fastly.prototype.request = function (method, url, params, callback) {
    var self = this;

    // Allow for optional update params.
    if (typeof params === 'function') {
        callback = params;
        params = null;
    }

    // Construct headers
    var headers = {
        'fastly-key': self.apikey,
        'accept': 'application/json'
    };

    // HTTP request
    request({
        method: method,
        url: 'https://api.fastly.com' + url,
        headers: headers,
        form: params
    }, function (err, response, body) {
        if (response) {
            var statusCode = response.statusCode;
            if (!err && (statusCode < 200 || statusCode > 302))
                err = new Error(body);
            if (err) err.statusCode = statusCode;
        }
        if (err) return callback(err);
        if (response.headers['content-type'].indexOf('application/json') === 0) {
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
    var params = { '*': url };
    this.request('PURGE', '/', params, callback);
};

Fastly.prototype.purgeAll = function (service, callback) {
    var url = '/service/' + encodeURIComponent(service) + '/purge_all';
    this.request('POST', url, callback);
};

Fastly.prototype.softPurge = function (host, url, callback) {
    var params = {
        'fastly-soft-purge': 1,
        '*': url
    };
    this.request('PURGE', '/', params, callback);
};

Fastly.prototype.softPurgeAll = function (service, callback) {
    var url = '/service/' + encodeURIComponent(service) + '/purge_all';
    var params = { 'fastly-soft-purge': 1 };
    this.request('POST', url, params, callback);
};

Fastly.prototype.purgeKey = function (service, key, callback) {
    var url = '/service/' + encodeURIComponent(service) + '/purge/' + key;
    this.request('POST', url, callback);
};

Fastly.prototype.softPurgeKey = function (service, key, callback) {
    var url = '/service/' + encodeURIComponent(service) + '/purge/' + key;
    var params = { 'fastly-soft-purge': 1 };
    this.request('POST', url, params, callback);
};

Fastly.prototype.stats = function (service, callback) {
    var url = '/service/' + encodeURIComponent(service) + '/stats/summary';
    this.request('GET', url, callback);
};

Fastly.prototype.datacenters = function (callback) {
    this.request('GET', '/datacenters', callback);
};

Fastly.prototype.publicIpList = function (callback) {
    this.request('GET', '/public-ip-list', callback);
};

Fastly.prototype.edgeCheck = function (checkUrl, callback) {
    var url = '/content/edge_check?url=' + encodeURIComponent(checkUrl);
    this.request('GET', url, callback);
};

/**
 * Export
 */
module.exports = function (apikey) {
    return new Fastly(apikey);
};
