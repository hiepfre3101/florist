import React from 'react'
import { Link } from 'react-router-dom'
import Col from './ColFooter'
import { FacebookOutlined, InstagramOutlined, AlibabaOutlined } from '@ant-design/icons'
import { logoWhiteLink } from '../Header/Header'

type Props = {}

const data = [
   {
      label: 'hoa',
      childs: [
         {
            link: '/',
            title: 'About'
         },
         {
            link: '/',
            title: 'Delivery'
         },
         {
            link: '/',
            title: 'Contacts'
         }
      ]
   },
   {
      label: 'catalog',
      childs: [
         {
            link: '/',
            title: 'Roses'
         },
         {
            link: '/',
            title: 'Tulip'
         },
         {
            link: '/',
            title: 'Wedding'
         },
         {
            link: '/',
            title: 'Birthday'
         }
      ]
   },
   {
      label: 'join us',
      childs: [
         {
            link: '/',
            title: 'Facebook',
            icon: <FacebookOutlined />
         },
         {
            link: '/',
            title: 'Instagram',
            icon: <InstagramOutlined />
         },
         {
            link: '/',
            title: 'Alibaba',
            icon: <AlibabaOutlined />
         }
      ]
   }
]
const logoGreenLink = 'https://res.cloudinary.com/diqyzhuc2/image/upload/v1683469577/logo2_utvj2m.png'
const Footer = (props: Props) => {
   return (
      <footer className='px-14 py-5 w-full grid grid-cols-6 bg-primary gap-10 '>
         <Link to='/' className='col-start-1 col-span-1 flex items-center justify-center'>
            <img src={logoGreenLink} alt='img' className='h-auto w-[50%]' />
         </Link>
         <div className='col-start-2 col-span-4 grid grid-cols-6'>
            {data.map((item, i) => (
               <Col label={item.label} childItems={item.childs} key={i} />
            ))}
         </div>
         <div className='border-t-[rgba(153,172,83,0.5)] border-t-[1px] col-span-6 pb-3 pt-3 flex justify-between '>
            <p className='text-[0.75rem] text-gray'>2023 HOA. All rights reserve</p>
            <div className='w-[30%] flex justify-end items-center gap-10'>
               <Link to='' className='text-[0.75rem] text-gray'>
                  Terms
               </Link>
               <Link to='' className='text-[0.75rem] text-gray'>
                  Cookie Policy
               </Link>
               <Link to='' className='text-[0.75rem] text-gray'>
                  Privacy policy
               </Link>
            </div>
         </div>
      </footer>
   )
}

export default Footer
