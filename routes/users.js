import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = [];

// GET all users
router.get('/', (req, res) => {
    res.json(users);
});

// GET single user
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);
    
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.json(user);
});

// POST new user
router.post('/', (req, res) => {
    const { name, description } = req.body;
    
    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }
    
    const newUser = { id: uuidv4(), name, description };
    users.push(newUser);
    
    res.status(201).json(newUser);
});

// PUT update user
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    
    users[userIndex] = { ...users[userIndex], name, description };
    res.json(users[userIndex]);
});

// DELETE user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    users = users.filter(u => u.id !== id);
    res.json({ message: `User ${id} deleted successfully` });
});

export default router;