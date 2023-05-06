import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store/store'
import { IUser } from '../interface/user'

interface IAuthState {
   isLogin: boolean
   userInfo: IUser
   token: string
}

const initState: IAuthState = {
   isLogin: false,
   userInfo: {} as IUser,
   token: ''
}

export const authSlice = createSlice({
   name: 'auth',
   initialState: initState,
   reducers: {
      login: (state, action) => {
         state.isLogin = action.payload
      },
      logout: (state, action) => {
         state.isLogin = action.payload
      },
      setUser: (state, action) => {
         state.userInfo = action.payload
      },
      token: (state, action) => {
         state.token = action.payload
      }
   }
})

export const selectAuthStatus = (state: RootState) => state.auth.isLogin
export const selectorToken = (state: RootState) => state.auth.token
export const selectorUser = (state: RootState) => state.auth.userInfo
export default authSlice.reducer
