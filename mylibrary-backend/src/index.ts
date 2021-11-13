import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { AppRoutes } from './controllers';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req: Request, res: Response) => {
	res.status(200).send('Server is running');
});

app.use(AppRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
