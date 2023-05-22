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
      const productExist = cartExist.products.find((product) => product.productId === productAdd._id)
      if (productExist) {
         productExist.quantity += productAdd.quantity
         productExist.totalAmount += productAdd.quantity * productAdd.price
         cartExist.products.filter((product) => product._id !== productExist._id).push(productExist)
      } else {
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
export const update = async (req, res) => {
   try {
      const { error } = categorySchema.validate(req.body)
      if (error)
         return res.status(400).json({
            message: error.details[0].message
         })
      const category = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (!category) {
         return res.json({
            message: 'Cập nhật danh mục không thành công'
         })
      }
      const typeUpdated = await Type.findByIdAndUpdate(req.body.type, {
         $addToSet: { subCategories: category._id }
      })
      res.json({
         message: 'Cập nhật danh mục thành công',
         category,
         type: typeUpdated
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
            message: 'Không tìm thấy giỏ hàng'
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
      const category = await Category.deleteOne({ _id: req.params.id }, { new: true })
      // if (!product) {
      //     return res.json({
      //         message: "Xóa sản phẩm không thành công",
      //     });
      // }
      res.json({
         message: 'Xóa danh mục thành công',
         category
      })
   } catch (error) {
      return res.status(400).json({
         message: error
      })
   }
}
