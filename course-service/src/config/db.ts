import mongoose from 'mongoose';

const connectDB = async (retries: number = 5, delay: number = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.MONGO_URI!);
      console.log('MongoDB подключён!!!');
      return;
    } catch (error) {
      console.error(`Попытка подключения к MongoDB не удалась (${i + 1}/${retries}):`, error);
      if (i < retries - 1) {
        console.log(`Повторная попытка через ${delay / 1000} секунд...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error('Все попытки подключения к MongoDB исчерпаны.');
        process.exit(1);
      }
    }
  }
};

export { connectDB };
