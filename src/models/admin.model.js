"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
;
var adminSchema = new mongoose_1["default"].Schema({
    adminId: { type: String, required: true, unique: true },
    role: { type: String, required: true, "enum": ['admin'] },
    name: { type: String, required: true },
    adminEmail: { type: String, required: true, unique: true, lowercase: true, trim: true },
    adminPassword: { type: String, required: true },
    assignedAssignments: [{ type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'Assignment' }],
    acceptedAssignments: [{ type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'Assignment' }],
    rejectedAssignments: [{ type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'Assignment' }]
}, { timestamps: true });
// adminSchema.pre('save', function(next){
//     this.updatedAt = Date.now();
//     next();
// });
var Admin = mongoose_1["default"].model('Admin', adminSchema);
exports["default"] = Admin;
