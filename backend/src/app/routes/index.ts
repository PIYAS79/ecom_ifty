import express from 'express';
import { User_Routes } from '../modules/USER/user.route';


const router = express.Router();

const final_routes = [
    {
        path:'/user',
        route: User_Routes
    }
]

final_routes.forEach((one)=>router.use(one.path,one.route));

export const Project_Routes = router;