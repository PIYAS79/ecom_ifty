import express from 'express';
import { Product_Controllers } from './product.controller';
import Check_Roles from '../../middlewares/check_role';
import { Role } from '@prisma/client';
import Zod_Validation_Request from '../../utils/zod.validation';
import { Product_Zod_Types } from './product.zod';


const router = express.Router();

// Create a new product
router.post('/',
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(Product_Zod_Types.Create_Product_Zod_Type),
    Product_Controllers.create_product);

// Update a product by ID
router.put('/:id',
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(Product_Zod_Types.Update_Product_Zod_Type),
    Product_Controllers.update_product);

// Delete a product by ID
router.delete('/:id',
    Check_Roles(Role.SUPERADMIN),
    Product_Controllers.delete_product);

// Get all products
router.get('/',
    Product_Controllers.get_all_products,);


// Get a product by ID
router.get('/:id',
    Product_Controllers.get_product_by_id, );

export const Product_Routes = router;