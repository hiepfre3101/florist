import { useEffect, useState } from 'react'
import {
   DesktopOutlined,
   PieChartOutlined,
   HomeOutlined,
   SearchOutlined,
   BellOutlined,
   AppstoreAddOutlined,
   EyeOutlined
} from '@ant-design/icons'
import { Button, ConfigProvider, Dropdown, MenuProps, message } from 'antd'
import { Layout, Menu } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import useMyToken from '../hooks/useMyToken'
import { useAppDispatch, useAppSelector } from '../hooks/redux/hooks'
import { authSlice, selectorUser } from '../slices/authSlice'
import { itemsNavClient } from '../configAntd/navItems'
import { getToken } from '../api/auth/auth'
import { selectAuthStatus } from '../slices/authSlice'
import { adminSocket, socket } from '../socket/config'

const { Content, Header, Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
   return {
      key,
      icon,
      children,
      label
   } as MenuItem
}

const itemsSidebar: MenuItem[] = [
   getItem(<Link to='/'>View Site</Link>, '0', <EyeOutlined rev='' />),
   getItem(<Link to='/admin'>Dashboard</Link>, '1', <HomeOutlined rev='' />),
   getItem('Products', '2', <PieChartOutlined rev='' />, [
      getItem(<Link to='/admin/add-product'>Add product</Link>, '3'),
      getItem(<Link to='/admin/products'>List products</Link>, '4')
   ]),
   getItem('Categories', '5', <DesktopOutlined rev='' />, [
      getItem(<Link to='/admin/add-category'>Add category</Link>, '6'),
      getItem(<Link to='/admin/categories'>List categories</Link>, '7')
   ])
]
type Props = {
   logout: () => void
}
const AdminLayout = ({ logout }: Props) => {
   const [collapsed, setCollapsed] = useState(false)
   const { colorBgContainer, colorText, colorPrimary, colorLinkActive } = useMyToken()
   const isLogin = useAppSelector(selectAuthStatus)
   const user = useAppSelector(selectorUser)
   const items = itemsNavClient({ logout, role: user.role })
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   useEffect(() => {
      ;(async () => {
         const userExist = localStorage.getItem('user')
         const {
            data: { token }
         } = await getToken()
         if (token) {
            dispatch(authSlice.actions.login(true))
            dispatch(authSlice.actions.setUser(JSON.parse(userExist!)))
            dispatch(authSlice.actions.token(token))
         } else {
            message.error('Login Expired!')
            navigate('/auth')
         }
      })()
   }, [isLogin])
   useEffect(() => {
      adminSocket.open()
      adminSocket.on('connect', () => {
         console.log('admin connected')
      })
      adminSocket.on('newOrder', (dataFromSer) => {
         console.log(dataFromSer.data)
      })
      return () => {
         adminSocket.disconnect()
      }
   }, [])
   return (
      <Layout style={{ minHeight: '100vh' }}>
         <Sider
            style={{ backgroundColor: colorBgContainer }}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            className='pt-10'
         >
            <ConfigProvider
               theme={{
                  token: {
                     colorBgContainer,
                     colorText,
                     colorLinkActive,
                     colorPrimary
                  }
               }}
            >
               <Menu defaultSelectedKeys={['1']} mode='inline' items={itemsSidebar} />
            </ConfigProvider>
         </Sider>
         <Layout className='site-layout'>
            <Header style={{ padding: 0, backgroundColor: '#fff' }}>
               <div className='flex w-full justify-end items-center px-10 h-full'>
                  <div className='flex gap-2 justify-evenly w-[14%] items-center'>
                     <SearchOutlined className='cursor-pointer text-xl' rev='' />
                     <BellOutlined className='cursor-pointer text-xl' rev='' />
                     {isLogin ? (
                        <Dropdown menu={{ items }} trigger={['click']}>
                           <img src={user?.avatarDefault} alt='img' className='w-[20%] cursor-pointer' />
                        </Dropdown>
                     ) : (
                        <Link to='/auth'>
                           <button className='h-[50px] px-2 py-1 flex justify-center items-center rounded-md bg-red-400 text-white'>
                              Sign In
                           </button>
                        </Link>
                     )}
                  </div>
               </div>
            </Header>
            <Content className='py-10 px-5'>
               <Outlet context={{ logout }} />
            </Content>
         </Layout>
      </Layout>
   )
}

export default AdminLayout
