import AddProduct from '../admin/products/AddProduct'
import Dashboard from '../admin/Dashboard'
import UpdateProduct from '../admin/products/UpdateProduct'
import Product from '../client/ProductDetail/Product'
import ProductsPage from '../admin/products/ProductPage'
import UpdateCategory from '../admin/categories/UpdateCategory'
import CategoryPage from '../admin/categories/CategoryPage'
import AddCategory from '../admin/categories/AddCategory'
import Test from '../admin/test'
import NewPage from '../client/NewPage'
import Bouquet from '../client/Bouquet'
import Flower from '../client/Flower'
import AuthenForm from '../auth/AuthenForm'
import Cart from '../components/Cart/Cart'

interface IRoute {
   path: string
   element: (props?: any) => JSX.Element
}
export const clientRoutes: IRoute[] = [
   {
      path: '/new',
      element: NewPage
   },
   {
      path: '/bouquets',
      element: Bouquet
   },
   {
      path: '/flowers',
      element: Flower
   },
   {
      path: '/:id',
      element: Product
   },
   {
      path: '/auth',
      element: AuthenForm
   },
   {
      path: '/cart',
      element: Cart
   }
]

export const adminRoutes: IRoute[] = [
   {
      path: '/admin',
      element: Dashboard
   },
   {
      path: '/admin/products',
      element: ProductsPage
   },
   {
      path: '/admin/add-product',
      element: AddProduct
   },
   {
      path: '/admin/update-product/:id',
      element: UpdateProduct
   },
   {
      path: '/admin/update-category/:id',
      element: UpdateCategory
   },
   {
      path: '/admin/categories',
      element: CategoryPage
   },
   {
      path: '/admin/add-category',
      element: AddCategory
   },
   {
      path: '/admin/test',
      element: Test
   }
]
