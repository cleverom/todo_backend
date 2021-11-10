import express, { NextFunction } from 'express';
const router = express.Router();
import fs from 'fs';
import path from 'path';

const paths = path.join(__dirname, '../../database.json');
import {
  deleteData,
  updateData,
  changeStatus,
  postData,
  getData,
  getAll
} from '../controllers/todoList'

type typing = {
  todo: string,
  date: string,
  id: number,
}
let database: typing;

// to dynamically produce database.json file if not existing
if (fs.existsSync(paths)) {
  database = require(paths);
}

// /* GET all data. */

router.get('/api/data', (req: express.Request, res: express.Response, next: NextFunction) => {
  getAll(req, res, next);
})

// /* GET data by id. */

router.get('/api/data/:id', (req: express.Request, res: express.Response, next: NextFunction) => {
  getData(req, res, next)
})

// /* post data. */
router.post('/api/data/todo', (req: express.Request, res: express.Response, next: NextFunction) => {
  postData(req, res, next)
})


// /* update single data. */
router.put('/api/data/todo/:id', (req: express.Request, res: express.Response, next: NextFunction) => {
  updateData(req, res, next)
})

// /* cahnge status. */
router.put('/api/data/status/:id', (req: express.Request, res: express.Response, next: NextFunction) => {
  changeStatus(req, res, next)
})

// /* delete data by id. */
router.delete('/api/data/:id', (req: express.Request, res: express.Response, _next: NextFunction) => {
  deleteData(req, res, _next)
})



export default router