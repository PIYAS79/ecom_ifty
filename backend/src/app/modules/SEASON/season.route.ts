import express from 'express';
import Zod_Validation_Request from '../../utils/zod.validation';
import { Season_Zod_Types } from './season.zod';
import { Season_Controller } from './season.controller';
import Check_Roles from '../../middlewares/check_role';
import { Role } from '@prisma/client';


const router = express.Router();

// Create a new season
router.post("/",
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(Season_Zod_Types.Create_Season_Zod_Type),
    Season_Controller.create_season);

// Get all seasons
router.get("/",
    Season_Controller.get_all_seasons);

// update a season
router.patch("/:id",
    Check_Roles(Role.SUPERADMIN),
    Zod_Validation_Request(Season_Zod_Types.Update_Season_Zod_Type),
    Season_Controller.update_season);

// delete a season
router.delete("/:id",
    Check_Roles(Role.SUPERADMIN),
    Season_Controller.delete_season);


export const Season_Routes = router;