
export type Create_User_Type = {
    name: string,
    email: string,
    password: string
}

export type Update_User_Type = {
    name?: string,
    image?: string,
}

export type Update_User_Control_Type = {
    email: string,
    status?: "ACTIVE" | "BLOCKED",
    role?: "USER" | "ADMIN" | "SUPERADMIN"
}