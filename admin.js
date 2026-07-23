const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const Admin = require("../models/Admin");

router.post("/login", async(req,res)=>{

    const {email,password} = req.body;

    const admin = await Admin.findOne({email});

    if(!admin){
        return res.status(400).json({
            message:"Admin Not Found"
        });
    }

    const valid = await bcrypt.compare(
        password,
        admin.password
    );

    if(!valid){
        return res.status(400).json({
            message:"Wrong Password"
        });
    }

    const token = jwt.sign({
        id:admin._id,
        role:admin.role
    },
    process.env.JWT_SECRET);

    res.json({
        token,
        role:admin.role,
        name:admin.name
    });

});

module.exports = router;