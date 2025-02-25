import express from 'express';
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { Router } from 'express';
import fileRoutes from './routes/file.js';
import { errorMiddleware } from "./middlewares/error.js";
import { responseMiddleware } from "./middlewares/response.js";
import dotenv from 'dotenv';


const app = express();

dotenv.config();

app.use(express.json());
app.use(fileUpload());
app.use(responseMiddleware);

const PORT = 3000;

async function connectDB() {
    try {
        await mongoose.connect('mongodb://database:27017/test', { //TODO Datenbankname anpassen
        });
        console.log('MongoDB connected');
    } catch (e) {
        console.error('Error connecting to database', e);
    }
}

connectDB();

app.use('/v1/lexicon', lexiconRoutes);
app.use("/v1/files", fileRoutes);

const router = new Router();


app.get('/', (req, res) => {
    res.send('Hello Backend Test');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server läuft unter http://localhost:${PORT}`);
});
