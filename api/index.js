// api/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*", // Allow requests from anywhere (or specify your frontend domain)
    methods: ["GET", "POST"],
    credentials: true
}));

// Connect to MongoDB using Environment Variable
//
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err));

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Check if model exists before compiling to prevent overwrite errors in serverless
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post("/contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.json({ message: "Message Saved Successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save message" });
    }
});

// EXPORT the app instead of listening
module.exports = app;