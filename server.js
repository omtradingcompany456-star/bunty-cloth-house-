const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/buntyclothhouse")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/products", require("./products"));
app.use("/api/contact", require("./contact"));
app.use("/api/admin", require("./admin"));

app.get("/", (req, res) => {
    res.send("Bunty Cloth House Backend Running");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});