import React from 'react'
import { Avatar, List } from 'antd'
type Props = {
   data: { listData: any[] }[]
   onRemove?: (id: string) => void
}

function ListItem<T>({ data, onRemove }: Props) {
   console.log('render')
   if (data.length === 0) return <>No Data</>
   return (
      <div className='w-full max-h-[400px] overflow-auto'>
         <List itemLayout='horizontal'>
            {data.map((item: any, index) => (
               <List.Item
                  key={index}
                  actions={
                     onRemove
                        ? [
                             <p className='cursor-pointer' onClick={() => onRemove(item?.listData._id)}>
                                Remove
                             </p>
                          ]
                        : []
                  }
               >
                  <List.Item.Meta
                     avatar={<Avatar src={item?.listData?.images[0]?.url} />}
                     title={<p>{item?.listData.name}</p>}
                  >
                  </List.Item.Meta>
                     <p className='font-semibold'>x{item?.quantity}</p>
               </List.Item>
            ))}
         </List>
      </div>
   )
}

export default React.memo(ListItem)
