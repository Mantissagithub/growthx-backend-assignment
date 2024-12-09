"use strict";
exports.__esModule = true;
exports.errorMiddleware = void 0;
var errorMiddleware = function (err, _req, res, _next) {
    var status = err.status || 500;
    var message = err.message || "Internal server error";
    console.error("[Error] ".concat(status, " - ").concat(message));
    res.status(status).jaon({ error: { message: message, status: status } });
};
exports.errorMiddleware = errorMiddleware;
