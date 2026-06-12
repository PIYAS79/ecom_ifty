import express, { NextFunction, Request, Response, type Application } from 'express';
import cors from 'cors';
import { Project_Routes } from './routes';
import Route_Not_Found_Error from './errors/Not_Found';
import Global_Error_Handler from './errors/Global_Error_Handler';
import cookieParser from 'cookie-parser'
import config from '../config';

const app: Application = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser())

// Application Routes
app.use('/app/v1', Project_Routes);

// Initial Route
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Server is Up and Horny 🫦 👀",
    })
})
// Handle Not Found Routes
app.use(Route_Not_Found_Error);

// Global Error Handler
app.use(Global_Error_Handler);


export default app;