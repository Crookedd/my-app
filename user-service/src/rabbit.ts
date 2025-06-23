import amqplib from 'amqplib';

let channel: amqplib.Channel;

export const connectRabbit = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await amqplib.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672');
       channel = await connection.createChannel();
       await channel.assertQueue('user_created', { durable: false });
      console.log('Подключено к RabbitMQ (user-service)');
      return;
    } catch (error) {
      console.error(`Попытка подключения к RabbitMQ не удалась (${i + 1}/${retries}):`, error);
      if (i < retries - 1) {
        console.log(`Повторная попытка через ${delay / 1000} секунд...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.error('Все попытки подключения к RabbitMQ исчерпаны.');
        process.exit(1);
      }
    }
  }
};

export const getChannel = () => channel;
