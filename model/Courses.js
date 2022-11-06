import mongoose from "mongoose"
import { Schema } from "mongoose"
import slugify from "slugify"



const CourseSchema = new Schema({
    
    title: {
        type:String,
        unique: true,
        required:true
    },
    description: {
        type:String,
        required:true,
        trim:true
    },
    date: {type: Date, default: Date.now},
    
    slug: {
        type: String,
        unique: true,
        
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

    CourseSchema.pre("save", function(next)  {
        this.slug =  slugify(this.title, {lower:true,strict:true})
        next()
    } )
const Course = mongoose.model('Course', CourseSchema)

export default Course