import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { ICart } from '../../interface/cart'

const products = localStorage.getItem('cart') !== null ? JSON.parse(localStorage.getItem('cart')!) : []
const initState: ICart = {
   products,
   total: 0
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState: initState,
   reducers: {
      setCart: (state, action) => {
         state.products = action.payload
         state.total = state.products.reduce((price, product) => {
            return product.price * product.quantity + price
         }, 0)
      },
      addCart: (state, action) => {
         const productAdding = state.products.find((product) => product._id === action.payload?._id)
         if (productAdding) {
            productAdding.quantity = action.payload?.quantity + productAdding.quantity
         } else {
            state.products.push(action.payload)
         }
         state.total = state.products.reduce((price, product) => {
            return product.price * product.quantity + price
         }, 0)
         localStorage.setItem('cart', JSON.stringify(state.products))
      },
      removeItem: (state, action) => {
         const listProduct = state.products.filter((product) => product._id !== action.payload)
         state.products = listProduct
         localStorage.setItem('cart', JSON.stringify(listProduct))
         state.total = state.products.reduce((price, product) => {
            return product.price * product.quantity + price
         }, 0)
      }
   }
})
export const totalSelector = (state: RootState) => state.cart.total
export const productSelector = (state: RootState) => state.cart.products
export const priceProductSelector = (state: RootState) => {
   const prices = state.cart.products.map((product) => product.price * product.quantity)
   return prices
}
export default cartSlice.reducer
