import express, { NextFunction } from 'express';
const router = express.Router();

import {
  createUser,
  login
} from '../controllers/user'

/* GET users listing. */
router.post('/api/signup', (req: express.Request, res: express.Response, next: NextFunction) => {
  createUser(req, res)
})

// /* post data. */
router.post('/api/login', (req: express.Request, res: express.Response, next: NextFunction) => {
  login(req, res,)
})

export default router;
