"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var user_1 = require("../controllers/user");
/* GET users listing. */
router.post('/api/signup', function (req, res, next) {
    (0, user_1.createUser)(req, res);
});
// /* post data. */
router.post('/api/login', function (req, res, next) {
    (0, user_1.login)(req, res);
});
exports.default = router;
