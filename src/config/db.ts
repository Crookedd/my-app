import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB подключён!!!');
  } catch (error) {
    console.error('MongoDB не подключён: ', error);
    process.exit(1);
  }
};

export { connectDB };
