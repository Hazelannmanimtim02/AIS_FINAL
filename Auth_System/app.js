import express from "express";
import 'dotenv/config.js';
import cors from "cors";

import { errorHandler } from "./middleware/errorHandler.js";
import userRoutes from "./routes/UserRoutes.js";

// initialize app
const app = express();

// CORS config
const corsOptions = {
    origin: process.env.ORIGIN
};

// middlewares
app.use(express.json());
app.use(cors(corsOptions));

// request logger
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes (FIXED PREFIX)
app.use('/api/users', userRoutes);

// 404 handler (must be AFTER routes)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "No such endpoint exists"
    });
});

// global error handler (LAST)
app.use(errorHandler);

// start server LAST
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`);
});