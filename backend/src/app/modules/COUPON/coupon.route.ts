import express from 'express';
import Zod_Validation_Request from '../../utils/zod.validation';
import { Coupon_Zod_Types } from './coupon.zod';
import { Coupon_Controller } from './coupon.controller';
import Check_Roles from '../../middlewares/check_role';
import { Role } from '@prisma/client';


const router = express.Router();

// Create a new coupon
router.post('/',
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(Coupon_Zod_Types.Create_Coupon_Zod_Type),
    Coupon_Controller.create_coupon
);

// Delete a coupon by ID
router.delete('/:id', 
    Check_Roles(Role.SUPERADMIN), 
    Coupon_Controller.delete_coupon);

// Check a coupon by code
router.get('/check/:code', Coupon_Controller.check_coupon);



export const Coupon_Routes = router;