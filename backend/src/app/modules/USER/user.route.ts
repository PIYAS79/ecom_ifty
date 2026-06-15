import express from 'express';
import { User_Controller } from './user.controller';
import Zod_Validation_Request from '../../utils/zod.validation';
import { User_Zod_Types } from './user.zod';
import Check_Roles from '../../middlewares/check_role';
import { Role } from '@prisma/client';

const router = express.Router();

// Create a new user
router.post("/",
    Zod_Validation_Request(User_Zod_Types.Create_User_Zod_Type),
    User_Controller.create_user);

// Get all users
router.get("/",
    Check_Roles(Role.SUPERADMIN),
    User_Controller.get_all_users);

// Get user by email
router.get("/:email",
    Check_Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER),
    User_Controller.get_user_by_email);

// Update user
router.put("/:email",
    Check_Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER),
    Zod_Validation_Request(User_Zod_Types.Update_User_Zod_Type),
    User_Controller.update_user);

// Update user control (status and role) by SUPER ADMIN
router.patch("/control",
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(User_Zod_Types.Update_User_Control_Zod_Type),
    User_Controller.update_user_control);




export const User_Routes = router;