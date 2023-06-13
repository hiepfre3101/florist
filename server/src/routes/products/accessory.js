import express from 'express'

import { create, getOne, getAll, remove, update } from '../../controllers/products/accessory.js'
import { checkPermission } from '../../middleware/checkPermission.js'

const router = express.Router()

router.get('/accessory', getAll)
router.get('/accessory/:id', getOne)
router.post('/accessory', checkPermission, create)
router.put('/accessory/:id', checkPermission, update)
router.delete('/accessory/:id', checkPermission, remove)

export default router
