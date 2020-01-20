import mongoose from 'mongoose';
import mongoConfig from '../config/database';

class Database {
  constructor() {
    this.init();
  }

  async init() {
    mongoose.set('debug', process.env.NODE_ENV === 'development');
    try {
      this.mongoConnection = await mongoose.connect(mongoConfig.databaseURL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    } catch (error) {
      throw new Error({ error });
    }
  }
}

export default new Database();
