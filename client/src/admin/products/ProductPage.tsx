import { useEffect, useState } from 'react'
import { deleteProduct, getAllProduct } from '../../api/product/product'
import { IDataResponse, IProduct } from '../../interface/product'
import { columnsProduct } from '../../configAntd/columnsTable'
import { Table, message } from 'antd'
import { AxiosResponse } from 'axios'
import type { TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
interface TableParams {
   pagination?: TablePaginationConfig
   sortField?: string
   sortOrder?: string
   filters?: Record<string, FilterValue>
}
const ProductsPage = () => {
   const [products, setProducts] = useState([] as IProduct[])
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
            const { data }: AxiosResponse<IDataResponse> = await getAllProduct({
               limit: 5,
               page: tableParams.pagination?.current,
               sort: tableParams.sortOrder
            })
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
   }, [tableParams.pagination?.current])
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
   const columns = columnsProduct({ onDelete: removeItem })
   return (
      <div>
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
