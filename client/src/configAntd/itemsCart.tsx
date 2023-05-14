import { MenuProps } from 'antd'
import { ProductInCart } from '../interface/cart'
import ProductCart from '../components/Cart/ProductCart'
import { Link } from 'react-router-dom'

export const itemsCart = (products: ProductInCart[]): MenuProps['items'] => {
   const productList = products.map((product, index) => ({
      key: `1-${index + 1}`,
      label: <ProductCart product={product} type='hover' />
   }))
   const itemInCart = [
      {
         key: '1',
         type: 'group',
         label: <p className='text-primary uppercase font-vollkorn'>Cart</p>,
         children:
            productList.length > 0
               ? productList
               : [{ key: '1-1', label: <p className='text-primary text-lg'>Cart empty</p> }]
      }
   ]
   return itemInCart
}
