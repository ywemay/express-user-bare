var jwt = require('express-jwt');
const jwtAuth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
}).unless({
    path: ["/login", "/register"]
});

module.exports = { jwtAuth }