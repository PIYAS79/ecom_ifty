import express from 'express';
import Check_Roles from '../../middlewares/check_role';
import { Role } from '@prisma/client';
import Zod_Validation_Request from '../../utils/zod.validation';
import { Look_Zod_Types } from './look.zod';
import { Look_Controller } from './look.controller';

const router = express.Router();

// Create a new Look
router.post('/',
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(Look_Zod_Types.Create_Look_Zod_Type),
    Look_Controller.create_look);

// Delete a Look by ID
router.delete('/:lid',
    Check_Roles(Role.SUPERADMIN),
    Look_Controller.delete_look);



export const Look_Routes = router;