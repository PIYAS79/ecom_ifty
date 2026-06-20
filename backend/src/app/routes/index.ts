import express from 'express';
import { User_Routes } from '../modules/USER/user.route';
import { Auth_Routes } from '../modules/AUTH/auth.route';
import { Product_Routes } from '../modules/PRODUCT/product.route';
import { Color_Routes } from '../modules/COLOR/color.route';
import { Product_Type_Routes } from '../modules/PRD_TYPE/product_type.route';
import { Coupon_Routes } from '../modules/COUPON/coupon.route';


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
        path: '/color',
        route: Color_Routes
    },
    {
        path: '/type',
        route: Product_Type_Routes
    },
    {
        path: '/coupon',
        route: Coupon_Routes
    },
    {
        path: '/product',
        route: Product_Routes
    }
]

final_routes.forEach((one) => router.use(one.path, one.route));

export const Project_Routes = router;