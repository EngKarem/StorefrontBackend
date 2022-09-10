import { Router } from 'express'
import * as controllers from '../../controllers/product.controller'
import authMiddleware from '../../middleware/auth'

const routes = Router();
// api/products
routes.route('/').post(authMiddleware,controllers.create)
routes.route('/').get(controllers.index)
routes.route('/:id').get(controllers.show)
routes.route('/:id').delete(authMiddleware, controllers.deleteProduct)
export default routes
