const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));

// Create Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model("Contact", contactSchema);

// Route to save contact
app.post("/contact", async (req, res) => {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json({ message: "Message Saved Successfully!" });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});