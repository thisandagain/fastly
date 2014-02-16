## fastly
### [Fastly](http://www.fastly.com) API client for Node.js

[![Build Status](https://travis-ci.org/thisandagain/fastly.png?branch=master)](https://travis-ci.org/thisandagain/fastly)

### Installation
```bash
npm install fastly
```

### Basic Use
```javascript
var fastly = require('fastly')('yourapikey');

fastly.request('GET', '/content/edge_check?url=mysite.com/foo', function (err, obj) {
    if (err) return console.dir(err);   // Oh no!
    console.dir(obj);                   // Response body from the fastly API
});
```

### Helper Methods
The fastly module also includes a few limited "helper" methods that make working with common API resources a bit simpler:

<table width="100%">
    <tr>
        <th width="20%">Method</td>
        <th width="75%">Example</td>
        <th width="5%"></td>
    </tr>
    <tr>
        <td>purge</td>
        <td><pre lang="javascript"><code>fastly.purge('host.com', '/index.html', callback);</code></pre></td>
        <td><a href="http://www.fastly.com/docs/api#purge">Link</a></td>
    </tr>
    <tr>
        <td>purgeAll</td>
        <td><pre lang="javascript"><code>fastly.purgeAll('myServiceId', callback);</code></pre></td>
        <td><a href="http://www.fastly.com/docs/api#purge">Link</a></td>
    </tr>
    <tr>
        <td>purgeKey</td>
        <td><pre lang="javascript"><code>fastly.purgeKey('myServiceId', 'key', callback);</code></pre></td>
        <td><a href="http://www.fastly.com/docs/api#purge">Link</a></td>
    </tr>
    <tr>
        <td>stats</td>
        <td><pre lang="javascript"><code>fastly.stats('myServiceId', callback);</code></pre></td>
        <td><a href="http://www.fastly.com/docs/api#stats">Link</a></td>
    </tr>
</table>

### Testing
```bash
npm test
```
