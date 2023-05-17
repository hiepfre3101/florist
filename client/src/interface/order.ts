

export interface IOrder {
   total: number
   user: string
   products: { product_id: string; quantity: number }[]
}
