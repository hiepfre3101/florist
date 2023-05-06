import { Outlet } from 'react-router-dom'

import Header from '../components/Header/Header'
import { useEffect } from 'react'
import { getToken } from '../api/auth/auth'
import { authSlice } from '../auth/authSlice'
import { useAppDispatch } from '../hooks/redux/hooks'
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
      <div className='pb-10 max-w-[1920px] my-0 mx-auto min-h-screen'>
         <Header logout={logout} />
         <div className='w-full h-screen'>
            <Outlet context={{ logout }} />
         </div>
      </div>
   )
}

export default DefaultLayout
