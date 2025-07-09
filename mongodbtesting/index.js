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

mongoose.connect(process.env.MONGODB_CONNECTION)
const db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to MongoDB");
});

db.on("error", (err) => {
    console.log("DB Error");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})



app.get("/products/dashboard/all", async (req, res) => {
    try {
        const result = await Product.find({},{title: 1, image: 1});
        res.json(result);
    } catch (error) {
        console.log(error)
        return
    }
})

app.get("/products/product_details/:id", async (req, res) => {
    try {
        const result = await Product.findById(req.params.id);
        res.json(result);
    } catch (error) {
        console.log(error)
        return
    }
})

// app.post("/books/save", async (req, res) => {
//     // 1 - Parse the data
//     const { title, authors, page, publisher, genres, price } = req.body;
//     // 2 - Create a new book instance
//     const newBook = new Book({
//         title,
//         authors,
//         page,
//         publisher,
//         price,
//         genres,
//     });
//     newBook.save()
//         .then((savedBook) => {
//             res.status(201).json(savedBook);
//         })
//         .catch((err) => {
//             res.status(400).send(err);
//         });
// });

