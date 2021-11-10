import { Request, Response } from 'express'
import fs from 'fs';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
const paths = path.join(__dirname, '../../userdb.json');
import jwt from "jsonwebtoken";


type PartialType =  Array<{
    name: string,
    email: string,
    password: string,
    id: string,
  }>

// type typing = string | number
let database: PartialType;

// to dynamically produce database.json file if not existing
if(fs.existsSync(paths)){
    database = require(paths);
}


async function createUser(req: Request, res: Response) {
    
    const paths = path.join(__dirname,'../../userdb.json')
    const newData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        id: uuidv4()
    }
  
    try {
        if(!database){
            database = [newData]
        }else{
    
            database.push(newData)
        }
        let newDatabase = JSON.stringify(database, null, 2)
        fs.writeFile(paths, newDatabase, (err: any)=>{
            
        if(err) throw err
        })
        res.status(201).json({message: newData})
    
    } catch (error) {
      console.error(error);
    }
  }


async function login(req: Request, res: Response) {
    // const token = req.headers["authorization"].split(" ")[1];
    
    const { email, password } = req.body;
    const user = await database.find((c) => c.email === email);
    if (!user) {
        return res.json({ message: "User doesn't exist", status: false}).status(404);
    } else {
        if (password !== user.password) {
            return res.json({ message: "Password Incorrect", status: false });
        }
        const payload = {
            email,
            name: user.name,
            id: user.id
        };
        jwt.sign(payload, "secret", (err: any, token: any) => {
            if (err) console.log(err);
            else return res.json({ token: token, status: true }).status(201);
        });
    }
  }


  export {
      createUser,
      login
  }