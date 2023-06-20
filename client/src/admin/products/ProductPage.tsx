import { useEffect, useMemo, useState } from 'react'
import { deleteProduct, getAllProduct } from '../../api/product/product'
import { IDataResponse, IProduct } from '../../interface/product'
import { columnsProduct } from '../../configAntd/columnsTable'
import { Table, message, Select } from 'antd'
import { AxiosResponse } from 'axios'
import type { TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import { TypeForm } from '../../configAntd/custom-form/configForm'
interface TableParams {
   pagination?: TablePaginationConfig
   sortField?: string
   sortOrder?: string
   filters?: Record<string, FilterValue>
}
const types: TypeForm[] = ['accessory', 'bouquet', 'flower']
const ProductsPage = () => {
   const [products, setProducts] = useState([] as IProduct[])
   const [typeProduct, setTypeProduct] = useState<TypeForm>('bouquet')
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [tableParams, setTableParams] = useState<TableParams>({
      pagination: {
         current: 1,
         pageSize: 10
      }
   })
   useEffect(() => {
      ;(async () => {
         try {
            setIsLoading(true)
            const { data }: AxiosResponse<IDataResponse> = await getAllProduct(
               {
                  limit: 5,
                  page: tableParams.pagination?.current,
                  sort: tableParams.sortOrder
               },
               typeProduct
            )
            const formatedProducts = data.data.docs.map((product) => {
               return {
                  key: product._id,
                  ...product
               }
            })
            setProducts(formatedProducts)
            setTableParams({
               ...tableParams,
               pagination: {
                  ...tableParams.pagination,
                  current: data.data.page,
                  pageSize: data.data.limit,
                  total: data.data.totalDocs
               }
            })
            setIsLoading(false)
         } catch (error) {
            console.log(error)
         }
      })()
   }, [tableParams.pagination?.current, typeProduct])
   const removeItem = async (id: string): Promise<void> => {
      try {
         const {
            data: { status }
         } = await deleteProduct(id)
         if (status !== 'success') {
            message.error('Delete fail!')
            return
         }
         const newProducts = products.filter((product) => product._id !== id)
         message.success('Delete successfully!')
         setProducts(newProducts)
      } catch (error) {
         message.error('Delete fail!')
         console.log(error)
      }
   }
   const handleTableChange = (pagination: TablePaginationConfig, sorter: SorterResult<IProduct>) => {
      setTableParams({
         pagination,
         ...sorter
      })
      if (pagination.pageSize !== tableParams.pagination?.pageSize) {
         setProducts([])
      }
   }
   const columns = useMemo(() => columnsProduct({ onDelete: removeItem }), [typeProduct])
   return (
      <div>
         <Select placeholder='Type' className='w-full mb-5' onChange={(value) => setTypeProduct(value)}>
            {types.map((type, index) => (
               <Select.Option key={index} value={type}>
                  {type.toUpperCase()}
               </Select.Option>
            ))}
         </Select>
         <Table
            onChange={handleTableChange}
            dataSource={products}
            columns={columns}
            pagination={tableParams.pagination}
            loading={isLoading}
         ></Table>
      </div>
   )
}

export default ProductsPage
