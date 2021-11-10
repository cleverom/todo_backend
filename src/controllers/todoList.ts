import express, { NextFunction } from 'express';
const router = express.Router();
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
const paths = path.join(__dirname, '../../database.json');

type PartialType = Array<{
    todo: string,
    dueDate: Date,
    done: boolean,
    id: string
}>

// type typing = string | number
let database: PartialType;

// to dynamically produce database.json file if not existing
if (fs.existsSync(paths)) {
    database = require(paths);
}
const getAll = ((req: express.Request, res: express.Response, next: NextFunction) => {
    res.status(200).json(database)
})

const getData = ((req: express.Request, res: express.Response, next: NextFunction) => {
    const singleData = database.find((c: any) => c.id === req.params.id)
    if (!singleData) res.status(404).send("data not found")
    res.json(singleData)
})


const postData = ((req: express.Request, res: express.Response, next: NextFunction) => {
    const paths = path.join(__dirname, '../../database.json')
    const newData = {
        todo: req.body.todo,
        dateCreated: new Date(),
        dueDate: req.body.dueDate || "",
        done: req.body.done || false,
        id: uuidv4()
    }


    if (!database) {
        database = [newData]
    } else {

        database.push(newData)
    }
    let newDatabase = JSON.stringify(database, null, 2)
    fs.writeFile(paths, newDatabase, (err: any) => {

        if (err) throw err
    })
    res.status(201).json({ data: newData, message: "todo created successfully", status: true })
})


const updateData = ((req: express.Request, res: express.Response, next: NextFunction) => {
    const paths = path.join(__dirname, '../../database.json')
    const singleData = database.find((c: any) => c.id === req.params.id);
    if (!singleData) res.status(404).json("data not found");
    if (singleData) {
        const changeData = req.body;

        singleData.todo = changeData.todo || singleData.todo
        singleData.dueDate = changeData.dueDtae || singleData.dueDate
        fs.writeFile(paths, JSON.stringify(database, null, 2), (err: any) => {
            if (err) throw err
        })
    }

    res.status(200).json({ singleData, message: "todo update successfully", status: true });
})

const changeStatus = ((req: express.Request, res: express.Response, next: NextFunction) => {
    const paths = path.join(__dirname, '../../database.json')
    const singleData = database.find((c: any) => c.id === req.params.id);
    if (!singleData) res.status(404).json("data not found");
    if (singleData) {
        const changeData = req.body;

        singleData.done = changeData.done || singleData.done
        fs.writeFile(paths, JSON.stringify(database, null, 2), (err: any) => {
            if (err) throw err
        })
    }

    res.status(200).json({ singleData, message: "task changed successfully", staus: true });
})


const deleteData = ((req: express.Request, res: express.Response, next: NextFunction) => {
    const paths = path.join(__dirname, '../../database.json')
    const singleData = database.find(((c: any) => parseInt(c.id) === parseInt(req.params.id)));
    if (!singleData) res.status(404).send("data not found")
    if (singleData) {
        database = database.filter((dat: any) => parseInt(dat.id) !== parseInt(req.params.id));
        res.json({ message: "data deleted", database });

        fs.writeFile(paths, JSON.stringify(database, null, 2), (err: any) => {
            if (err) throw err
        })
    }

    res.status(200).send({ message: "todo deleted successfully" });
})



export {
    deleteData,
    updateData,
    changeStatus,
    postData,
    getData,
    getAll
}