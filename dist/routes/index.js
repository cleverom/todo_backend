"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var paths = path_1.default.join(__dirname, '../../database.json');
var todoList_1 = require("../controllers/todoList");
var database;
// to dynamically produce database.json file if not existing
if (fs_1.default.existsSync(paths)) {
    database = require(paths);
}
// /* GET all data. */
router.get('/api/data', function (req, res, next) {
    (0, todoList_1.getAll)(req, res, next);
});
// /* GET data by id. */
router.get('/api/data/:id', function (req, res, next) {
    (0, todoList_1.getData)(req, res, next);
});
// /* post data. */
router.post('/api/data/todo', function (req, res, next) {
    (0, todoList_1.postData)(req, res, next);
});
// /* update single data. */
router.put('/api/data/todo/:id', function (req, res, next) {
    (0, todoList_1.updateData)(req, res, next);
});
// /* cahnge status. */
router.put('/api/data/status/:id', function (req, res, next) {
    (0, todoList_1.changeStatus)(req, res, next);
});
// /* delete data by id. */
router.delete('/api/data/:id', function (req, res, _next) {
    (0, todoList_1.deleteData)(req, res, _next);
});
exports.default = router;
