import 'dotenv/config';
import products from "../data/dataAboutProducts";
import {Request, Response} from "express";
import express from "express";

const app = express();
const jsonParser = express.json();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

app.get("/products", (req: Request, res: Response) => {
    res.status(201).json(products)
})

app.post("/products", jsonParser, (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({
            status: "error",
            error: "req body cannot be empty",
        });
    } else {
        products.push(req.body);
        return res.status(201).json(req.body);
    }
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});

