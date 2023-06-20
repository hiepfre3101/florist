import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const flowerSchema = new mongoose.Schema(
   {
      name: String,
      price: Number,
      type:String,
      bouquets: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bouquet'
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
flowerSchema.index({ name: 'text' }, { default_language: 'english', weights: { name: 1 } })
flowerSchema.plugin(mongoosePaginate)
export default mongoose.model('Flower', flowerSchema)
