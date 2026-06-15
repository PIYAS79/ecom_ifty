import express from 'express';
import { User_Routes } from '../modules/USER/user.route';
import { Auth_Routes } from '../modules/AUTH/auth.route';
import { Product_Routes } from '../modules/PRODUCT/product.route';


const router = express.Router();

const final_routes = [
    {
        path: '/user',
        route: User_Routes
    },
    {
        path: '/auth',
        route: Auth_Routes
    },
    {
        path:'/product',
        route: Product_Routes
    }
]

final_routes.forEach((one) => router.use(one.path, one.route));

export const Project_Routes = router;