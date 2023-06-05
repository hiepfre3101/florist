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
      image: 'https://res.cloudinary.com/diqyzhuc2/image/upload/v1685955473/hoaUi/pexels-secret-garden-931164_a691pm.jpg',
      link: '/bouquets',
      title: 'Handmade Bouquets',
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
      image: 'https://res.cloudinary.com/diqyzhuc2/image/upload/v1685955473/hoaUi/pexels-secret-garden-931164_a691pm.jpg',
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
      <div className='relative'>
         <div className='absolute text-white max-w-[500px] left-40 top-1/2 translate-y-[-50%] z-20'>
            <p className='text-[3rem] text-up' key={index}>
               {slide.title}
            </p>
            <p className='text-up' key={index + 1}>
               {slide.description}
            </p>
            <Link to={'/new'}>
               <button className='w-1/3 bg-greenY text-white rounded-sm p-3 mt-10'>Shop Now</button>
            </Link>
         </div>
         <div className='relative'>
            {' '}
            <div className='w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.2)]'></div>
            <img src={slide.image} className='w-full lg:max-h-[600px] max-h-[400px] object-cover' />
         </div>
         <div className='flex justify-center absolute bottom-6 gap-1 w-full'>
            {fakeData.map((item, i) => (
               <svg key={i} width={30} height={30} onClick={() => handleChangeIndex(i)} className='cursor-pointer'>
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
   )
}

export default Hero
