"use strict";
exports.__esModule = true;
exports.authMiddleware = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var jwt_secret = process.env.JWT_SECRET || "defaultSecret";
var authMiddleware = function (roles) {
    if (roles === void 0) { roles = []; }
    return function (req, res, next) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Acess denied : NO token provided' });
        }
        var token = authHeader.split('')[1];
        jsonwebtoken_1["default"].verify(token, jwt_secret, function (err, decoded) {
            if (err) {
                return res.status(403).json({ message: 'INvalid or expired Token' });
            }
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden : Insufficient permissions' });
            }
            next();
        });
    };
};
exports.authMiddleware = authMiddleware;
