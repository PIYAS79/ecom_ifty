


import express from 'express';
import Check_Roles from '../../middlewares/check_role';
import { Role } from '@prisma/client';
import Zod_Validation_Request from '../../utils/zod.validation';
import { Gallery_Zod_Types } from './gallery.zod';
import { Gallery_Controller } from './gallery.controller';


const router = express.Router();

// Create a new gallery
router.post("/",
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(Gallery_Zod_Types.Create_Gallery_Zod_Type),
    Gallery_Controller.create_gallery);

// Update a gallery
router.put("/:gid",
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(Gallery_Zod_Types.Update_Gallery_Zod_Type),
    Gallery_Controller.update_gallery);

// Get a gallery by lookbookId
router.get("/:lookbookId",
    Gallery_Controller.get_gallery_by_lookbookId);



export const Gallery_Routes = router;