import express from 'express';
import Check_Roles from '../../middlewares/check_role';
import { Role } from '@prisma/client';
import Zod_Validation_Request from '../../utils/zod.validation';
import { LookBook_Zod_Types } from './lookbook.zod';
import { LookBook_Controller } from './lookbook.controller';


const router = express.Router();

// Create a new lookbook
router.post("/",
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(LookBook_Zod_Types.Create_LookBook_Zod_Type),
    LookBook_Controller.create_lookbook);

// Update a lookbook
router.put("/:lid",
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(LookBook_Zod_Types.Update_LookBook_Zod_Type),
    LookBook_Controller.update_lookbook);

// Get all lookbooks
router.get("/",
    LookBook_Controller.get_all_lookbooks);


export const LookBook_Routes = router;