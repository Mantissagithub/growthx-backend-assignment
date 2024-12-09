"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
;
var assignmentSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true, minLength: 10, maxLength: 500 },
    userId: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'User' },
    adminId: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'Admin' },
    status: { type: String, required: true, "enum": ['pending', 'accepted', 'rejected'] }
}, { timestamps: true });
var Assignment = mongoose_1["default"].model('Assignment', assignmentSchema);
exports["default"] = Assignment;
