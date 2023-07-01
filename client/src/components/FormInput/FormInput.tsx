import React, { ReactNode } from 'react'
import { Form, Input } from 'antd'
import { Rule } from 'antd/es/form'
type Props = {
   label: string | React.ReactNode
   className: string
   name: string
   rules: Rule[]
}

const FormInput = ({ label, className, name, rules }: Props) => {
   return (
      <Form.Item label={label} className={className} name={name} rules={rules}>
         <Input></Input>
      </Form.Item>
   )
}

export default React.memo(FormInput)
