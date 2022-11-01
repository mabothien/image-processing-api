import { Request, Response, Router } from 'express';
import { resize } from '../../utilities/handleFile';
import logger from '../../utilities/logger';
const imageRoute = Router();

imageRoute.get("/", logger, async(req:Request, res:Response):Promise<void> => {
  const {filename, width,height} = req.query;
  const file = await resize(
    filename as string,
    width as string,
    height as string
  );
  file?.toFile(
    `./thumbs/${filename}.jpg`,
    async (err): Promise<void> => {
      if (err) {
        res.send('Something error. Need to check');
        return;
      }
      file.toBuffer();
      file.pipe(res.status(200));
    }
  );
})

export default imageRoute
