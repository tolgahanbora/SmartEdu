import mongoose from "mongoose"
import bcrypt from 'bcrypt'

import { Schema } from "mongoose"




const UserSchema = new Schema({
    
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        unique: true,
        required:true 
    },
    password: {
        type:String,
        required:true
    },
    role: {
        type: [String],
        enum: ["admin","student","teacher"],
        default: "student"
       
    },
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

UserSchema.pre( 'save', function(next) {
    const user = this
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    } )

} )

   
const User = mongoose.model('User', UserSchema)

export default User