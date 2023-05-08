import { IProduct } from '../../interface/product'
import useListItem from '../../hooks/useListItem'
import { getAllProduct } from '../../api/product/product'
import Loading from '../../components/Loading/Loading'
import CardProduct from '../../components/CardProduct'

type Props = {}

const OutstandProducts = (props: Props) => {
   const { data, loading } = useListItem<IProduct[]>({ getList: getAllProduct, options: { limit: 5 } })
   if (loading) return <Loading />
   return (
      <div className='w-[90%] p-5 mt-10 my-0 mx-auto'>
         <p className='text-primary text-3xl font-semobold text-center'>Hurry up to order</p>
         <div className='grid grid-cols-4 grid-rows-2 gap-[3rem] mt-10 p-5 ' >
            {data?.map((product, index) => (
               <div className={index === 1 ? 'col-start-2 col-end-4 row-start-1 row-end-3' : ''} key={index}>
                  <CardProduct
                     className={index === 1 ? '' : 'pb-10'}
                     category={product?.categories[0].name}
                     img={product?.images[1].url}
                     title={product?.name}
                     price={product?.price}
                     link={`/${product?._id}`}
                     imgSize='w-full aspect-square'
                     titleSize={index === 1 ? 'text-xl' : 'text-sm'}
                     priceSize={index === 1 ? 'text-xl' : 'text-sm'}
                     hasBg={index === 3}
                  />
               </div>
            ))}
         </div>
      </div>
   )
}

export default OutstandProducts
