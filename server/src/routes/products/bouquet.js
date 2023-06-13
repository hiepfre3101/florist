import express from 'express'

import { create, getOne, getAll, remove, update } from '../../controllers/products/bouquet.js'
import { checkPermission } from '../../middleware/checkPermission.js'

const router = express.Router()

router.get('/bouquet', getAll)
router.get('/bouquet/:id', getOne)
router.post('/bouquet', checkPermission, create)
router.put('/bouquet/:id', checkPermission, update)
router.delete('/bouquet/:id', checkPermission, remove)

export default router
