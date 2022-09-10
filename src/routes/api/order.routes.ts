import { Router } from 'express'
import * as controllers from '../../controllers/order.controller'
import authMiddleware from '../../middleware/auth'

const routes = Router()

// api/orders
routes.route('/:user_id').get(authMiddleware,controllers.OrderByUser)
routes.route('/').post(authMiddleware,controllers.create)
routes.route('/:id').delete(controllers.deleteOrder)

export default routes