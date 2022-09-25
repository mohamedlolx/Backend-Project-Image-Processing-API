import express, { Application } from 'express';
import routes from './routes';

const app: Application = express();
const port = 3000;
app.use(routes);
app.listen(port, (): void => {
  console.log(`The server is running on port:${port}`);
});

export default app;
