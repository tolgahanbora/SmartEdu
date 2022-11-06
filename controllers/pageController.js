import User  from "../model/User.js"
import Category  from "../model/Category.js"
import userID from '../app.js'
import Course from "../model/Courses.js"
import  nodemailer from "nodemailer"
import dotenv from 'dotenv'
import flash from 'connect-flash'

dotenv.config()


const getHomePage = (req,res) => {
   
    res.render('index', {
        pagename: "index"
    })
}

const getAboutPage = (req,res) => {
    res.render('about',{
        pagename: "about"
    })
}

const getContactPage =  (req,res) => {
    res.render('contact',{
        pagename: "contact" 
    })
}

const getLoginPage = (req,res) => {
    res.render('login',{
        pagename: "login"
    })
}

const getRegisterPage =  (req,res) => {
    res.render('register',{
        pagename: "register"
    })
}

const getDashboardPage = async (req,res) => {
    const user = await User.findOne({_id:req.session.userID}).populate('course')
    const categories = await Category.find()
    const courses = await Course.find({user: req.session.userID})
    const users = await User.find()
    res.render('dashboard',{
        pagename: "dashboard",
        user,
        categories,
        courses,
        users
    })
}

const getCoursePage = async (req,res) => {

    const user = await User.findOne({_id:req.session.userID})
    res.render('courses',{
        user,
        pagename: "courses" //değişken atarak isactive ayarladın.
    })
}

const getCourseSinglePage = async (req,res) => {

    res.render('course-single')
}

const SendEmail = async (req,res) => {
    const outputMessage = `
    <h1>Smart EDU Contact Form </h1>
    <ul>
    <li>Name:  ${req.body.first_name}</li>
    <li>Lastname: ${req.body.last_name}</li>
    <li>Mail: ${req.body.email}</li>
    <li>Phone ${req.body.phone}</li>
    </ul>
    <h1>message</h1>
    <p> ${req.body.comments}</p>`
    
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.USERNAME , // generated ethereal user
          pass: process.env.PASS// generated ethereal password
        },
      });
      let info = await transporter.sendMail({
        from: '"Smart EDU Contact Form" <tyrell.lubowitz0@ethereal.email>', // sender address
        to:  'tolgahanbora@outlook.com', // list of receivers
        subject: "Smart EDU Contact Form ✔", // Subject line
        html: outputMessage, // html body
      });
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      
      req.flash("success", "We Received your message succesfully")
      req.flash("error", `Something happened!`);
      res.status(200).redirect('contact')
}

export {
    getCourseSinglePage,
    getCoursePage,
    getDashboardPage,
    getRegisterPage,
    getLoginPage,
    getContactPage,
    getAboutPage,
    getHomePage,
    SendEmail
}