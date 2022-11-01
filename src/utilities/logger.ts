import  { Response, Request, NextFunction } from 'express'
import { isFileExistInImages, isFileExistInThumbs } from './handleFile';
import path from 'path';
const logger = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { filename, width, height } = req.query;
  const originalPath = `${filename}-${width}-${height}`;
  const hasInThumbs = await isFileExistInThumbs(originalPath);
  if (hasInThumbs) {
    const options = {
      root: path.join('thumbs')
    };
    res.sendFile(`${filename}.jpg`, options, (err) => {
      if (err) {
        next(err);
      } else {
        console.log('Sent:', filename);
      }
    });
  } else {
    const isExist = await isFileExistInImages(filename as string);
    if (!isExist) {
      res.send('Filename Incorrect!');
      return;
    }
    if (
      isNaN(Number(width)) ||
      isNaN(Number(height)) ||
      Number(width) <= 0 ||
      Number(height) <= 0
    ) {
      res.send('Incorrect Parameters');
      return;
    }
    next();
  }
};
export default logger
