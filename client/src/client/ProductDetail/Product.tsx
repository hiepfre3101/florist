import { useEffect, useState } from 'react'
import { IProduct } from '../../interface/product'
import { useParams } from 'react-router-dom'
import { getOneProduct } from '../../api/product/product'
import SlideProduct from './SlideProduct'
const Product = () => {
   const { id: idProduct } = useParams()
   const [product, setProduct] = useState({} as IProduct)
   useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      getOneProduct(idProduct)
         .then(({ data }) => {
            setProduct(data.product)
         })
         .catch((err) => console.log(err))
   }, [idProduct])
   return (
      <div className='gap-32 mt-10 px-36 grid grid-cols-5 w-full'>
         <SlideProduct product={product} />
      </div>
   )
}

export default Product
