import express from 'express';
import Zod_Validation_Request from '../../utils/zod.validation';
import { Auth_Zod_Types } from './auth.zod';
import { Auth_Controllers } from './auth.controller';
import Check_Roles from '../../middlewares/check_role';
import { Role } from '@prisma/client';


const router = express.Router();


router.post('/login',
    Zod_Validation_Request(Auth_Zod_Types.User_Login_Zod_Type),
    Auth_Controllers.user_login
);

router.get('/refresh-token',
    Auth_Controllers.fetch_refresh_token
)

router.post('/change-password',
    Check_Roles(Role.SUPERADMIN, Role.ADMIN, Role.USER),
    Zod_Validation_Request(Auth_Zod_Types.Change_Password_Zod_Type),
    Auth_Controllers.change_password
)

router.post('/forget-password',
    Zod_Validation_Request(Auth_Zod_Types.Forget_Password_Zod_Type),
    Auth_Controllers.forget_password
)

router.post('/reset-password',
    Zod_Validation_Request(Auth_Zod_Types.Reset_Password_Zod_Type),
    Auth_Controllers.reset_password
)


export const Auth_Routes = router;