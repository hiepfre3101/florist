import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const bouquetSchema = new mongoose.Schema(
   {
      name: String,
      price: Number,
      ingredients: [
         {
            flower: { type: mongoose.Schema.Types.ObjectId, ref: 'Flower' },
            quantity: Number
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
bouquetSchema.index({ name: 'text' }, { default_language: 'english', weights: { name: 1 } })
bouquetSchema.plugin(mongoosePaginate)
export default mongoose.model('Bouquet', bouquetSchema)
