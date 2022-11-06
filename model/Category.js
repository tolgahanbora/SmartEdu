import mongoose from "mongoose"
import { Schema } from "mongoose"
import slugify from "slugify"


const CategorySchema = new Schema({
    
    title: {
        type:String,
        unique: true,
        required:true
    },

    slug: {
        type: String,
        unique: true,
        
    }

})

    CategorySchema.pre("save", function(next)  {
        this.slug =  slugify(this.title, {lower:true,strict:true})
        next()
    } )
const Category = mongoose.model('Category', CategorySchema)

export default Category