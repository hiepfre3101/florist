import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const productSchema = new mongoose.Schema(
   {
      name: String,
      price: Number,
      type: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'type'
      },
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
productSchema.index({ name: 'text' }, { default_language: 'english', weights: { name: 1 } })
productSchema.plugin(mongoosePaginate)
export default mongoose.model('Product', productSchema)
