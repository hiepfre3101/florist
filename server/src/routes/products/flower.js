import express from 'express'

import { create, getOne, getAll, remove, update } from '../../controllers/products/flower.js'
import { checkPermission } from '../../middleware/checkPermission.js'

const router = express.Router()

router.get('/flower', getAll)
router.get('/flower/:id', getOne)
router.post('/flower', checkPermission, create)
router.put('/flower/:id', checkPermission, update)
router.delete('/flower/:id', checkPermission, remove)

export default router
