# TypeScript + Express + MongoDB + Docker Microservices

Этот проект представляет собой микросервисную архитектуру на базе Node.js, TypeScript, Express и MongoDB. Он разделён на несколько сервисов: user-service, course-service, gateway (API Gateway), с поддержкой обмена сообщениями через RabbitMQ.

## Содержание
- [Структура микросервисов](#Структура-микросервисов)
- [Требования](#требования)
- [Запуск приложения](#запуск-приложения)
- [Использование](#использование)
- [ИПолезные команды](#Полезные-команды)

## Структура микросервисов

 - user-service — регистрация, вход, JWT, удаление пользователя.
 - course-service — курсы, уроки, комментарии, прогресс, запись на курсы и тд.
 - gateway — API Gateway: единая точка входа (/api/users, /api/courses).
 - mongo — база данных MongoDB.
 - rabbitmq — брокер сообщений RabbitMQ.

## Требования

- [Node.js](https://nodejs.org/) (требуемая минимальная версия 16 или выше)
- Современный веб-браузер

## Запуск приложения

1. **Клонируйте репозиторий и установите зависимости** (если работаете локально):

```bash
yarn install
yarn run dev
```

2. **Запустите всю систему через Docker Compose**:

```bash
docker-compose up --build
```

3. После успешного запуска:
- API Gateway будет доступен по адресу: [http://localhost:3000](http://localhost:3000)
- Интерфейс RabbitMQ Management: [http://localhost:15672](http://localhost:15672)

## Использование

1. Добавьте файл .env и пропишите

```bash
MONGO_URI= путь_к_монго
JWT_SECRET= пароль
PORT= ваш_порт
RABBITMQ_URL= путь_к_rabbit
```

- Все внешние запросы идут через `http://localhost:3000/api/v1...`
- Примеры:
  - `POST /api/v1/users/signup` — регистрация пользователя
  ```bash
   {
   "firstName": "HHHH",
   "lastName": "HHHH",
   "username": "HHHH",
   "password": "HHHHH",
   "role": "user"
   }
  ```
  - `POST /api/v1/courses/enrollment/enroll/:courseId` — записаться на курс (Предоставить Токен)

## Полезные команды

```bash
# Перезапуск проекта
docker-compose down
docker-compose up --build

# Остановка всех контейнеров
docker-compose down

# Проверка логов конкретного сервиса
docker-compose logs -f user-service
```

