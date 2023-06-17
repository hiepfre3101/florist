import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import Loading from '../components/Loading/Loading'
import { signin } from '../api/auth/auth'
import { useNavigate } from 'react-router-dom'
import ErrorSpan from '../components/ErrorSpan'
import { useAppDispatch } from '../hooks/redux/hooks'
import { authSlice } from '../slices/authSlice'
import FooterForm from './components/FooterForm'
type Props = {
   status: 'sign in' | 'sign up'
   onChangeStatus: (s: 'sign in' | 'sign up') => void
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
   if (isLoading) return <Loading sreenSize='lg' />
   return (
      <div className='flex flex-col items-start w-[30%] h-auto aspect-square'>
         <p className='text-primary text-3xl'>Sign in</p>
         <Form
            layout='vertical'
            name='signin'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            validateTrigger={['onChange', 'onBlur']}
            className='bg-yellowW flex justify-center flex-col items-start w-full h-full mt-10 px-6 overflow-auto pt-5 '
         >
            <p className='text-xl text-primary uppercase font-vollkorn mb-10'>information</p>
            <Form.Item
               name='email'
               rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please input valid email!' },
               ]}
            >
               <Input className='rounded-sm p-3 text-[1rem] outline-none' />
            </Form.Item>

            <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
               <Input.Password className='rounded-sm p-3 text-[1rem] outline-none' />
            </Form.Item>
            <ErrorSpan message={formError} />
            <Form.Item className='mt-5'>
               <button
                  className='font-vollkorn text-lg px-4 py-2 rounded-sm  text-white font-semibold w-full flex justify-center items-center bg-greenY'
                  type='submit'
               >
                  Sign in
               </button>
            </Form.Item>
         </Form>
         <FooterForm title="don't have account ?" action={{ changeStatus: onChangeStatus, name: 'sign up' }} />
      </div>
   )
}

export default Login
