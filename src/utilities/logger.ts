import { Response, Request, NextFunction } from 'express'
import { isFileExist } from './handleFile';
import path from 'path';
const logger = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const filename = req.query.filename as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  const originalPath = `${filename}-${width}-${height}`;
  const isExistThumbs = await isFileExist(originalPath, "./thumbs");
  if (isExistThumbs) {
    const options = {
      root: path.join('thumbs')
    };
    res.sendFile(`${filename}-${width}-${height}.jpg`, options, (err) => {
      if (err) {
        next(err);
      } else {
        console.log('Sent:', filename);
      }
    });
  } else {
    const isExistImages = await isFileExist(filename,"./images");
    if (!isExistImages) {
      res.send('Filename is not exist');
      return;
    }
    if (
      isNaN(parseInt(width)) ||
      isNaN(parseInt(height)) ||
      parseInt(width) <= 0 ||
      parseInt(height) <= 0
    ) {
      res.send('Incorrect Parameters');
      return;
    }
    next();
  }
};
export default logger
