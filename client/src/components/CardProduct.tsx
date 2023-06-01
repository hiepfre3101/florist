import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IImage } from '../interface/image'

type Props = {
   imgs: IImage[]
   title: string
   price: number
   category: string
   className?: string
   imgSize?: string
   link: string
   titleSize?: string
   priceSize?: string
   hasBg?: boolean
   disableHover?: boolean
}

const CardProduct = ({
   hasBg = false,
   imgs,
   title,
   price,
   className,
   imgSize,
   link,
   titleSize,
   priceSize,
   category,
   disableHover
}: Props) => {
   const [index, setIndex] = useState(1)
   return (
      <Link to={link} className={`block h-full relative ${className}`}>
         <img
            src={imgs[index].url}
            alt='img'
            className={` w-[200px]  aspect-square ${imgSize} duration-700`}
            onMouseOver={() => {
               if (!disableHover) setIndex(imgs.length - 1)
            }}
            onMouseLeave={() => {
               if (!disableHover) setIndex(1)
            }}
         />
         <div className='w-full  flex flex-col items-center gap-2 mt-5'>
            <p className='text-gray font-semibold uppercase text-sm font-vollkorn'>{category}</p>
            <p className={`uppercase text-primary font-semibold font-vollkorn ${titleSize}`}>{title}</p>
            <p className={`uppercase text-greenY font-normal text-[0.8rem] font-vollkorn`}>
               $ <span className={`font-semibold ${priceSize}`}>{price}</span>
            </p>
         </div>
         {hasBg && (
            <div className='-z-10 -right-3 w-full h-2/3 rounded-md rounded-br-[2rem] absolute top-[30%] bg-yellowW'></div>
         )}
      </Link>
   )
}

export default CardProduct
