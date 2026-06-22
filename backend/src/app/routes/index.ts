import express from 'express';
import { User_Routes } from '../modules/USER/user.route';
import { Auth_Routes } from '../modules/AUTH/auth.route';
import { Product_Routes } from '../modules/PRODUCT/product.route';
import { Color_Routes } from '../modules/COLOR/color.route';
import { Product_Type_Routes } from '../modules/PRD_TYPE/product_type.route';
import { Coupon_Routes } from '../modules/COUPON/coupon.route';
import { Season_Routes } from '../modules/SEASON/season.route';
import { LookBook_Routes } from '../modules/LOOKBOOK/lookbook.route';
import { Look_Routes } from '../modules/LOOK/look.route';
import { Gallery_Routes } from '../modules/GALLERY/gallery.route';


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
    },
    {
        path: '/season',
        route: Season_Routes
    },
    {
        path: '/lookbook',
        route: LookBook_Routes
    },
    {
        path: '/look',
        route: Look_Routes
    },
    {
        path: '/gallery',
        route: Gallery_Routes
    }
]

final_routes.forEach((one) => router.use(one.path, one.route));

export const Project_Routes = router;