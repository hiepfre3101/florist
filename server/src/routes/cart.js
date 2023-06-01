import express from 'express'
import { changeQuantity, create, getOne, removeProduct } from '../controllers/cart.js'

const router = express.Router()

router.get('/cart/:id', getOne)
router.post('/cart/:id', create)
router.put('/cart/:id', changeQuantity)
router.delete('/cart/:id', removeProduct)
export default router
