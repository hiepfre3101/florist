import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import Loading from '../components/Loading/Loading'
import { signup } from '../api/auth/auth'
import { useNavigate } from 'react-router-dom'
import ErrorSpan from '../components/ErrorSpan'
type Props = { status: 'login' | 'signup'; onChangeStatus: (s: 'login' | 'signup') => void }

interface IInputSignup {
   name: string
   email: string
   password: string
   confirmPassword: string
}
const onFinishFailed = () => {}
const Signup = ({ status, onChangeStatus }: Props) => {
   const [isLoading, setIsLoading] = useState(false)
   const [formError, setErrorForm] = useState('')
   const navigate = useNavigate()
   const [form] = Form.useForm()
   const onFinish = async (values: IInputSignup) => {
      try {
         setIsLoading(true)
         const user = await signup(values)
         setIsLoading(false)
         if (user) {
            if (user.data?.status !== 'success') {
               setErrorForm(user.data?.message)
            } else {
               localStorage.setItem('user', JSON.stringify(user.data?.data))
               navigate('/')
            }
         }
      } catch (error) {
         console.log(error)
      }
   }
   if (isLoading) return <Loading />
   if (status === 'login')
      return (
         <button onClick={() => onChangeStatus('signup')} className='text-white z-10 relative'>
            Sign up
         </button>
      )
   return (
      <div>
         <Form
            form={form}
            name='signup'
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
               hasFeedback
               label='Name'
               name='name'
               rules={[{ required: true, message: 'Please input your name!' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='Email'
               name='email'
               rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please input valid email!' }
               ]}
               hasFeedback
            >
               <Input />
            </Form.Item>

            <Form.Item
               label='Password'
               name='password'
               rules={[{ required: true, message: 'Please input your password!' }]}
               hasFeedback
            >
               <Input.Password />
            </Form.Item>
            <Form.Item
               name='confirmPassword'
               label='Confirm Password'
               dependencies={['password']}
               hasFeedback
               rules={[
                  {
                     required: true,
                     message: 'Please confirm your password!'
                  },
                  ({ getFieldValue }) => ({
                     validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                           return Promise.resolve()
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'))
                     }
                  })
               ]}
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

export default Signup
