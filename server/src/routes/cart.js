import express from 'express'
import { changeQuantity, create, getOne, removeProduct } from '../controllers/cart.js'
import { checkPermission } from '../middleware/checkPermission.js'
import { checkParams } from '../middleware/checkParams.js'
const router = express.Router()

router.get('/cart/:id', checkParams, getOne)
router.post('/cart/:id', checkPermission, create)
router.put('/cart/:id', checkPermission, changeQuantity)
router.delete('/cart/:id', checkPermission, removeProduct)
export default router
