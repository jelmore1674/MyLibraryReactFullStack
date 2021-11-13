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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.redisClient = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var redis_1 = __importDefault(require("redis"));
var models_1 = require("../models");
exports.redisClient = redis_1.default.createClient(process.env.REDIS_URI);
function signToken(email) {
    var jwtPayload = { email: email };
    return jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        return Promise.reject({ error: 'unable to verify token' });
    }
}
var setToken = function (key, value) {
    console.log('set token');
    return Promise.resolve(exports.redisClient.set(key, value));
};
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.getAuthTokenId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var authorization, data;
        return __generator(this, function (_a) {
            authorization = req.headers.authorization;
            try {
                if (authorization) {
                    data = verifyToken(authorization);
                    if (data) {
                        exports.redisClient.get(authorization, function (err, reply) {
                            if (err || !reply) {
                                return (res.status(401) &&
                                    res.json({ error: 'unauthorized' }));
                            }
                            else {
                                res.json({ id: reply });
                            }
                        });
                    }
                    else {
                        throw new Error('unauthorized');
                    }
                }
                else {
                    throw new Error('unauthorized');
                }
            }
            catch (err) {
                res.json({ message: 'Unauthorized' });
            }
            return [2 /*return*/];
        });
    }); };
    Auth.createSessions = function (user) {
        // Create JWT, return user data
        var email = user.email, userid = user.userid;
        var token = signToken(email);
        return setToken(token, userid.toString())
            .then(function () {
            return { success: true, userId: userid, token: token };
        })
            .catch(console.error);
    };
    Auth.userSignin = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
        var data, isValid, user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!email || !password) {
                        throw new Error('Please enter email and password');
                    }
                    return [4 /*yield*/, models_1.UserModel.getUserHashByEmail(email)];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    if (!data) {
                        throw new Error('User not found');
                    }
                    if (!data) return [3 /*break*/, 5];
                    return [4 /*yield*/, bcrypt_1.default.compareSync(password, data.hash)];
                case 2:
                    isValid = _a.sent();
                    if (!isValid) return [3 /*break*/, 4];
                    return [4 /*yield*/, models_1.UserModel.getUserByEmail(email)];
                case 3:
                    user = _a.sent();
                    return [2 /*return*/, Promise.resolve(user)];
                case 4: return [2 /*return*/, Promise.reject('password incorrect')];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_1)];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    Auth.requireAuth = function (req, res, next) {
        var authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ error: 'unauthorized' });
        }
        return exports.redisClient.get(authorization, function (err, reply) {
            if (err || !reply) {
                return res.status(401).json({ error: 'unauthorized' });
            }
            else {
                return next();
            }
        });
    };
    return Auth;
}());
exports.Auth = Auth;
