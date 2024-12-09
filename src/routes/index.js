"use strict";
exports.__esModule = true;
var express_1 = require("express");
var admin_routes_1 = require("./admin.routes");
var user_routes_1 = require("./user.routes");
var router = (0, express_1.Router)();
router.use('/admin', admin_routes_1["default"]);
router.use('/user', user_routes_1["default"]);
exports["default"] = router;
