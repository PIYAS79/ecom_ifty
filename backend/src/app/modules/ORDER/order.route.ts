import express from 'express';
import Zod_Validation_Request from '../../utils/zod.validation';
import { Order_Zod_Types } from './order.zod';
import { Order_Controller } from './order.controller';
import Check_Roles from '../../middlewares/check_role';
import { Role } from '@prisma/client';

const router = express.Router();

// Create a new order
router.post("/stack",
    Zod_Validation_Request(Order_Zod_Types.Create_Order_Zod_Type),
    Order_Controller.create_order_stack);


// Get all orders
router.get("/stacks",
    Check_Roles(Role.SUPERADMIN),
    Order_Controller.get_all_order_stacks);

// Get order by ID
router.get("/stack/:order_id",
    Check_Roles(Role.SUPERADMIN),
    Order_Controller.get_order_stack_by_id);

// Update order status
router.patch("/stack/:os_id",
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(Order_Zod_Types.Order_Status_Update_Zod_Type),
    Order_Controller.update_order_stack_status);

// Get all order records
router.get("/records",
    Check_Roles(Role.SUPERADMIN),
    Order_Controller.get_order_records);




export const Order_Routes = router;