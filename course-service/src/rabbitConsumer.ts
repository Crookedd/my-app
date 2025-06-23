import { getChannel } from './rabbit';

export const startConsumers = async () => {
  const channel = getChannel();

  if (!channel) {
    console.error('Канал RabbitMQ не инициализирован');
    return;
  }

  await channel.assertQueue('event.comment.created', { durable: true });
  channel.consume('event.comment.created', async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log('[Consumer] Новый комментарий создан:', data);
      channel.ack(msg);
    }
  });

  await channel.assertQueue('event.course.created', { durable: true });
  channel.consume('event.course.created', async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log('[Consumer] Новый курс создан:', data);
      channel.ack(msg);
    }
  });

  await channel.assertQueue('event.course.enrolled', { durable: true });
  channel.consume('event.course.enrolled', async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log('[Consumer] Пользователь записался на курс:', data);
      channel.ack(msg);
    }
  });

  await channel.assertQueue('event.lesson.completed', { durable: true });
  channel.consume('event.lesson.completed', async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log('[Consumer] Урок завершён:', data);
      channel.ack(msg);
    }
  });

  await channel.assertQueue('event.lesson.uncompleted', { durable: true });
  channel.consume('event.lesson.uncompleted', async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log('[Consumer] Урок отмечен как незавершённый:', data);
      channel.ack(msg);
    }
  });

  await channel.assertQueue('event.lesson.created', { durable: true });
  channel.consume('event.lesson.created', async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log('[Consumer] Урок создан:', data);
      channel.ack(msg);
    }
  });

  console.log('[Consumer] Все очереди подключены и слушаются...');
};
