const proxy = require('http-proxy-middleware');

module.exports = function(app) {
   app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
};

// needed for create react app 2.0 and higher
