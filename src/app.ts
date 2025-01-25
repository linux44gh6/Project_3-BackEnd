import { Application, Request, Response } from 'express';
import router from './Routes';
import cors from 'cors';
import express from 'express';
import notFound from './Middlewares/Not_found';
import globalErrorHandler from './Middlewares/globalErrorHandeler';
const app: Application = express();

//using middleware
app.use(express.json());
app.use(cors());

//using router
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(notFound);
app.use(globalErrorHandler);


export default app;
