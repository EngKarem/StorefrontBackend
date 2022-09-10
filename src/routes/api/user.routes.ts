import { Router } from 'express'
import * as controllers from '../../controllers/user.controller'
import authMiddleware from '../../middleware/auth'

const routes = Router();
// api/users
routes.route('/').post(controllers.createUser)
routes.route('/').get(authMiddleware,controllers.index)
routes.route('/:id').get(authMiddleware,controllers.show)
routes.route('/:id').delete(authMiddleware,controllers.deleteUser)
routes.route('/authenticate').post(controllers.authenticate)

export default routes
