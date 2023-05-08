import React from 'react'

type Props = {
   title: string
}

const Label = ({ title }: Props) => {
   return <p className='text-primary text-md font-vollkorn'>{title}</p>
}

export default Label
