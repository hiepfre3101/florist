import React, { useRef, useState } from 'react'
import Carousel, { CarouselRef } from 'antd/es/carousel'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'

import { IProduct } from '../../interface/product'
import useCarousel from '../../hooks/useCarousel'

type Props = {
   product: IProduct
}

const SlideProduct = ({ product }: Props) => {
   const { carouselRef, NextArrow, PrevArrow, setCurrentSlide, currentSlide } = useCarousel({ list: product.images })
   return (
      <div className='col-start-1 col-end-4 relative flex justify- gap-12'>
         <div className='flex w-[15%]  justify-start flex-col gap-2'>
            {product?.images?.map((img, index) => (
               <div
                  key={index}
                  onClick={() => {
                     carouselRef?.current?.goTo(index)
                     setCurrentSlide(index)
                  }}
                  className='w-full relative'
               >
                  <img src={img.url} className='w-full aspect-square rounded-lg rounded-br-[1.5rem] cursor-pointer' />
                  {index !== currentSlide && (
                     <div className='cursor-pointer rounded-lg rounded-br-[1.5rem] bg-[rgba(222,222,222,0.5)] w-full h-full absolute top-0 left-0'></div>
                  )}
               </div>
            ))}
         </div>
         <div className='w-[70%]'>
            <Carousel
               ref={carouselRef}
               dots={false}
               lazyLoad='progressive'
               nextArrow={<NextArrow />}
               prevArrow={<PrevArrow />}
               arrows={true}
            >
               {product?.images?.map((img, index) => (
                  <img key={index} src={img.url} alt='img' className='rounded-md w-full aspect-square' />
               ))}
            </Carousel>
         </div>
      </div>
   )
}

export default SlideProduct
