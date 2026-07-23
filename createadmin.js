const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

async function createAdmins(){

    const password = await bcrypt.hash("123456",10);

    await Admin.create([
        {
            name:"Bunty",
            email:"bunty@admin.com",
            password,
            role:"superadmin"
        },
        {
            name:"Sales Admin",
            email:"sales@admin.com",
            password,
            role:"sales"
        },
        {
            name:"Inventory Admin",
            email:"inventory@admin.com",
            password,
            role:"inventory"
        },
        {
            name:"Manager",
            email:"manager@admin.com",
            password,
            role:"manager"
        }
    ]);

    console.log("Admins Created");
    process.exit();
}

createAdmins();