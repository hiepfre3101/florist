import { useEffect, useState } from 'react'
import { IProduct } from '../../interface/product'
import { RightOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { getOneProduct } from '../../api/product/product'
import { Card, message } from 'antd'
import { getOneCategory } from '../../api/category/category'
const Product = () => {
   const { id: idProduct } = useParams()
   const [product, setProduct] = useState({} as IProduct)
   const [curImage, setCurImage] = useState(
      'https://res.cloudinary.com/diqyzhuc2/image/upload/v1683256364/ozohlpcxqxbu942o5nmy.jpg'
   )
   useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      getOneProduct(idProduct)
         .then(({ data }) => setProduct(data.product))
         .catch((err) => console.log(err))
   }, [idProduct])
   return (
      <div className='gap-32 mt-10 px-36 grid grid-cols-4 w-full'>
         <div className='col-start-1 col-end-3 relative'>
            <div className='relative'>
               <button className='top-1/2  border border-gray -right-3 p-3 absolute bg-white rounded-full w-[20px] h-[20px] flex justify-center items-center'>
                  <RightOutlined className='text-gray text-sm' />
               </button>
               <img
                  src={curImage}
                  alt='img'
                  className='rounded-lg w-full aspect-square rounded-br-3xl border border-gray'
               />
            </div>
            <div className='flex w-full gap-2 mt-5 justify-between'>
               {product.images.map((img, index) => (
                  <img
                     key={index}
                     src={img.url}
                     className='w-[30%] aspect-square rounded-lg rounded-br-[1.5rem] cursor-pointer'
                     onClick={() => setCurImage(img.url)}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}

export default Product
