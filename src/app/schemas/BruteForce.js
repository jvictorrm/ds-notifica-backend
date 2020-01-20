import ExpressBrute from 'express-brute';
import MongooseStore from 'express-brute-mongoose';
import BruteForceSchema from 'express-brute-mongoose/dist/schema';
import mongoose from 'mongoose';

const model = mongoose.model(
  'bruteforce',
  new mongoose.Schema(BruteForceSchema)
);

const store = new MongooseStore(model);

export default new ExpressBrute(store);
