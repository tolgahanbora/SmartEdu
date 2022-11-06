import Express  from "express";
import mongoose from "mongoose";

import path from 'path'; 
import RoutePage from './routes/RoutePage.js'
import RouteCourse from './routes/RouteCourse.js'
import RouteCategory from './routes/RouteCategory.js'
import RouteRegister from './routes/RouteRegister.js'
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash"
import methodOverride from "method-override"
const port = 3000
const app = Express()
const __dirname = path.resolve()


//MONGOOSE CONNECT
mongoose.connect(process.env.MONGOSEURL)

//TEMPLATE ENGİNE
app.set("view engine", "ejs")

//MIDDLEWARE FUNC
app.use(methodOverride('_method',{methods: ['POST','GET']}))
app.use(Express.static(path.join(__dirname, 'public')))
app.use(Express.urlencoded({extended:true}))
app.use(Express.json())
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/smartedu-db' })
}))
app.use(flash())
app.use((req,res,next) => {
res.locals.flashMessages = req.flash()
next()
})



//GLOBAL Variable

global.userID = null


//ROUTES
app.use('*', (req,res,next) => {
    userID = req.session.userID 
    next()
})
app.use('/', RoutePage)
app.use('/courses', RouteCourse)
app.use('/categories', RouteCategory)
app.use('/users', RouteRegister)

app.listen(port,()=>
{console.log(`Server ${port}'unda başlatıldı.`)})

export default app