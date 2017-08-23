var request = require('request');
var path = require('path');

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
        url: path.join('https://api.fastly.com', url),
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

Fastly.prototype.createDictionary = function (service, version, name, callback) {
  var url = path.join(
    'service', encodeURIComponent(service), 'version', encodeURIComponent(version), 'dictionary'
  );

  var params = { 'name': name };
  this.request('POST', url, params, callback);
}

Fastly.prototype.getDictionaries = function (service, version, callback) {
  var url = path.join(
    'service', encodeURIComponent(service), 'version', encodeURIComponent(version) 'dictionary'
  );

  this.request('GET', url, callback);
}

Fastly.prototype.getDictionary = function (service, version, name, callback) {
  var url = path.join(
    'service', encodeURIComponent(service), 'version', encodeURIComponent(version), 'dictionary', encodeURIComponent(name)
  );

  this.request('GET', url, callback);
}

Fastly.prototype.createDictionaryItem = function (service, dictionary, key, value, callback) {
  var url = path.join(
    'service', encodeURIComponent(service), 'dictionary', encodeURIComponent(dictionary), 'item'
  );

  var params = { key: value };
  this.request('POST', url, params, callback);
}

Fastly.prototype.getDictionaryItems = function (service, dictionary, callback) {
  var url = path.join(
    'service', encodeURIComponent(service), 'dictionary', encodeURIComponent(dictionary) 'item'
  );

  this.request('GET', url, callback);
}

Fastly.prototype.getDictionaryItem = function (service, dictionary, item, callback) {
  var url = path.join(
    'service', encodeURIComponent(service), 'dictionary', encodeURIComponent(dictionary) 'item', encodeURIComponent(item)
  );

  this.request('GET', url, callback);
}

/**
 * Export
 */
module.exports = function (apikey) {
    return new Fastly(apikey);
};
