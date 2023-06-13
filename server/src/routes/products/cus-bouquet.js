import express from 'express'

import { create, getOne, getAll, remove, update } from '../../controllers/products/custom-bouquet.js'
import { checkPermission } from '../../middleware/checkPermission.js'

const router = express.Router()

router.get('/custom-bouquet', getAll)
router.get('/custom-bouquet/:id', getOne)
router.post('/custom-bouquet', checkPermission, create)
router.put('/custom-bouquet/:id', checkPermission, update)
router.delete('/custom-bouquet/:id', checkPermission, remove)

export default router
