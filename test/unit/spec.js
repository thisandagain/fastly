var test    = require('tap').test;
var fastly  = require(__dirname + '/../../lib/index.js');

test('spec', function (t) {
    t.type(fastly, 'function', 'module is a function');
    var f = fastly('apikey');

    t.type(f, 'object', 'module exposes an object');
    t.type(f.request, 'function', 'request method exists');
    t.type(f.purge, 'function', 'purge method exists');
    t.type(f.purgeAll, 'function', 'purgeAll method exists');
    t.type(f.softPurge, 'function', 'purge method exists');
    t.type(f.softPurgeAll, 'function', 'purgeAll method exists');
    t.type(f.purgeKey, 'function', 'purgeKey method exists');
    t.type(f.softPurgeKey, 'function', 'softPurgeKey method exists');
    t.type(f.stats, 'function', 'stats method exists');
    t.type(f.datacenters, 'function', 'datacenters method exists');
    t.type(f.publicIpList, 'function', 'publicIpList method exists');
    t.type(f.edgeCheck, 'function', 'edgeCheck method exists');
    t.type(f.createDictionary, 'function', 'createDictionary method exists');
    t.type(f.getDictionaries, 'function', 'getDictionaries method exists');
    t.type(f.getDictionary, 'function', 'getDictionary method exists');
    t.type(f.createDictionaryItem, 'function', 'createDictionaryItem method exists');
    t.type(f.getDictionaryItems, 'function', 'getDictionaryItems method exists');
    t.type(f.getDictionaryItem, 'function', 'getDictionaryItem method exists');
    t.end();
});
