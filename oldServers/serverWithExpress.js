const express=require("express");
const app=express();
const PORT=3000;
const products=require("../data/dataAboutProducts");
const jsonParser = express.json();

app.get("/", (req, res)=>{
    res.send("Hello world");
});

app.get("/products", (req, res)=>{
    res.status(201).json(products)
})

app.post("/products", jsonParser, (req, res)=>{
    if (!req.body) {
        return res.status(400).json({
            status: "error",
            error: "req body cannot be empty",
        });
    }
    else {
        products.push(req.body);
        return res.status(201).json(req.body);
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});

