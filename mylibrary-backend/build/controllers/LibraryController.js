"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var decorators_1 = require("./decorators");
var LibraryController = /** @class */ (function () {
    function LibraryController() {
    }
    LibraryController.prototype.addToLibrary = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, author, pages, completed, userid, email, newBook, addBook, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, author = _a.author, pages = _a.pages, completed = _a.completed, userid = _a.userid, email = _a.email;
                        newBook = {
                            userid: userid,
                            title: title,
                            author: author,
                            pages: pages,
                            completed: completed,
                            email: email,
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, models_1.LibraryModel.addBook(newBook)];
                    case 2:
                        addBook = _b.sent();
                        if (addBook === 'Success') {
                            res.status(201).json('Successfully added book');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        res.status(401).json(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LibraryController.prototype.updateLibrary = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, update, id, completed, updatedBook, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, update = _a.update, id = _a.id, completed = _a.completed;
                        if (!update) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, models_1.LibraryModel.updateCompletedStatus(id, completed)];
                    case 2:
                        updatedBook = _b.sent();
                        res.status(202).json(updatedBook);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _b.sent();
                        res.status(406).json(err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LibraryController.prototype.removeBook = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, remove, id, removedBook, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, remove = _a.remove, id = _a.id;
                        if (!remove) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, models_1.LibraryModel.removeBook(id)];
                    case 2:
                        removedBook = _b.sent();
                        res.status(202).json(removedBook);
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _b.sent();
                        res.status(400).json(err_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LibraryController.prototype.displayLibrary = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userid, user, library, library_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userid = parseInt(req.params.userid);
                        return [4 /*yield*/, models_1.UserModel.getUserByID(userid)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, models_1.LibraryModel.getLibrary(user)];
                    case 2:
                        library = _a.sent();
                        if (!(library.length === 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, models_1.LibraryModel.createDefaultLibrary(user)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, models_1.LibraryModel.getLibrary(user)];
                    case 4:
                        library_1 = _a.sent();
                        res.status(202).json(library_1);
                        return [3 /*break*/, 6];
                    case 5:
                        res.status(202).json(library);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decorators_1.post('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], LibraryController.prototype, "addToLibrary", null);
    __decorate([
        decorators_1.put('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], LibraryController.prototype, "updateLibrary", null);
    __decorate([
        decorators_1.del('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], LibraryController.prototype, "removeBook", null);
    __decorate([
        decorators_1.get('/:userid'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], LibraryController.prototype, "displayLibrary", null);
    LibraryController = __decorate([
        decorators_1.controller('/library-item')
    ], LibraryController);
    return LibraryController;
}());
