import { Router, Request, Response } from 'express';
import data from '../../utility/data';
import path from 'path';
import { existsSync } from 'fs';
import sharpFun from '../../utility/size';

const routes_images = Router();

routes_images.get('/', async (req: Request, res: Response) => {
  const name = req.query.name as unknown as string;
  const width = req.query.width as unknown as string;
  const height = req.query.height as unknown as string;
  const fileDir = (path.resolve('./') + `/assets/${name}.jpg`) as string;
  const newDir = (path.resolve('./') +
    `/assets/images/${name}-${width}-${height}.jpg`) as string;
  const image = data.includes(name) as boolean;

  if ((name === undefined) as unknown as string) {
    // If the name query wasn't provided return and end function
    return res
      .status(400)
      .send('Bad request, query parameter (name) is required.');
  }
  // If the name doesn't exist in the array return and end function
  if (image === false) {
    return res
      .status(404)
      .send('Resource not found, this image name does not exist!');
  }
  // If the name exists in the array but the photo doesn't exist return and end function
  if ((existsSync(fileDir) === false) as boolean) {
    return res
      .status(404)
      .send('Resource not found, this name does not have a photo!');
  }
  //if the width or height is not specified
  if (
    width === undefined ||
    height === undefined ||
    width === null ||
    height === null
  ) {
    return res
      .status(400)
      .send(
        'Bad request, query parameter (width and height) should be entered.'
      );
  }
  //if the width or height is not specified
  if (width === '0' || height === '0') {
    return res
      .status(400)
      .send(
        'Bad request, query parameter (width and height) should be value not zero.'
      );
  }
  //if the width or height is not a number
  if (
    (isNaN(parseInt(width)) || isNaN(parseInt(height))) as unknown as number
  ) {
    return res
      .status(400)
      .send('Bad request, query parameter (width or height) is not a number.');
  }
  //if the width or height is a negative number
  if ((parseInt(width) < 0 || parseInt(height) < 0) as unknown as number) {
    return res
      .status(400)
      .send(
        'Bad request, query parameter (width or height) should not be negative.'
      );
  }
  //here we check if the needed file is existed then send it directrly
  if (existsSync(newDir) as boolean) return res.sendFile(newDir);
  //here if the needed picture not existed
  if (!existsSync(newDir) as boolean) {
    // go edit it and save it then send to browser
    await sharpFun(fileDir, width, height, newDir);
    return res.sendFile(newDir);
  }
});

export default routes_images;
