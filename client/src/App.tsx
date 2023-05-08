import { useEffect } from 'react'
import { BrowserRouter, useOutletContext } from 'react-router-dom'
import { Route, Routes } from 'react-router'

import { message } from 'antd'
import { authSlice } from './auth/authSlice'
import { useAppDispatch } from './hooks/redux/hooks'
import { adminRoutes, clientRoutes } from './routes'
import DefaultLayout from './layouts/DefaultLayout'
import { FormContextProvider } from './context/statusForm'
import AdminLayout from './layouts/AdminLayout'
import HomePage from './client/HomePage/HomePage'
import AuthenForm from './auth/AuthenForm'
import { clearToken } from './api/auth/auth'

type ContextOutlet = {
   logout: () => void
}
function App() {
   const [messageApi, contextHolder] = message.useMessage()
   const dispatch = useAppDispatch()
   const handleLogout = async () => {
      try {
         const {
            data: { status }
         } = await clearToken()
         if (status !== 'success') {
            message.error('something wrong!')
            return
         }
         localStorage.removeItem('user')
         dispatch(authSlice.actions.token(''))
         dispatch(authSlice.actions.setUser({}))
         dispatch(authSlice.actions.logout(false))
      } catch (error) {
         message.error('something wrong!')
         console.log(error)
      }
   }
   useEffect(() => {
      const token = localStorage.getItem('token')
      const userExist = localStorage.getItem('user')
      if (token) {
         dispatch(authSlice.actions.login(true))
         dispatch(authSlice.actions.setUser(JSON.parse(userExist!)))
      }
   }, [])
   return (
      <div className='App max-w-[1920px] my-0 mx-auto'>
         {contextHolder}
         <BrowserRouter>
            <Routes>
               <Route
                  path='/'
                  element={
                     <FormContextProvider>
                        <DefaultLayout logout={handleLogout} />
                     </FormContextProvider>
                  }
               >
                  <Route index element={<HomePage />}></Route>
                  {clientRoutes.map((route, index) => {
                     const Page = route.element
                     return <Route key={index} path={route.path} element={<Page />}></Route>
                  })}
               </Route>
               <Route path='/admin' element={<AdminLayout logout={handleLogout} />}>
                  {adminRoutes.map((route, index) => {
                     const Page = route.element
                     return <Route key={index} path={route.path} element={<Page />}></Route>
                  })}
               </Route>
            </Routes>
         </BrowserRouter>
      </div>
   )
}
export const useLogout = () => {
   return useOutletContext<ContextOutlet>()
}
export default App
