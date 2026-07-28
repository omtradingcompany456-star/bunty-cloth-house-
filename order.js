const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


// Get All Orders
router.get("/", async (req, res) => {

    try {

        const orders =
        await Order.find()
        .sort({ createdAt: -1 });

        res.json(orders);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// Get Single Order
router.get("/:id", async (req, res) => {

    try {

        const order =
        await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order Not Found"
            });
        }

        res.json(order);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// Create Order
router.post("/", async (req, res) => {

    try {

        const order = new Order({

            customerName: req.body.customerName,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            pincode: req.body.pincode,

            products: req.body.products,

            orderTotal: req.body.orderTotal,

            advancePayment:
            req.body.advancePayment || 0,

            paymentMethod:
            req.body.paymentMethod || "COD",

            trackingId:
            req.body.trackingId || "",

            status:
            req.body.status || "Pending"

        });

        const savedOrder =
        await order.save();

        res.status(201).json(savedOrder);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

});


// Update Order
router.put("/:id", async (req, res) => {

    try {

        const updatedOrder =
        await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedOrder) {

            return res.status(404).json({
                message: "Order Not Found"
            });

        }

        res.json(updatedOrder);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

});


// Update Only Status
router.put("/:id/status", async (req, res) => {

    try {

        const order =
        await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                message: "Order Not Found"
            });

        }

        order.status = req.body.status;

        await order.save();

        res.json(order);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// Delete Order
router.delete("/:id", async (req, res) => {

    try {

        const order =
        await Order.findByIdAndDelete(
            req.params.id
        );

        if (!order) {

            return res.status(404).json({
                message: "Order Not Found"
            });

        }

        res.json({
            message:
            "Order Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router; 