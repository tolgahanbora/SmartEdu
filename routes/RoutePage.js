import  Express  from "express";


import { getDashboardPage,getRegisterPage,getLoginPage,getContactPage,getAboutPage,getHomePage,SendEmail} from '../controllers/pageController.js'
import authMiddleWare from '../middlewares/AuthMiddleware.js'
import RedirectMiddleware from '../middlewares/RedirectMiddleware.js'
const Router = Express.Router()

Router.route('/').get(getHomePage)
Router.route('/about').get(getAboutPage)
Router.route('/contact').get(getContactPage)
Router.route('/contact').post(SendEmail)
Router.route('/login').get(RedirectMiddleware,getLoginPage)
Router.route('/register').get(RedirectMiddleware,getRegisterPage)
Router.route('/dashboard').get(authMiddleWare, getDashboardPage)



export default Router