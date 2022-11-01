import { Router } from 'express'
import imageRoute from '../images';

const routes = Router()
routes.get("/", (req,res) => {
  res.send("/api")
})
routes.use("/images",imageRoute)

export default routes
