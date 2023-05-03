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
      image: 'https://res.cloudinary.com/diqyzhuc2/image/upload/v1681555270/hoaUi/pexels-secret-garden-931164_n9sxh7.jpg',
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
         <div className='h-[70%]'>
            <img src={slide.image} className='w-full h-full' />
         </div>
         <div className='h-[40%] pt-10 px-10 relative'>
            <Link to={slide.link}>
               {' '}
               <button className='w-25 h-25 rounded-full bg-white p-2 absolute top-[-3rem] left-1/2 translate-x-[-50%]'>
                  <div className='bg-primary text-white p-5 text-2xl font-bold rounded-full flex items-center justify-center'>
                     <ArrowRightOutlined />
                  </div>
               </button>
            </Link>
            <p className='font-bold text-[2.5rem] leading-[3rem] text-center mt-5'>{slide.title}</p>
            <p className='text-sm font-normal text-center'>{slide.description}</p>
            <div className='absolute bottom-3 left-1/2 translate-x-[-50%]'>
               <div className='flex items-center justify-between gap-2'>
                  {fakeData.map((_, indexData) => (
                     <div
                        onClick={() => handleChangeIndex(indexData)}
                        className={`${
                           indexData === index ? 'bg-black p-[0.4rem]' : 'p-1 border border-black'
                        } duration-300 rounded-full cursor-pointer`}
                        key={indexData}
                     ></div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Hero
