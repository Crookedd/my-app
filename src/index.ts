import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 3000;

const start = async () => {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000");
		console.log('MongoDB connected!')
    app.use(express.json());
		app.get("/", (req: Request, res: Response) => {
			res.send("Hello, Express with TypeScript!");
		});
		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

start();