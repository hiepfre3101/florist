import { message } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { getToken } from '../api/auth/auth'
import { useAppDispatch } from '../hooks/redux/hooks'
import { authSlice } from '../slices/authSlice'
import { useLogout } from '../App'
const Dashboard = () => {
   const { logout } = useLogout()
   const navigate = useNavigate()
   const dispatch = useAppDispatch()
   useEffect(() => {
      ;(async () => {
         const userExist = localStorage.getItem('user')
         const {
            data: { token }
         } = await getToken()
         if (token) {
            dispatch(authSlice.actions.login(true))
            dispatch(authSlice.actions.setUser(JSON.parse(userExist!)))
         } else {
            navigate('/')
         }
      })()
   }, [])
   return <div>Dashboard</div>
}

export default Dashboard
