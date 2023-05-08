import { Outlet } from 'react-router-dom'

import Header from '../components/Header/Header'
import { useEffect } from 'react'
import { getToken } from '../api/auth/auth'
import { authSlice } from '../auth/authSlice'
import { useAppDispatch } from '../hooks/redux/hooks'
import Footer from '../components/Footer/Footer'
type Props = {
   logout: () => void
}
const DefaultLayout = ({ logout }: Props) => {
   const dispatch = useAppDispatch()
   useEffect(() => {
      ;(async () => {
         const {
            data: { token }
         } = await getToken()
         if (token) {
            dispatch(authSlice.actions.token(token))
         }
      })()
   }, [])
   return (
      <div className='max-w-[1920px] my-0 mx-auto relative'>
         <Header logout={logout} />
         <Outlet context={{ logout }}/>
         <Footer />
      </div>
   )
}

export default DefaultLayout
