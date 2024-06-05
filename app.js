const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

app.use(express.json());

const tasks = [];
let nextId = 1;
const SECRET_KEY = 'my_secret_key';

const users = [
    { id : 1, username: 'user', password: 'password'}
];

const authenticateToken = (req, res , next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err,user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

app.post('/login', (req, res) => {
    const {username , password} = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if(!user){
        return res.status(400).send('Invalid credentials');
    }

    const accessToken = jwt.sign({username: user.username, id:user.id}, SECRET_KEY, {expiresIn: '1h'});
    res.json({accessToken});
})

app.get('/tasks', (req,res) => {
    res.json(tasks);
})

app.get('/tasks/:id', (req,res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task){
        return res.status(404).send('Task not found');
    }
    res.json(task);
})


app.post('/tasks', authenticateToken, (req, res) => {
    const {title, description } = req.body;
    if(!title || !description){
        return res.status(400).send('Title and description are required');
    }

    const newTask = { id: nextId++, title, description};
    tasks.push(newTask);
    res.status(201).json(newTask);
})

app.put('/tasks/:id' ,authenticateToken, (req,res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task){
        return res.status(404).send('Task not found.');
    }

    const {title , description } = req.body;
    if(!title || !description){
        return res.status(400).send('Title and description are required');
    }

    task.title = title;
    task.description = description;
    res.json(task);
})

app.delete('/tasks/:id',authenticateToken, (req,res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if(taskIndex === -1){
        return res.status(404).send('Task not found');
    }

    tasks.splice(taskIndex, 1);
    return res.status(204).send('Task deleted succesfully!');
})

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something went wrong!!');
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})