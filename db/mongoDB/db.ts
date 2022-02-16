import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';
import 'dotenv/config';
import logger from '../../logger/logger';
import Category from './models/category';
import Product from './models/product';

const MONGO_URI = `mongodb+srv://ksushka:${process.env.DB_PASS}@shop.rtbtb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

interface ConnectionOptionsExtend extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const options: ConnectionOptionsExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectionToMongoDataBase = async () => {
  try {
    await mongoose.connect(MONGO_URI, options);
    logger.info('MongoDB connection success');
  } catch (err) {
    logger.error('Mongodb connection failed');
    process.exit(1);
  }
};
export default connectionToMongoDataBase;
