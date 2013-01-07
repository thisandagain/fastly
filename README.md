## fastly
### [Fastly](http://www.fastly.com) API client for Node.js

[![Build Status](https://secure.travis-ci.org/thisandagain/fastly.png)](http://travis-ci.org/thisandagain/fastly)

### Installation
```bash
npm install fastly
```

### Basic Use
```javascript
var fastly = require('fastly');

fastly.authenticate('yourapikey');
fastly.purge('myhost.com', '/cats', function (err, obj) {
    if (err) {
        console.dir(err);   // Oh no!
    } else {
        console.dir(obj);   // Contains the response body from the fastly API
    }
});
```

### Helper Methods
<table width="100%">
    <thead>
        <tr>
            <td width="25%">Method</td>
            <td width="65%">Description</td>
            <td width="10%"></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>purge</td>
            <td>Purging removes content from Fastly so it can be refreshed from your origin servers.</td>
            <td>[Link](http://www.fastly.com/docs/api#purge)</td>
        </tr>
        <tr>
            <td>stats</td>
            <td>Stats give you information on the usage and performance of your Service.</td>
            <td>[Link](http://www.fastly.com/docs/api#stats)</td>
        </tr>
    </tbody>
</table>

### Testing
```bash
npm test
```