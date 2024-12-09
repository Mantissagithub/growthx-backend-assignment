"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.markAssignmentPending = exports.completeAssignment = exports.rejectAssignment = exports.acceptAssignment = exports.updateAssignmentStatus = exports.getAssignnments = exports.updateAdminProfile = exports.getAdmins = exports.adminLogin = exports.registerAdmin = void 0;
var uuid_1 = require("uuid");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var admin_model_1 = require("../models/admin.model");
var assignment_model_1 = require("../models/assignment.model");
var jwt_secret = process.env.JwT_SECRET || "defaultSecret";
var registerAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, confirmPassword, existingAdmin, adminId, hashedPassword, newAdmin, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword;
                if (password != confirmPassword) {
                    return [2 /*return*/, res.status(400).json({ message: 'Passwrods do not match' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, admin_model_1["default"].findOne({ adminEmail: email })];
            case 2:
                existingAdmin = _b.sent();
                if (existingAdmin) {
                    return [2 /*return*/, res.status(400).json({ message: 'Admin already exists' })];
                }
                adminId = (0, uuid_1.v4)();
                return [4 /*yield*/, bcrypt_1["default"].hash(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                newAdmin = new admin_model_1["default"]({
                    adminId: adminId,
                    name: name,
                    adminEmail: email,
                    adminPassword: hashedPassword,
                    role: 'admin'
                });
                return [4 /*yield*/, newAdmin.save()];
            case 4:
                _b.sent();
                token = jsonwebtoken_1["default"].sign({ adminId: adminId, email: email, role: 'admin' }, jwt_secret, { expiresIn: '1hr' });
                res.status(201).json({ message: 'Admin registered successfully', token: token });
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.error('[AdminController] Error during registration: ', err_1);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.registerAdmin = registerAdmin;
var adminLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, admin, validPassword, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, admin_model_1["default"].findOne({ adminEmail: email })];
            case 2:
                admin = _b.sent();
                if (!admin) {
                    return [2 /*return*/, res.status(400).json({ message: 'Email not found' })];
                }
                return [4 /*yield*/, bcrypt_1["default"].compare(password, admin.adminPassword)];
            case 3:
                validPassword = _b.sent();
                if (!validPassword) {
                    return [2 /*return*/, res.status(401).json({ message: 'Incorrect password' })];
                }
                token = jsonwebtoken_1["default"].sign({ adminId: admin.adminId, email: email, role: 'admin' }, jwt_secret, { expiresIn: '1hr' });
                res.status(200).json({ message: 'Admin Logged in successfully' });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error('[AdminController] Errror during login: ', error_1);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.adminLogin = adminLogin;
var getAdmins = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var admins, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, admin_model_1["default"].find().select('adminId name adminEmail createdAt')];
            case 1:
                admins = _a.sent();
                res.status(200).json({ admins: admins });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('[AdminCOntroller] Error fetching admins: ', error_2);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAdmins = getAdmins;
var updateAdminProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, newPassword, admin, validPassword, _b, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, newPassword = _a.newPassword;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 8, , 9]);
                return [4 /*yield*/, admin_model_1["default"].findOne({ adminId: req.user.adminId })];
            case 2:
                admin = _c.sent();
                if (!(password && newPassword)) return [3 /*break*/, 5];
                return [4 /*yield*/, bcrypt_1["default"].compare(password, admin === null || admin === void 0 ? void 0 : admin.adminPassword)];
            case 3:
                validPassword = _c.sent();
                if (!validPassword) {
                    return [2 /*return*/, res.status(400).status({ message: 'Current password is incorrect' })];
                }
                _b = admin;
                return [4 /*yield*/, bcrypt_1["default"].hash(newPassword, 10)];
            case 4:
                _b.adminPassword = _c.sent();
                _c.label = 5;
            case 5:
                if (!admin) return [3 /*break*/, 7];
                admin.name = name || admin.name;
                admin.adminEmail = email || admin.adminEmail;
                return [4 /*yield*/, admin.save()];
            case 6:
                _c.sent();
                _c.label = 7;
            case 7:
                res.status(200).json({ message: "Profile updated successfully" });
                return [3 /*break*/, 9];
            case 8:
                error_3 = _c.sent();
                console.error('[AdminController] Error updating profile: ', error_3);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.updateAdminProfile = updateAdminProfile;
var getAssignnments = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var assignments, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, assignment_model_1["default"].find().populate('userId adminId', 'fullName name')];
            case 1:
                assignments = _a.sent();
                res.status(200).json({ assignments: assignments });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error('[AdminController] Error fetching assignments: ', error_4);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAssignnments = getAssignnments;
var updateAssignmentStatus = function (req, res, status) { return __awaiter(void 0, void 0, void 0, function () {
    var id, assignment, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params;
                return [4 /*yield*/, assignment_model_1["default"].findOne({ id: id })];
            case 1:
                assignment = _a.sent();
                if (!assignment) {
                    return [2 /*return*/, res.status(404).json({ message: 'Assignment not found' })];
                }
                assignment.status = status;
                return [4 /*yield*/, assignment.save()];
            case 2:
                _a.sent();
                res.status(200).json({ message: "Assignment marked as ".concat(status) });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error('[AdminController] Error updating the assignment status: ', error_5);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateAssignmentStatus = updateAssignmentStatus;
var acceptAssignment = function (req, res) {
    (0, exports.updateAssignmentStatus)(req, res, 'accepted');
};
exports.acceptAssignment = acceptAssignment;
var rejectAssignment = function (req, res) {
    (0, exports.updateAssignmentStatus)(req, res, 'rejected');
};
exports.rejectAssignment = rejectAssignment;
var completeAssignment = function (req, res) {
    (0, exports.updateAssignmentStatus)(req, res, 'completed');
};
exports.completeAssignment = completeAssignment;
var markAssignmentPending = function (req, res) {
    (0, exports.updateAssignmentStatus)(req, res, 'pending');
};
exports.markAssignmentPending = markAssignmentPending;
