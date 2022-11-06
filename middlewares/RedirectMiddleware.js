


const RedirectMiddleware = (req,res,next) => {
  if(req.session.userID) {
    return res.redirect('/')
    
  }
  next()
}
export default RedirectMiddleware