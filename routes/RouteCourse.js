import  Express  from "express"

import {createCourse,  listCourse ,listSingleCourse,EntrollCourse,ReleaseCourse, DeleteCourse,updateCourse} from "../controllers/CourseController.js"
import RoleMiddleware from "../middlewares/RoleMiddleware.js"
const Router = Express.Router()


Router.route('/').post(RoleMiddleware(["teacher","admin"]), createCourse)
Router.route('/').get(listCourse)
Router.route('/:slug').get(listSingleCourse)
Router.route('/enroll').post(EntrollCourse)
Router.route('/release').post(ReleaseCourse)
Router.route('/:slug').delete(DeleteCourse)
Router.route('/:slug').put(updateCourse)
export default Router