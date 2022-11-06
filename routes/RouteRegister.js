import  Express  from "express"

import {createUser, loginUser,exitUser,deleteUser} from "../controllers/AuthController.js"
import { body, validationResult } from 'express-validator';
const Router = Express.Router()


Router.route('/register').post(
    [
        body('full_name').not().isEmpty().withMessage('Please Enter Your Name'),
        body('last_name').not().isEmpty().withMessage('Please Enter Your Last Name'),
        body('email').not().isEmail().withMessage('Please Enter Your mail')
    ],
createUser)


Router.route('/:id').delete(deleteUser)
Router.route('/login').post(loginUser)
Router.route('/logout').get(exitUser)
export default Router