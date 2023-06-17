import { Button, MenuProps } from 'antd'
import { Link } from 'react-router-dom'
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons'

type argsNav = {
   logout: () => void
   role?: string
}
export const itemsNav = ({ logout }: argsNav): MenuProps['items'] => [
   {
      key: '1',
      label: (
         <Link to={'/admin/profile'}>
            <UserOutlined rev='' /> Your Profile
         </Link>
      )
   },
   {
      key: '2',
      label: (
         <Button onClick={logout}>
            <PoweroffOutlined rev='' />
            Log out
         </Button>
      )
   }
]
export const itemsNavClient = ({ logout, role }: argsNav): MenuProps['items'] => {
   const items = [
      {
         key: '1',
         label: (
            <Link to={'/profile'}>
               <UserOutlined rev='' /> Your Profile
            </Link>
         )
      },
      {
         key: '2',
         label: (
            <Button onClick={logout}>
               <PoweroffOutlined rev='' />
               Log out
            </Button>
         )
      }
   ]
   let itemsReturn
   if (role === 'admin') {
      itemsReturn = [
         {
            key: '3',
            label: (
               <Link to={'/admin'}>
                  <UserOutlined rev='' /> Manage your website
               </Link>
            )
         },
         ...items
      ]
   } else {
      itemsReturn = [...items]
   }
   return itemsReturn
}
