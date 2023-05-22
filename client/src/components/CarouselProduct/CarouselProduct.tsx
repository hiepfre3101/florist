import Carousel from 'antd/es/carousel'

import { IProduct } from '../../interface/product'
import useCarousel from '../../hooks/useCarousel'
import CardProduct from '../CardProduct'

type Props = {
   products: IProduct[]
}

const CarouselProduct = ({ products }: Props) => {
   const { carouselRef, NextArrow, PrevArrow } = useCarousel({ list: products })
   return (
      <div className='w-full relative mt-20 px-20 mb-20'>
         <p className='text-primary text-3xl font-semobold text-center '>New bouquets</p>
         <Carousel
            className='mt-10 relative'
            ref={carouselRef}
            dots={false}
            lazyLoad='progressive'
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
            arrows={true}
            slidesToShow={5}
            slidesToScroll={1}
         >
            {products.map((product, index) => (
               <CardProduct
                  key={index}
                  imgs={product.images}
                  title={product.name}
                  link={`/${product._id}`}
                  price={product.price}
                  category={product.type.name}
                  imgSize='w-full aspect-square'
               />
            ))}
         </Carousel>
      </div>
   )
}

export default CarouselProduct
