import User from '../model/User.js'
import session from "express-session";


const authMiddleWare = (req,res,next) => {
    User.findById(req.session.userID, (err, user) => {
        if(err || !user) return res.redirect('/login')
        next()
    })
}

export default authMiddleWare