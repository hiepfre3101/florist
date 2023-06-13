import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const cusBouquetSchema = new mongoose.Schema(
   {
      name: String,
      price: Number,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      ingredients: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'flower',
            quantity: Number
         }
      ],
      accessories: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'accessory'
         }
      ],
      images: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'image'
         }
      ],
      description: String,
      categories: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category'
         }
      ]
   },
   { timestamps: true, versionKey: false, collation: { locale: 'en', strength: 2 } }
)
//create indexes for the fields we need to search
cusBouquetSchema.index({ name: 'text' }, { default_language: 'english', weights: { name: 1 } })
cusBouquetSchema.plugin(mongoosePaginate)
export default mongoose.model('CustomBouquet', cusBouquetSchema)
