import express, {Request,Response}from 'express';
import usersRoutes from './api/user.routes'
import productsRoutes from './api/product.routes'
import ordersRoutes from './api/order.routes'


const routes = express.Router();

routes.get('/', (req:Request, res:Response) :void=> {
  res.send('main api routes');
});
routes.use('/users', usersRoutes)
routes.use('/products', productsRoutes)
routes.use('/orders', ordersRoutes)

export default routes;
