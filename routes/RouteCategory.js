import  Express  from "express"

import createCategory from "../controllers/CategoryController.js"

const Router = Express.Router()


Router.route('/').post(createCategory)

export default Router