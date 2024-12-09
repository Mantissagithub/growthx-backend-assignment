"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var loadEnvCongifMongoDB = function () {
    var envFile = ".env.".concat(process.env.NODE_ENV || 'development');
    dotenv_1["default"].config({ path: envFile });
    if (!process.env.MONGODB_URI) {
        console.warn("Warning : MONGODB_URI is not set in ".concat(envFile));
    }
};
exports["default"] = loadEnvCongifMongoDB;
