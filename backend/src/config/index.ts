import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    port_number: process.env.PORT,
    hash_pass_salt_rounds: process.env.HASH_PASS_SALT_ROUNDS,
    // environment:process.env.ENVIRONMENT,
    jwt: {
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
        refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
        refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
        forgot_token_secret: process.env.FORGOT_TOKEN_SECRET,
        forgot_token_expires_in: process.env.FORGOT_TOKEN_EXPIRES_IN,
    },
    nodemailer: {
        base_email: process.env.BASE_EMAIL,
        frontend_url: process.env.FRONT_END_URL,
        app_pass: process.env.APP_PASS
    }
}