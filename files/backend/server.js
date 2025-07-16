const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'));

// Todo schema and model
const todoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean
});
const Todo = mongoose.model('Todo', todoSchema);

// Health check route
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// API routes
app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/api/todos', async (req, res) => {
    const todo = new Todo(req.body);
    await todo.save();
    res.json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));
