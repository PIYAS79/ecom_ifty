import express from 'express';
import Check_Roles from '../../middlewares/check_role';
import { Role } from '@prisma/client';
import Zod_Validation_Request from '../../utils/zod.validation';
import { Product_Type_Zod_Types } from './product_type.zod';
import { Product_Type_Controller } from './product_type.controller';



const router = express.Router();

// Create a new Product Type
router.post('/',
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(Product_Type_Zod_Types.Create_Product_Type_Zod_Type),
    Product_Type_Controller.create_product_type);

// Update a Product Type
router.patch('/:id',
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(Product_Type_Zod_Types.Update_Product_Type_Zod_Type),
    Product_Type_Controller.update_product_type);

// Delete a Product Type
router.delete('/:id',
    Check_Roles(Role.SUPERADMIN),
    Product_Type_Controller.delete_product_type);

// Get all Product Types
router.get('/', Product_Type_Controller.get_all_product_types);

export const Product_Type_Routes = router;