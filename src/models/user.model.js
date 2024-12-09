"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    userId: { type: String, required: true, unique: true },
    role: { type: String, required: true, "enum": ['user', 'admin'] },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minLength: 6 },
    assignments: [{ type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'Assignment' }]
}, { timestamps: true });
var User = mongoose_1["default"].model('User', userSchema);
exports["default"] = User;
