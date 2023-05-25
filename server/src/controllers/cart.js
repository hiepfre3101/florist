import dotenv from 'dotenv'
import Cart from '../models/cart.js'
import User from '../models/user.js'
import { categorySchema } from '../schemas/category.js'
import { productInCartSchema } from '../schemas/product.js'

dotenv.config()

export const getAll = async (req, res) => {
   try {
      const categories = await Category.find().populate({ path: 'type' })
      if (categories.length === 0) {
         return res.status(201).json({
            message: 'Không có danh muc nào',
            data: []
         })
      }
      return res.json({
         message: 'Lấy danh sách sản phẩm thành công',
         data: categories
      })
   } catch (error) {
      return res.status(400).json({
         message: error.message
      })
   }
}
const addProduct = async (cartExist, productAdd, res) => {
   try {
      const productExist = cartExist.products.find((product) => product.productId === productAdd.productId)
      if (productExist) {
         productExist.quantity += productAdd.quantity
         cartExist.totalAmount += productAdd.quantity * productAdd.price
      } else {
         cartExist.totalAmount += productAdd.quantity * productAdd.price
         cartExist.products.push(productAdd)
      }
      const cartUpdated = await Cart.findOneAndUpdate({ _id: cartExist._id }, cartExist, { new: true })
      return res.status(200).json({
         message: 'Thêm vào giỏ hàng thành công',
         data: cartUpdated
      })
   } catch (error) {
      console.log(error.message)
      return res.status(404).json({
         message: 'Thêm vào giỏ hàng không thành công'
      })
   }
}
export const create = async (req, res) => {
   try {
      const userId = req.params.id
      const productNeedToAdd = req.body
      const userExist = await User.findById(userId)
      if (!userExist) {
         return res.status(404).json({
            message: 'Người dùng không tồn tại !'
         })
      }
      const { error } = productInCartSchema.validate(req.body)
      if (error) {
         return res.status(400).json({
            message: error.details[0].message
         })
      }
      const cartExist = await Cart.findOne({ userId: userId })
      if (cartExist) {
         return addProduct(cartExist, productNeedToAdd, res)
      }
      const newCart = await Cart.create({
         userId,
         products: [
            {
               productId: productNeedToAdd._id,
               ...productNeedToAdd
            }
         ],
         totalAmount: productNeedToAdd.price * productNeedToAdd.quantity
      })
      if (!newCart) {
         return res.json({
            message: 'Thêm vào giỏ hàng không thành công'
         })
      }
      return res.json({
         message: 'Thêm vào giỏ hàng thành công',
         data: newCart
      })
   } catch (error) {
      return res.status(400).json({
         message: error.message
      })
   }
}
export const getOne = async (req, res) => {
   try {
      const cart = await Cart.findOne({ userId: req.params.id })
      if (!cart) {
         return res.json({
            message: 'Không tìm thấy giỏ hàng',
            data: []
         })
      }
      res.json({
         message: 'Lấy giỏ hàng thành công',
         data: cart
      })
   } catch (error) {
      return res.status(400).json({
         message: error.message
      })
   }
}
export const removeProduct = async (req, res) => {
   try {
      const idUser = req.params.id
      const { idProduct = '' } = req.query
      const userExist = await User.findOne({ _id: idUser })
      if (!userExist) {
         return res.json({
            message: 'Sign in please!'
         })
      }
      const cart = await Cart.findOne({ userId: idUser })
      const productsUpdated = cart.products.filter((product) => product.productId !== idProduct)
      const totalUpdated = productsUpdated.reduce((total, product) => {
         return (total += product.quantity * product.price)
      }, 0)
      const cartUpdated = await Cart.findOneAndUpdate(
         { userId: idUser },
         { $set: { products: productsUpdated, totalAmount: totalUpdated } },
         { new: true }
      )
      res.json({
         message: 'Xóa san pham thành công',
         data: cartUpdated
      })
   } catch (error) {
      return res.status(400).json({
         message: error.message
      })
   }
}