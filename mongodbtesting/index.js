import express from "express"; // create server
import mongoose from "mongoose"; // connect to DB
import dotenv from "dotenv"; // read sensitive file
import cors from "cors"
import Product from "./models/product.js"


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION)
const db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to MongoDB");
});

db.on("error", (err) => {
    console.log("DB Error");
});
// Start the server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

// Route to get all products for dashboard
app.get("/products/dashboard/all", async (req, res) => {
    try {
        // Find all products as selected fields
        const result = await Product.find({},{title: 1, image: 1});
        res.json(result);
    } catch (error) {
        console.log(error)
        return
    }
})
// Route to get detailed information of a single product by its MongoDB _id
app.get("/products/product_details/:id", async (req, res) => {
    try {
        const result = await Product.findById(req.params.id);
        res.json(result);
    } catch (error) {
        console.log(error)
        return
    }
})
// Route to get banner info (title + image) of a single product by ID
app.get("/products/product_banner/:id", async (req, res) => {
    try {
        const result = await Product.findById(req.params.id, {title:1, image:1,});
        res.json(result);
    } catch (error) {
        console.log(error)
        return
    }
})

