import React, { useEffect, useState } from 'react'

import { ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

type Props = {}

type IHeroData = {
   image: string
   link: string
   title: string
   description: string
}
const fakeData: IHeroData[] = [
   {
      image: 'https://res.cloudinary.com/diqyzhuc2/image/upload/v1681555270/hoaUi/pexels-secret-garden-931164_n9sxh7.jpg',
      link: '/bouquets',
      title: 'New collections',
      description:
         'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa dolorem officiis eos ratione recusandae aspernatur obcaecati nobis similique corporis, quos veniam corrupti quibusdam tempora facere ea pariatur omnis, est ut.'
   },
   {
      image: 'https://res.cloudinary.com/diqyzhuc2/image/upload/v1683284991/hoaUi/pexels-secret-garden-931147_nivuoq.jpg',
      link: '/new',
      title: 'New flowers',
      description:
         'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa dolorem officiis eos ratione recusandae aspernatur obcaecati nobis similique corporis, quos veniam corrupti quibusdam tempora facere ea pariatur omnis, est ut.'
   },
   {
      image: 'https://res.cloudinary.com/diqyzhuc2/image/upload/v1681555270/hoaUi/pexels-secret-garden-931164_n9sxh7.jpg',
      link: '/offer',
      title: 'Discount',
      description:
         'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa dolorem officiis eos ratione recusandae aspernatur obcaecati nobis similique corporis, quos veniam corrupti quibusdam tempora facere ea pariatur omnis, est ut.'
   }
]

const Hero = (props: Props) => {
   const [slide, setSlide] = useState<IHeroData>({} as IHeroData)
   const [index, setIndex] = useState<number>(0)
   useEffect(() => {
      const timeId = setTimeout(() => {
         if (index === fakeData.length - 1) {
            setIndex(0)
         } else {
            setIndex((prev) => prev + 1)
         }
      }, 5000)
      setSlide(fakeData[index])
      return () => {
         clearTimeout(timeId)
      }
   }, [index])
   const handleChangeIndex = (indexData: number) => {
      setIndex(indexData)
   }
   return (
      <div className='h-full'>
         {' '}
         <div className='h-full'>
            <img src={slide.image} className='w-full h-full object-cover' />
            <div className='flex justify-center absolute bottom-6 gap-1 w-full'>
               {fakeData.map((item, i) => (
                  <svg width={30} height={30} onClick={() => handleChangeIndex(i)} className='cursor-pointer'>
                     <circle
                        cx='20'
                        cy='20'
                        r={index === i ? 4 : 3}
                        strokeWidth={1}
                        stroke={i === index ? 'white' : 'none'}
                        fill={i === index ? 'transparent' : 'white'}
                     />
                  </svg>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Hero
