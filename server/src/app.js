import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'
import { createServer } from 'http'

import orderRouter from './routes/order.js'
import authRouter from './routes/auth.js'
import bouquetRouter from './routes/products/bouquet.js'
import accessoryRouter from './routes/products/accessory.js'
import flowerRouter from './routes/products/flower.js'
import cusBouquetRouter from './routes/products/cus-bouquet.js'
import categoryRouter from './routes/category.js'
import uploadRouter from './routes/upload.js'
import userRouter from './routes/user.js'
import cartRouter from './routes/cart.js'

dotenv.config()
mongoose.connect(process.env.DB_URL)
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
   cors: '*'
})
io.on('connection', (socket) => {
   socket.on('newOrder', (dataFromCLi) => {
      io.of('/').emit('newOrder', {
         data: `User ${dataFromCLi.data ? dataFromCLi.data : 'nothing'} ordered successfully!`
      })
   })
})
io.of('/admin').on('connection', (socket) => {
   socket.on('newOrder', (dataFromCLi) => {
      console.log(dataFromCLi)
      io.of('/admin').emit('newOrder', {
         data: `Order from user ${dataFromCLi.data ? dataFromCLi.data : 'nothing'} has created!`
      })
   })
})
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use('/api', authRouter)
app.use('/api', flowerRouter)
app.use('/api', accessoryRouter)
app.use('/api', bouquetRouter)
app.use('/api', cusBouquetRouter)
app.use('/api', categoryRouter)
app.use('/api', uploadRouter)
app.use('/api', userRouter)
app.use('/api', orderRouter)
app.use('/api', cartRouter)
httpServer.listen(process.env.PORT)
