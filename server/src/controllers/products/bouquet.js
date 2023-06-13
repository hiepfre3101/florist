import dotenv from 'dotenv'
import Bouquet from '../../models/products/bouquet.js'
import Category from '../../models/category.js'
import { bouquetSchema } from '../../schemas/products/bouquet.js'
dotenv.config()

export const getAll = async (req, res) => {
   const { _limit = 10, _sort = 'name', _order = 'ascend', _page = 1, _q = '' } = req.query
   const options = {
      sort: { [_sort]: _order === 'descend' ? -1 : 1 },
      limit: _limit,
      populate: [
         { path: 'categories', select: ['name'] },
         { path: 'images', select: ['url'] },
         {
            path: 'ingredients.flower',
            select: ['name']
         }
      ],
      page: _page
   }
   try {
      const products = await Bouquet.paginate(
         {
            name: new RegExp(_q, 'i')
         },
         options
      )
      if (products.docs.length === 0) {
         return res.status(404).json({
            message: 'Không có sản phẩm nào',
            data: []
         })
      }
      return res.json({
         message: 'Lấy danh sách sản phẩm thành công',
         data: products
      })
   } catch (error) {
      return res.status(400).json({
         message: error.message
      })
   }
}
export const getOne = async (req, res) => {
   try {
      const product = await Bouquet.findOne({ _id: req.params.id }).populate([
         {
            path: 'categories',
            select: 'name'
         },
         { path: 'images' }
      ])
      if (!product) {
         return res.json({
            message: 'Không tìm thấy sản phẩm',
            data: {}
         })
      }
      res.json({
         message: 'Lấy sản phẩm thành công',
         data: product
      })
   } catch (error) {
      return res.status(400).json({
         message: error.message
      })
   }
}
export const create = async (req, res) => {
   try {
      const { error } = bouquetSchema.validate(req.body)
      if (error)
         return res.status(400).json({
            message: error.details[0].message
         })
      const product = await Bouquet.create(req.body)
      if (!product) {
         return res.status(404).json({
            message: 'Thêm sản phẩm không thành công'
         })
      }
      product.categories.forEach(async (category) => {
         try {
            await Category.findByIdAndUpdate(category._id, {
               $addToSet: { products: product._id }
            })
         } catch (error) {
            return res.status(404).json({
               message: error.message
            })
         }
      })
      return res.json({
         message: 'Thêm sản phẩm thành công',
         data: product
      })
   } catch (error) {
      return res.status(400).json({
         message: error
      })
   }
}
export const update = async (req, res) => {
   try {
      const { error } = bouquetSchema.validate(req.body)
      if (error)
         return res.status(400).json({
            message: error.details[0].message
         })
      const product = await Bouquet.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (!product) {
         return res.json({
            message: 'Cập nhật sản phẩm không thành công'
         })
      }
      product.categories.forEach(async (category) => {
         try {
            await Category.findByIdAndUpdate(category._id, {
               $addToSet: { products: product._id }
            })
         } catch (error) {
            return res.status(404).json({
               message: error.message
            })
         }
      })
      res.json({
         message: 'Cập nhật sản phẩm thành công',
         product
      })
   } catch (error) {
      return res.status(400).json({
         message: error
      })
   }
}

export const remove = async (req, res) => {
   try {
      const product = await Bouquet.deleteOne({ _id: req.params.id }, { new: true })
      res.json({
         message: 'Xóa sản phẩm thành công',
         product,
         status: 'success'
      })
   } catch (error) {
      return res.status(400).json({
         message: error
      })
   }
}
