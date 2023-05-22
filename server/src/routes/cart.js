import express from 'express'
import { create, getOne } from '../controllers/cart.js'

const router = express.Router()

router.get('/cart/:id', getOne)
router.post('/cart/:id', create)

export default router
