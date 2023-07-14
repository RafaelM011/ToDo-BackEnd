import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

import register from './controllers/register.js';
import signIn from './controllers/signin.js';
import { getTodo, addTodo, removeTodo, toggleTodo } from './controllers/todo.js';

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
server.post("/signin", signIn(db, bcrypt));
//Get user's todos
server.get("/todos/:username", getTodo(db))
//Toggle users's todos
server.post("/todos/:username/toggletodo", toggleTodo(db))
//Add new todo
server.put("/todos/:username/addtodo", addTodo(db));
//Remove todo
server.delete("/todos/:username/deltodo", removeTodo(db))