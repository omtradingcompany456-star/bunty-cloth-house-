const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Uploads Folder Access
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

// MongoDB Connection
mongoose.connect(
    "mongodb://127.0.0.1:27017/buntyclothhouse"
)
.then(() => {
    console.log("MongoDB Connected");
})
.catch(err => {
    console.log(err);
});

// Routes
app.use(
    "/api/products",
    require("./routes/products")
);

app.use(
    "/api/contact",
    require("./routes/contact")
);

app.use(
    "/api/orders",
    require("./routes/order")
);

// Home Route
app.get("/", (req, res) => {
    res.send(
        "Bunty Cloth House Backend Running"
    );
});

// Server Start
app.listen(5000, () => {
    console.log(
        "Server running on http://localhost:5000"
    );
});