import { Router, Request, Response } from 'express';
import routes_images from './api/main';

const routes: Router = Router();

routes.get('/', (req: Request, res: Response): void => {
  res.send(
    'Welcome to Image Processing API to use it just write as following' +
      'localhost:3000/images?name=(write the name of the image)&width=(the desired width as number)&height=(the desired width as number)'
  );
});

routes.use('/images', routes_images);

export default routes;
