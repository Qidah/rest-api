import express from 'express';
import userRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something broke!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));