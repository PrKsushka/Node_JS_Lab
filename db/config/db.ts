import mongoose from "mongoose";
import {ConnectOptions} from "mongoose";

require("dotenv").config();

const MONGO_URI = `mongodb+srv://ksushka:${process.env.DB_PASS}@shop.rtbtb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

interface ConnectionOptionsExtend extends ConnectOptions {
    useNewUrlParser: boolean
    useUnifiedTopology: boolean
}

const options: ConnectionOptionsExtend = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connectionToDataBase = async () => {
    try {
        await mongoose.connect(MONGO_URI, options);
        console.log('MongoDB connection success');
    } catch (err) {
        console.error('Mongodb connection failed');
        process.exit(1);
    }
}
module.exports = connectionToDataBase;