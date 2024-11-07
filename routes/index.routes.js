import ejemplo from './ejemplo.routes.js'
import jujutsu from './jujutsu.routes.js';
import { Router } from 'express'

const indexRoutes = Router();

indexRoutes.use('/jujutsu', jujutsu)

indexRoutes.use('/ejemplo', ejemplo);

export default indexRoutes;