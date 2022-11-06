import Course from "../model/Courses.js";
import Category from "../model/Category.js"; 
import User from "../model/User.js";

const createCourse = async (req,res) => {
    
    try{
    const course = await Course.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.categories,
        user: req.session.userID
    })

        req.flash("success", ` ${course.title} has been created succesfully`)
        res.redirect('/courses')
    }   
    catch(error){
        res.status(400).json({
            status: "fail",
            error
        })
    }
  
}
const listCourse = async (req,res) => {
    const user = await User.findOne({_id:req.session.userID})

    const categorySlug = req.query.categories
   const query = req.query.search
    var category = await Category.findOne({slug:categorySlug})

        let filter = {}

        if(categorySlug ) {
                filter = {
                    category: category._id
                }
            }
        
    
            if(query) {
                filter = {name:query}
              }
          
              if(!query && !categorySlug) {
                filter.name = "",
                filter.category = null
              }
          
              const courses = await Course.find({
                $or:[
                  {name: { $regex: '.*' + filter.name + '.*', $options: 'i'}},
                  {category: filter.category}
                ] 
    })
    const categories = await Category.find()

    res.render('courses', {
        courses,
        categories,
        user
       
    })
}

const DeleteCourse = async (req,res) => {
     await Course.findOneAndRemove({slug: req.params.slug})
    res.status(201).redirect('/courses')
}

const updateCourse = async (req, res) => {
  const course =  await Course.findOne( {slug: req.params.slug})
   course.title = req.body.title,
   course.description= req.body.description,
   course.category= req.body.categories
   course.save()
    res.status(201).redirect('/courses')
}


const listSingleCourse = async (req,res) => {
   
    const course = await Course.findOne({slug: req.params.slug})
    const user = await User.findById(req.session.userID)
    
    res.render('course-single', {
        course,
        user
    })
}



const EntrollCourse = async (req,res) => {
 try {  const user = await User.findById(req.session.userID)
   user.course.push({_id:req.body.course_id})
   await user.save()
   req.flash("success", `Course has been entroll succesfully`)
    res.status(201).redirect('/dashboard')
}
catch(err) {
   console.log(err)
}
}

const ReleaseCourse = async (req,res) => {
    try {  const user = await User.findById(req.session.userID)
      user.course.shift({_id:req.body.course_id})
      await user.save()
    req.flash("ReleaseSuccess", `Course has been release succesfully`)
       res.status(201).redirect('/dashboard')
   }
   catch(err) {
      console.log(err)
   }
   }




export {
    listCourse,
    createCourse,
    listSingleCourse,
    EntrollCourse,
    ReleaseCourse,
    DeleteCourse,
    updateCourse
}