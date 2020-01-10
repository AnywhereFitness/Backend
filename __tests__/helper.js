import chai, { expect } from 'chai';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

const onBefore = () =>
  before(async () => {
    chai.config.includeStack = true;
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opts);
  });

const onAfter = () =>
  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

export { onBefore, onAfter };
