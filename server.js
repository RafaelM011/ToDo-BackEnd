import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

import register from './controllers/register.js';
import signIn from './controllers/signin.js';
import { addTodo, removeTodo } from './controllers/todo.js';

//Database
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'Julio11!#',
      database : 'ToDo'
    }
});

//Server
const server = express();
const PORT = 4000;
server.listen(PORT || 3000, () =>{
    console.log(`App is running on port ${PORT}`);
});

//CORS and Middleware
server.use(cors());
server.use(express.json());

//Opening database
server.get("/", (req, res) => res.json("Server is listening"));
//Register new user
server.post("/register", register(db, bcrypt));
//SignIn
server.get("/signin", signIn(db, bcrypt));
//Add new todo
server.put("/addtodo", addTodo(db));
//Remove todo
server.delete("/deltodo", removeTodo(db))