import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
   img: string
   title: string
   price: number
   category: string
   className?: string
   imgSize?: string
   link: string
   titleSize?: string
   priceSize?: string,
   hasBg?:boolean
}

const CardProduct = ({hasBg=false, img, title, price, className, imgSize, link, titleSize, priceSize, category }: Props) => {
   return (
      <Link to={link} className={`block h-full relative ${className}`}>
         <img src={img} alt='img' className={` w-[200px]  aspect-square ${imgSize}`} />
         <div className='w-full  flex flex-col items-center gap-2 mt-5'>
            <p className='text-gray font-semibold text-sm'>{category}</p>
            <p className={`uppercase text-primary font-semibold ${titleSize}`}>{title}</p>
            <p className={`uppercase text-greenY font-normal text-[0.8rem]`}>
               $ <span className={`font-semibold ${priceSize}`}>{price}</span>
            </p>
         </div>
      {hasBg && <div className='-z-10 -right-3 w-full h-2/3 rounded-md rounded-br-[2rem] absolute top-[30%] bg-yellowW'></div>}
      </Link>
   )
}

export default CardProduct
