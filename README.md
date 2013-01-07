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

### Testing
```bash
npm test
```