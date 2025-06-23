import { getChannel } from './rabbit';

export const startConsumers = async () => {
  const channel = getChannel();

  if (!channel) {
    console.error('Канал RabbitMQ не инициализирован');
    return;
  }

  await channel.assertQueue('user_created', { durable: true });
  channel.consume('user_created', async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log('[Consumer] Новый пользователь создан:', data);
      channel.ack(msg);
    }
  });

  await channel.assertQueue('user_login', { durable: true });
  channel.consume('user_login', async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log('[Consumer] Пользователь вошёл в систему:', data);
      channel.ack(msg);
    }
  });

  console.log('[Consumer] Все очереди подключены и слушаются...');
};
