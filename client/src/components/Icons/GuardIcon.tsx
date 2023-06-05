import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const guardSvg = () => (
   <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' id='protection' fill='#99ac53'>
      <path d='M32 61a1 1 0 0 1-.27 0A30.08 30.08 0 0 1 10 32.16V10a1 1 0 0 1 .77-1l21-5a1 1 0 0 1 .46 0l21 5a1 1 0 0 1 .77 1v22.16A30.08 30.08 0 0 1 32.27 61a1 1 0 0 1-.27 0ZM12 10.79v21.37A28.08 28.08 0 0 0 32 59a28.08 28.08 0 0 0 20-26.8V10.79L32 6Z'></path>
      <path d='M29.53 38.49a1 1 0 0 1-.71-.29l-6.36-6.36a1 1 0 0 1 0-1.41l2.83-2.83a1 1 0 0 1 1.41 0l2.83 2.83 7.78-7.78a1 1 0 0 1 .71-.29 1 1 0 0 1 .71.29l2.83 2.83a1 1 0 0 1 0 1.41l-11.33 11.3a1 1 0 0 1-.7.3Zm-5-7.36 5 5 9.9-9.9L38 24.76l-7.78 7.78a1 1 0 0 1-1.41 0L26 29.71Z'></path>
   </svg>
)

export const GuardIcon = (props: Partial<CustomIconComponentProps>) => {
   return <Icon component={guardSvg} {...props} style={{ fontSize: '3rem' }} rev='' />
}
