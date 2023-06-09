import { CartResponse, ICart, ProductInCart } from '../interface/cart'
import { hoaApi } from './base.service'

export const cartApi = hoaApi.injectEndpoints({
   endpoints: (build) => ({
      getCart: build.query<CartResponse, string | undefined>({
         query: (userId) => ({ url: `cart/${userId}`, method: 'get' }),
         providesTags: (result, error) => {
            if (result?.data?.products) {
               const finalTags = result?.data?.products?.map((product) => ({
                  type: 'Cart' as const,
                  id: product.productId
               }))
               return [...finalTags!, { type: 'Cart', id: 'LIST' }]
            }
            return [{ type: 'Cart', id: 'LIST' }]
         }
      }),
      addToCart: build.mutation<ICart, ProductInCart & { userId: string }>({
         query: ({ userId, ...body }) => ({
            url: `cart/${userId}`,
            method: 'post',
            data: body
         }),
         invalidatesTags: (result) => [{ type: 'Cart', id: 'LIST' }]
      }),
      removeProduct: build.mutation<ICart, { userId: string; productId: string }>({
         query: ({ userId, productId }) => ({
            url: `cart/${userId}?idProduct=${productId}`,
            method: 'delete'
         }),
         invalidatesTags: (result) => [{ type: 'Cart', id: 'LIST' }]
      }),
      changeQuantity: build.mutation<ICart, { userId: string; productId: string; quantity: number | string }>({
         query: ({ userId, productId, ...body }) => ({
            url: `cart/${userId}?idProduct=${productId}`,
            method: 'put',
            data: body
         }),
         invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.productId }]
      })
   })
})

export const { useGetCartQuery, useAddToCartMutation, useRemoveProductMutation, useChangeQuantityMutation } = cartApi
