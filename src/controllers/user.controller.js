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
exports.deleteUser = exports.updateUser = exports.getCurrentUser = exports.getAdmins = exports.uploadAssignment = exports.userLogin = exports.userRegister = void 0;
var uuid_1 = require("uuid");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var admin_model_1 = require("../models/admin.model");
var assignment_model_1 = require("../models/assignment.model");
var user_model_1 = require("../models/user.model");
var jwt_secret = process.env.JwT_SECRET || "defaultSecret";
var userRegister = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullName, email, password, confirmPassword, existingUser, userId, hashedPassword, newUser, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.bidy, fullName = _a.fullName, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword;
                if (password != confirmPassword) {
                    return [2 /*return*/, res.status(400).json({ message: 'Passwirds do not match' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, user_model_1["default"].findOne({ email: email })];
            case 2:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({ message: 'User already exists' })];
                }
                userId = (0, uuid_1.v4)();
                return [4 /*yield*/, bcrypt_1["default"].hash(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                newUser = new user_model_1["default"]({
                    fullName: fullName,
                    email: email,
                    password: hashedPassword,
                    userId: userId,
                    role: 'user'
                });
                return [4 /*yield*/, newUser.save()];
            case 4:
                _b.sent();
                token = jsonwebtoken_1["default"].sign({ userId: userId, email: email, role: 'user' }, jwt_secret, { expiresIN: '1hr' });
                res.status(201).json({ message: 'User resistered successfully' });
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.error('[UserControler] Error during registration: ', err_1);
                res.status(500).jaon({ message: 'Server error' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.userRegister = userRegister;
var userLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, validPassword, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1["default"].findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: 'Email not found' })];
                }
                return [4 /*yield*/, bcrypt_1["default"].compare(password, user.password)];
            case 3:
                validPassword = _b.sent();
                if (!validPassword) {
                    return [2 /*return*/, res.status(400).json({ message: "Incorrect password" })];
                }
                token = jsonwebtoken_1["default"].sign({ userId: user.userId, email: email, role: user.role }, jwt_secret, { expiresIn: '1hr' });
                res.status(200).json({ message: "User Logged in successfully" });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error("[UserController] Error during login: ", error_1);
                res.status(500).json({ message: "Internal server" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.userLogin = userLogin;
var uploadAssignment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, task, adminEMail, userId, id, user, admin, newAssignment, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, task = _a.task, adminEMail = _a.adminEMail;
                userId = req.user.userId;
                id = (0, uuid_1.v4)();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, user_model_1["default"].findOne({ userId: userId })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: "User not found." })];
                }
                return [4 /*yield*/, admin_model_1["default"].findOne({ adminEMail: adminEMail })];
            case 3:
                admin = _b.sent();
                if (!admin) {
                    return [2 /*return*/, res.status(400).json({ message: "Admin not found." })];
                }
                newAssignment = new assignment_model_1["default"]({
                    id: id,
                    task: task,
                    userId: user._id,
                    adminId: admin._id
                });
                return [4 /*yield*/, newAssignment.save()];
            case 4:
                _b.sent();
                user.assignments.push(newAssignment.id);
                admin.assignedAssignments.push(newAssignment.id);
                return [4 /*yield*/, Promise.all([user.save(), admin.save()])];
            case 5:
                _b.sent();
                res.status(200).json({ message: "Assignment uploaded successfully" });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                console.error("UserController] Error uploading assignment: ", error_2);
                res.status(500).json({ message: "INternal server error" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.uploadAssignment = uploadAssignment;
var getAdmins = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var admins, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, admin_model_1["default"].find({}, 'adminId name adminEmail')];
            case 1:
                admins = _a.sent();
                return [2 /*return*/, res.status(200).json({ admins: admins })];
            case 2:
                err_2 = _a.sent();
                console.error("[UserController] Error fetching admins : ", err_2);
                res.status(500).json({ message: "Internal server" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAdmins = getAdmins;
var getCurrentUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1["default"].findOne({ userId: req.user.userId }).select('-password')];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                }
                return [2 /*return*/, res.status(200).json(user)];
            case 2:
                error_3 = _a.sent();
                console.error("[UserController] Eroor fetching current user: ", error_3);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCurrentUser = getCurrentUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullName, email, updatedUser, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, fullName = _a.fullName, email = _a.email;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_model_1["default"].findOneAndUpdate({ userId: req.user.userId }, { fullName: fullName, email: email }, { "new": true }).select('-password')];
            case 2:
                updatedUser = _b.sent();
                if (!updatedUser) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                return [2 /*return*/, res.status(200).json(exports.updateUser)];
            case 3:
                error_4 = _b.sent();
                console.error("[UserController] Error updating user: ", error_4);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedUser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1["default"].findOneAndDelete({ userId: req.user.userId })];
            case 1:
                deletedUser = _a.sent();
                if (!deletedUser) {
                    return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                }
                res.status(200).json({ message: "User deleted successfully" });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error("[UserController] Erro deleting user : ", err_3);
                res.status(500).json({ message: "Internal sevre error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
