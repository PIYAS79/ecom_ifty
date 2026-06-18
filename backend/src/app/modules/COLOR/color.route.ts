import express from 'express';
import { Color_Controller } from './color.controller';
import Check_Roles from '../../middlewares/check_role';
import { Role } from '@prisma/client';
import Zod_Validation_Request from '../../utils/zod.validation';
import { Color_Zod_Types } from './color.zod';



const router = express.Router();

// Create a new color
router.post('/',
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(Color_Zod_Types.Create_Color_Zod_Type),
    Color_Controller.create_color);

// Update a color
router.patch('/:id',
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(Color_Zod_Types.Update_Color_Zod_Type),
    Color_Controller.update_color);

// Delete a color
router.delete('/:id',
    Check_Roles(Role.SUPERADMIN),
    Color_Controller.delete_color);


export const Color_Routes = router;