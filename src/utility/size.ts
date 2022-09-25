import sharp from 'sharp';
//using sharp to process an image and send it to the edited folder
const sharpFun = async function (
  a: string,
  b: string,
  c: string,
  d: string
): Promise<void> {
  await sharp(a)
    .resize(parseInt(b + 'px'), parseInt(c + 'px'))
    .toFile(d);
};

export default sharpFun;
