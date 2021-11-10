"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.getData = exports.postData = exports.changeStatus = exports.updateData = exports.deleteData = void 0;
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var uuid_1 = require("uuid");
var paths = path_1.default.join(__dirname, '../../database.json');
// type typing = string | number
var database;
// to dynamically produce database.json file if not existing
if (fs_1.default.existsSync(paths)) {
    database = require(paths);
}
var getAll = (function (req, res, next) {
    res.status(200).json(database);
});
exports.getAll = getAll;
var getData = (function (req, res, next) {
    var singleData = database.find(function (c) { return c.id === req.params.id; });
    if (!singleData)
        res.status(404).send("data not found");
    res.json(singleData);
});
exports.getData = getData;
var postData = (function (req, res, next) {
    var paths = path_1.default.join(__dirname, '../../database.json');
    var newData = {
        todo: req.body.todo,
        dateCreated: new Date(),
        dueDate: req.body.dueDate || "",
        done: req.body.done || false,
        id: (0, uuid_1.v4)()
    };
    if (!database) {
        database = [newData];
    }
    else {
        database.push(newData);
    }
    var newDatabase = JSON.stringify(database, null, 2);
    fs_1.default.writeFile(paths, newDatabase, function (err) {
        if (err)
            throw err;
    });
    res.status(201).json({ data: newData, message: "todo created successfully", status: true });
});
exports.postData = postData;
var updateData = (function (req, res, next) {
    var paths = path_1.default.join(__dirname, '../../database.json');
    var singleData = database.find(function (c) { return c.id === req.params.id; });
    if (!singleData)
        res.status(404).json("data not found");
    if (singleData) {
        var changeData = req.body;
        singleData.todo = changeData.todo || singleData.todo;
        singleData.dueDate = changeData.dueDtae || singleData.dueDate;
        fs_1.default.writeFile(paths, JSON.stringify(database, null, 2), function (err) {
            if (err)
                throw err;
        });
    }
    res.status(200).json({ singleData: singleData, message: "todo update successfully", status: true });
});
exports.updateData = updateData;
var changeStatus = (function (req, res, next) {
    var paths = path_1.default.join(__dirname, '../../database.json');
    var singleData = database.find(function (c) { return c.id === req.params.id; });
    if (!singleData)
        res.status(404).json("data not found");
    if (singleData) {
        var changeData = req.body;
        singleData.done = changeData.done || singleData.done;
        fs_1.default.writeFile(paths, JSON.stringify(database, null, 2), function (err) {
            if (err)
                throw err;
        });
    }
    res.status(200).json({ singleData: singleData, message: "task changed successfully", staus: true });
});
exports.changeStatus = changeStatus;
var deleteData = (function (req, res, next) {
    var paths = path_1.default.join(__dirname, '../../database.json');
    var singleData = database.find((function (c) { return c.id === req.params.id; }));
    if (!singleData)
        res.status(404).send("data not found");
    if (singleData) {
        database = database.filter(function (dat) { return dat.id !== req.params.id; });
        res.json({ message: "data deleted", database: database });
        fs_1.default.writeFile(paths, JSON.stringify(database, null, 2), function (err) {
            if (err)
                throw err;
        });
    }
    res.status(200).send({ message: "todo deleted successfully" });
});
exports.deleteData = deleteData;
