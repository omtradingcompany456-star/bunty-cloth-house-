const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
    const contact = new Contact(req.body);
    await contact.save();

    res.json({
        message: "Message Saved"
    });
});

module.exports = router;