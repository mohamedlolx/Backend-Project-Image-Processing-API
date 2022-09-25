import supertest from 'supertest';
import app from '../../index';
import fs from 'fs';
import path from 'path';
import sharpFun from '../../utility/size';

const request = supertest(app);

describe('Testing the leads endpoint', () => {
  it('Using the endpoint without providing the name parameter or width or height returns 400', async () => {
    await request.get('/images').expect(400);
  });

  it('Using the endpoint with a non-existent images returns 404', async () => {
    await request.get('/images?name=left').expect(404);
  });

  it('Using the endpoint with a valid lead that does not have a photo returns 404', async () => {
    await request.get('/images?name=another').expect(404);
  });

  it('Using the endpoint with a valid image name returns 200', async () => {
    await request.get('/images?name=fjord&width=300&height=300').expect(200);
  });

  it('Using the endpoint with undefined value width or height returns 400', async () => {
    await request.get('/images?name=fjord&width=&height=').expect(400);
  });

  it('Using the endpoint with zero value width or height returns 400', async () => {
    await request.get('/images?name=fjord&width=0&height=0').expect(400);
  });

  it('Using the endpoint with a not a number of width or height returns 400', async () => {
    await request.get('/images?name=fjord&width=hi&height=bye').expect(400);
  });

  it('Using the endpoint with a number of width or height returns 200', async () => {
    await request.get('/images?name=fjord&width=300&height=300').expect(200);
  });

  it('test for image processing should returns 200', async () => {
    if (
      fs.existsSync(path.resolve('./') + `/assets/images/fjord-300-300.jpg`)
    ) {
      fs.unlinkSync(path.resolve('./') + `/assets/images/fjord-300-300.jpg`);
    }
    await request.get('/images?name=fjord&width=300&height=300').expect(200);
  });
});
it('sharp function implmentation', async () => {
  const width = '600';
  const height = '600';
  const name = 'encenadaport';
  const fileDir = path.resolve('./') + `/assets/${name}.jpg`;
  const newDir =
    path.resolve('./') + `/assets/images/${name}-${width}-${height}.jpg`;
  await sharpFun(fileDir, width, height, newDir);
  if (fs.existsSync(newDir)) return true;
  else throw new Error('Resized Image Not Found');
});
