/**
 * Fastly API client for Node.js
 *
 * @package fastly 
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var Adapter = require('./adapter');

/**
 * Constructor
 */
function Fastly () {
    this.adapter = null;
}

/**
 * Attaches a new API adapter instance using the specified API key.
 *
 * @param {String} API key (see: http://fastly.com/)
 *
 * @return {Error}
 */
Fastly.prototype.authenticate = function (key, callback) {
    this.adapter = new Adapter(key);
};

/**
 * Adapter helper method.
 *
 * @param {String} Method
 * @param {String} URL
 *
 * @return {Object}
 */
Fastly.prototype.request = function () {
    if (this.adapter === null) return arguments[arguments.length-1]('Authentication required.');
    this.adapter.apply(this, arguments);
};

// -------------------------------------------------------

Fastly.prototype.purge = function (host, url, callback) {
    this.request('PURGE', url, host, callback);
};

Fastly.prototype.backends = function (service, version, callback) {
    var url = encodeURIComponent(serviceId) + '/version/' + version;
    this.request('GET', url, callback);
};

Fastly.prototype.backend = function (service, version, name, callback) {
    var url = encodeURIComponent(serviceId) + '/version/' + version + '/backend/' + encodeURIComponent(name);
    this.request('GET', url, callback);
};

Fastly.prototype.stats = function (service, type, callback) {
    var url = encodeURIComponent(serviceId) + '/stats/' + type;
    this.request('GET', url, callback);
};

/**
 * Export
 */
module.exports = new Fastly();