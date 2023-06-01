import { useState, useEffect } from 'react'
import { message } from 'antd'

import { authSlice } from '../../slices/authSlice'
import { useAppDispatch } from '../../hooks/redux/hooks'
import Loading from '../../components/Loading/Loading'
import { useLogout } from '../../App'
import { getToken } from '../../api/auth/auth'
import OutstandProducts from './OutstandProducts'
import Hero from './Hero'
import CarouselProduct from '../../components/CarouselProduct/CarouselProduct'
const HomePage = () => {
   const { logout } = useLogout()
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const dispatch = useAppDispatch()
   useEffect(() => {
      ;(async () => {
         setIsLoading(true)
         const userExist = localStorage.getItem('user')
         const {
            data: { token }
         } = await getToken()
         if (token && userExist) {
            dispatch(authSlice.actions.login(true))
            dispatch(authSlice.actions.setUser(JSON.parse(userExist!)))
         } else {
            logout()
         }
         setIsLoading(false)
      })()
   }, [])
   if (isLoading) return <Loading sreenSize='lg' />
   return (
      <div className='w-full min-h-[500px]'>
         <Hero />
         <OutstandProducts />
      </div>
   )
}

export default HomePage
