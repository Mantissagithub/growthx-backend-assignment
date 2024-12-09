"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var db_1 = require("./config/db");
var dotenv_config_1 = require("./config/dotenv.config");
var error_middleware_1 = require("./middlewares/error.middleware");
var index_1 = require("./routes/index");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
(0, dotenv_config_1["default"])();
(0, db_1["default"])();
app.use(express_1["default"].json());
app.use("/api", index_1["default"]);
app.use(error_middleware_1.errorMiddleware);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});
