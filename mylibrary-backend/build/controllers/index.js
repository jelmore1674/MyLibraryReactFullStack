"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
var AppRouter_1 = require("../AppRouter");
require("./LibraryController");
require("./RegisterController");
require("./SignInController");
require("./UserController");
exports.AppRoutes = AppRouter_1.AppRouter.getInstance();
