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
    <tr>
        <th width="25%" valign="top">Method</td>
        <th width="65%" valign="top">Description</td>
        <th width="10%" valign="top"></td>
    </tr>
    <tr>
        <td valign="top">purge</td>
        <td valign="top">Purging removes content from Fastly so it can be refreshed from your origin servers.</td>
        <td valign="top">[Link](http://www.fastly.com/docs/api#purge)</td>
    </tr>
    <tr>
        <td valign="top">stats</td>
        <td valign="top">Stats give you information on the usage and performance of your Service.</td>
        <td valign="top">[Link](http://www.fastly.com/docs/api#stats)</td>
    </tr>
</table>

### Testing
```bash
npm test
```