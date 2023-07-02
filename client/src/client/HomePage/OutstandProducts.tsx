import { IProduct } from '../../interface/product'
import useListItem from '../../hooks/useListItem'
import { getAllProduct } from '../../api/product/product'
import Loading from '../../components/Loading/Loading'
import CardProduct from '../../components/CardProduct'
import CarouselProduct from '../../components/CarouselProduct/CarouselProduct'
import { TruckIcon } from '../../components/Icons/TruckIcon'
import { GuardIcon } from '../../components/Icons/GuardIcon'

const OutstandProducts = () => {
   const { data, loading } = useListItem<IProduct[]>({ getList: getAllProduct, options: { limit: 5 }, type: 'bouquet' })
   const { data: products } = useListItem<IProduct[]>({ getList: getAllProduct, type: 'bouquet' })
   if (loading) return <Loading sreenSize='lg' />
   return (
      <div className='w-[90%] p-5  my-0 mx-auto'>
         <p className='text-primary text-3xl font-semobold text-center'>Hurry up to order</p>
         <div className='grid grid-cols-4 grid-rows-2 gap-[3rem] mt-10 p-5 px-20'>
            {data?.map((product, index) => (
               <div className={index === 1 ? 'col-start-2 col-end-4 row-start-1 row-end-3' : ''} key={index}>
                  <CardProduct
                     className={index === 1 ? '' : 'pb-10'}
                     category={product?.categories[0]?.name}
                     imgs={product?.images}
                     title={product?.name}
                     price={product?.price}
                     link={`/${product?._id}?type=${product.type}`}
                     imgSize='w-full aspect-square'
                     titleSize={index === 1 ? 'text-xl' : 'text-sm'}
                     priceSize={index === 1 ? 'text-xl' : 'text-sm'}
                     hasBg={index === 3}
                     disableHover
                  />
               </div>
            ))}
         </div>
         <div className='border border-1 border-[rgba(0,0,0,0.1)]  p-10 flex justify-between gap-8 items-center ml-20 mr-20'>
            <div className='flex flex-col items-center w-[20%]'>
               <TruckIcon className='w-1/2' />
               <p className='text-greenY text-xl uppercase'>Fast Delivery</p>
               <p className='text-center'>
                  The section "Flower by the piece" was created for those who themselves choose the volume of the
                  bouquet
               </p>
            </div>
            <div className='flex flex-col items-center w-[20%]'>
               <GuardIcon className='w-1/2' />
               <p className='text-greenY text-xl uppercase'>Guarantee</p>
               <p className='text-center'>
                  The section "Flower by the piece" was created for those who themselves choose the volume of the
                  bouquet
               </p>
            </div>
            <div className='w-[40%]'>
               <p className='font-semibold italic text-2xl'>
                  The section "Flower by the piece" was created for those who themselves choose the volume of the
                  bouquet
               </p>
            </div>
         </div>
         <CarouselProduct products={products} />
      </div>
   )
}

export default OutstandProducts
