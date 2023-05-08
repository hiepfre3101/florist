import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import Loading from '../components/Loading/Loading'
import { signup } from '../api/auth/auth'
import { useNavigate } from 'react-router-dom'
import ErrorSpan from '../components/ErrorSpan'
import FooterForm from './components/FooterForm'
import Label from './components/Label'
type Props = { status: 'sign in' | 'sign up'; onChangeStatus: (s: 'sign in' | 'sign up') => void }

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
   if (isLoading) return <Loading sreenSize='lg'/>
   return (
      <div className='flex flex-col  items-start w-[30%] h-auto aspect-square'>
         <p className='text-primary text-[3rem]'>Sign up</p>
         <Form
            form={form}
            layout='vertical'
            name='signup'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            validateTrigger={['onChange', 'onBlur']}
            className='bg-yellowW flex justify-center flex-col items-start w-full h-full mt-10 px-6 overflow-auto pt-64'
         >
            <p className='text-xl text-primary uppercase font-vollkorn mb-5'>information</p>
            <Form.Item
               label={<Label title='Your name' />}
               hasFeedback
               name='name'
               rules={[{ required: true, message: 'Please input your name!' }]}
            >
               <Input className='rounded-sm p-3 text-[1rem] outline-none' />
            </Form.Item>
            <Form.Item
               label={<Label title='Email' />}
               name='email'
               rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please input valid email!' }
               ]}
               hasFeedback
            >
               <Input className='rounded-sm p-3 text-[1rem] outline-none' />
            </Form.Item>

            <Form.Item
               label={<Label title='Password' />}
               name='password'
               rules={[{ required: true, message: 'Please input your password!' }]}
               hasFeedback
            >
               <Input.Password className='rounded-sm p-3 text-[1rem] outline-none' />
            </Form.Item>
            <Form.Item
               label={<Label title='Confirm password' />}
               name='confirmPassword'
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
               <Input.Password className='rounded-sm p-3 text-[1rem] outline-none' />
            </Form.Item>
            <ErrorSpan message={formError} />
            <Form.Item className='mt-10'>
               <button
                  className='font-vollkorn text-lg px-4 py-2 rounded-sm  text-white font-semibold w-full flex justify-center items-center bg-greenY'
                  type='submit'
               >
                  Sign up
               </button>
            </Form.Item>
         </Form>
         <FooterForm title='already have account ?' action={{ changeStatus: onChangeStatus, name: 'sign in' }} />
      </div>
   )
}

export default Signup
