import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const truckSvg = () => (
   <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'>
      <defs>
         <clipPath id='a'>
            <path d='M0 0h500v500H0z' />
         </clipPath>
         <clipPath id='c'>
            <path d='M0 0h500v500H0z' />
         </clipPath>
         <clipPath id='b'>
            <path d='M0 0h500v500H0z' />
         </clipPath>
      </defs>
      <g clip-path='url(#a)'>
         <g clip-path='url(#b)' opacity='0'>
            <g fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='12.6' opacity='1'>
               <path
                  stroke='#99ac53'
                  d='m414.624 354.398 22.18-.199v-106.74l-53.71-93.4h-66.38v200.14l23.19.199'
                  opacity='1'
               />
               <path stroke='#99ac53' d='M397.782 179.602h-48.379v66.577h87.403M316.714 299.83h120.092' opacity='1' />
               <path
                  stroke='#99ac53'
                  d='m160.594 354.398 156.12-.199v-240.17H63.194v240.17l20.69.199M66.659 154.054h245.998M66.659 299.83h245.998'
                  opacity='1'
               />
            </g>
            <g opacity='1'>
               <path
                  fill='#99ac53'
                  d='M384.933 354.113a8.172 8.172 0 1 1-16.345 0 8.172 8.172 0 0 1 16.345 0z'
                  opacity='1'
               />
               <path
                  fill='none'
                  stroke='#99ac53'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='12.6'
                  d='M408.619 354.113c0 17.595-14.263 31.858-31.858 31.858s-31.858-14.263-31.858-31.858 14.263-31.858 31.858-31.858 31.858 14.263 31.858 31.858z'
                  opacity='1'
               />
            </g>
            <g opacity='1'>
               <path
                  fill='none'
                  stroke='#99ac53'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='12.6'
                  d='M153.597 354.113c0 17.595-14.263 31.858-31.858 31.858s-31.858-14.263-31.858-31.858 14.263-31.858 31.858-31.858 31.858 14.263 31.858 31.858z'
                  opacity='1'
               />
               <path
                  fill='#99ac53'
                  d='M129.911 354.113a8.172 8.172 0 1 1-16.345 0 8.172 8.172 0 0 1 16.345 0z'
                  opacity='1'
               />
            </g>
            <path
               fill='none'
               stroke='#99ac53'
               stroke-linecap='round'
               stroke-linejoin='round'
               stroke-width='12.6'
               d='M0 0'
               opacity='1'
               transform='translate(268 214)'
            />
         </g>
         <g clip-path='url(#c)'>
            <g fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='12.6'>
               <path stroke='#99ac53' d='m414.624 354.398 22.18-.199v-106.74l-53.71-93.4h-66.38v200.14l23.19.199' />
               <path stroke='#99ac53' d='M397.782 179.602h-48.379v66.577h87.403M316.714 299.83h120.092' />
               <path
                  stroke='#99ac53'
                  d='m160.594 354.398 156.12-.199v-240.17H63.194v240.17l20.69.199M66.659 154.054h245.998M66.659 299.83h245.998'
               />
            </g>
            <g>
               <path fill='#99ac53' d='M384.933 354.113a8.172 8.172 0 1 1-16.345 0 8.172 8.172 0 0 1 16.345 0z' />
               <path
                  fill='none'
                  stroke='#99ac53'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='12.6'
                  d='M408.619 354.113c0 17.595-14.263 31.858-31.858 31.858s-31.858-14.263-31.858-31.858 14.263-31.858 31.858-31.858 31.858 14.263 31.858 31.858z'
               />
            </g>
            <g>
               <path
                  fill='none'
                  stroke='#99ac53'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='12.6'
                  d='M153.597 354.113c0 17.595-14.263 31.858-31.858 31.858s-31.858-14.263-31.858-31.858 14.263-31.858 31.858-31.858 31.858 14.263 31.858 31.858z'
               />
               <path fill='#99ac53' d='M129.911 354.113a8.172 8.172 0 1 1-16.345 0 8.172 8.172 0 0 1 16.345 0z' />
            </g>
            <path
               fill='none'
               stroke='#99ac53'
               stroke-linecap='round'
               stroke-linejoin='round'
               stroke-width='12.6'
               d='M0 0'
               transform='translate(268 214)'
            />
         </g>
         <g className='com'>
            <path />
            <path />
            <path />
            <path />
            <path />
            <path />
            <path />
            <path />
            <path />
            <path />
            <path />
            <path />
         </g>
      </g>
   </svg>
)

export const TruckIcon = (props: Partial<CustomIconComponentProps>) => {
   return <Icon component={truckSvg} {...props} style={{ fontSize: '3rem' }} rev='' />
}
