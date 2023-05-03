import { useState, useEffect } from 'react'
import { message } from 'antd'
import { PercentageOutlined } from '@ant-design/icons'

import { authSlice, selectorUser } from '../../auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks'
import Loading from '../../components/Loading/Loading'
import { Link } from 'react-router-dom'
import Hero from './Hero'
import ProductOfHero from './ProductOfHero'
const HomePage = () => {
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const dispatch = useAppDispatch()
   const nameUser = useAppSelector(selectorUser)
   useEffect(() => {
      const token = localStorage.getItem('token')
      const userExist = localStorage.getItem('user')
      if (token) {
         dispatch(authSlice.actions.login(true))
         dispatch(authSlice.actions.setUser(JSON.parse(userExist!)))
      }
   }, [])
   if (isLoading) return <Loading />
   return (
      <div className='w-full flex '>
         <div className='w-[32%] '>
            <div className='h-[70%] pt-36 px-10'>
               <p className='font-bold text-[3rem] leading-[3rem] max-w-[310px]'>Make someone smile today</p>
               <p className='pl-2 relative font-thin mt-5 before:absolute before:left-0  before:block before:w-[2px] before:h-[100%] before:rounded-lg before:bg-primary'>
                  If you're looking for the most uniqe and greatest bouquets of flowers, you've come to the right place
                  <Link to='/new' className='block underline mt-5'>
                     See new flowers
                  </Link>
               </p>
            </div>
            <div className='h-[40%] bg-[#232229] pt-10 px-10'>
               <p className='text-white font-semibold uppercase'>Special offer</p>
               <p className='font-normal text-white mt-3'>
                  Sign up now and receive 25% off your first order.It's the perfect opportunity to grab that bouquets
                  you've been eyeing.
               </p>
               <div className='text-black mt-5 text-2xl font-semibold p-5 bg-white w-24'>
                  25 <PercentageOutlined />
               </div>
            </div>
         </div>
         <div className='w-[35%] '>
            <Hero />
         </div>
         <div className='w-[33%]'>
            <div className='h-[70%] '>
               <ProductOfHero />
            </div>
            <div className='w-full h-[40%] bg-[#232229] px-10 flex flex-col justify-center items-center relative'>
               <div className='rounded-lg absolute w-36 h-32  bg-white'></div>
               <img
                  src='https://res.cloudinary.com/diqyzhuc2/image/upload/v1681636485/hoaUi/pngimg.com_-_bouquet_PNG17_ha2uum.png'
                  className='w-[70%] bg-transparent z-10'
               />
               <Link to='/shop' className='underline absolute bottom-4 z-10 text-xl text-white'>
                  Shop now
               </Link>
            </div>
         </div>
      </div>
   )
}

export default HomePage
