require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URI = `mongodb+srv://ksushka:${process.env.DB_PASS}@shop.rtbtb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const connectionToDataBase = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connection success');
    } catch (err) {
        console.error('Mongodb connection failed');
        process.exit(1);
    }
}
module.exports = connectionToDataBase;