import Category from "../model/Category.js";

const createCategory = async (req,res) => {
 

    try{
        const category = await Category.create({
            title: req.body.title
        })
        req.flash("success", ` ${category.title} has been created succesfully`)
        res.redirect('/courses')
        res.status(201).json({
            status: "Success",
            category
        })
    }   
    catch(error){
        res.status(400).json({
            status: "fail",
            error
        })
    }
  
}


export default createCategory