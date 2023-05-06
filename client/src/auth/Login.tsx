import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import Loading from '../components/Loading/Loading'
import { signin } from '../api/auth/auth'
import { useNavigate } from 'react-router-dom'
import ErrorSpan from '../components/ErrorSpan'
import { useAppDispatch } from '../hooks/redux/hooks'
import { authSlice } from './authSlice'
type Props = {
   status: 'login' | 'signup'
   onChangeStatus: (s: 'login' | 'signup') => void
}

interface IInputSignin {
   email: string
   password: string
}
const onFinishFailed = () => {}
const Login = ({ status, onChangeStatus }: Props) => {
   const [isLoading, setIsLoading] = useState(false)
   const [formError, setErrorForm] = useState('')
   const navigate = useNavigate()
   const dispatch = useAppDispatch()
   const onFinish = async (values: any) => {
      try {
         setIsLoading(true)
         const user = await signin(values)
         setIsLoading(false)
         if (user) {
            if (user.data?.status !== 'success') {
               setErrorForm(user.data?.message)
            } else {
               dispatch(authSlice.actions.login(true))
               dispatch(authSlice.actions.setUser(user.data?.data))
               dispatch(authSlice.actions.token(user.data?.accessToken))
               localStorage.setItem('user', JSON.stringify(user.data?.data))
               if (user.data?.data?.role === 'admin') {
                  return navigate('/admin')
               }
               navigate('/')
            }
         }
      } catch (error) {
         message.error('Something wrong!')
         setIsLoading(false)
         console.log(error)
      }
   }
   if (isLoading) return <Loading />
   if (status === 'signup')
      return (
         <button onClick={() => onChangeStatus('login')} className='text-white z-10 relative'>
            Login
         </button>
      )
   return (
      <div>
         <Form
            name='login'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            validateTrigger={['onChange', 'onBlur']}
         >
            <Form.Item
               label='Email'
               name='email'
               rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please input valid email!' }
               ]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               label='Password'
               name='password'
               rules={[{ required: true, message: 'Please input your password!' }]}
            >
               <Input.Password />
            </Form.Item>
            <ErrorSpan message={formError} />
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
               <button
                  className='px-4 py-1 rounded-lg duration-300 border border-primary text-primary font-semibold hover:bg-primary hover:text-white'
                  type='submit'
               >
                  Submit
               </button>
            </Form.Item>
         </Form>
      </div>
   )
}

export default Login
