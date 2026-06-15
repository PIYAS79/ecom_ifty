import express from 'express';
import { Product_Controllers } from './product.controller';
import Check_Roles from '../../middlewares/check_role';
import { Role } from '@prisma/client';
import Zod_Validation_Request from '../../utils/zod.validation';
import { Product_Zod_Types } from './product.zod';


const router = express.Router();

// Create a new product
router.post('/create',
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(Product_Zod_Types.Create_Product_Zod_Type),
    Product_Controllers.create_product);


export const Product_Routes = router;