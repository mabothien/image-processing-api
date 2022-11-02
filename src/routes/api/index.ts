import { Request, Response, Router } from 'express';
import imageRoute from '../images';

const routes = Router();
routes.get('/', (req: Request, res: Response) => {
  res.send('/api');
});
routes.use('/images', imageRoute);

export default routes;
