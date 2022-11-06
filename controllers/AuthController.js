import User from "../model/User.js";
import bcrypt from 'bcrypt'
import session from "express-session";
import  {body, validationResult}  from 'express-validator';

const createUser = async (req,res) => {
    try{
    const user = await User.create(req.body)
    res.status(201).redirect('/login')
    }   
    catch(error){
        const errors = validationResult(req);
        console.log(errors.array()[0].msg)
      for (let i = 0 ; i < errors.length ; i++ ) {
        req.flash("error", `${errors.array()[i].msg}`)
        res.status(400).redirect('/register')
    }
   
}
  
}


const loginUser =  (req,res) => {
    try{
        const {email, password} = req.body
         User.findOne({email}, (err, user) => {
            if(user) {
                bcrypt.compare(password, user.password, (err, same) => {
                    if(same) {
                        // USER SESSION
                        req.session.userID = user._id
                        res.status(200).redirect('/dashboard')
                    }
                })  
            }
        })
        
    }   
    catch(err){
     console.log(err)
    }
  
}

const deleteUser = async (req,res) => {
    await User.findByIdAndRemove(req.params.id)
    
    
    res.redirect('/dashboard')

}

const exitUser = (req,res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

export {
    loginUser,
    createUser,
    exitUser,
    deleteUser
}