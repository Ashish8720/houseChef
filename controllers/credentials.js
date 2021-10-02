const User = require('../models/user_Schema');

module.exports.dashboard = (req,res)=>{
    res.render("authentication/dashboard")
}

module.exports.renderRegisterForm =(req,res)=>{
    res.render('authentication/register')
   }


 module.exports.registerUser = async(req,res ,next)=>{
    
    try{
    const {email, username , password} = req.body
       const user = new User({email , username});
       const RegisteredUser = await User.register(user , password)
       req.login(RegisteredUser , (e)=>{
           if(e){
               return next(e)
           }
       })
       req.flash('success' , "congrats you become a member")
       res.redirect('/home')
    }catch(e){
        req.flash('error' , `${e.message}`)
        res.redirect('/register')
    }
}

module.exports.renderLoginForm = (req,res) =>{
    res.render("authentication/login");
}

module.exports.loginUser = (req,res)=>{
    req.flash('success' , 'welcome back')
    const redirectURL = req.session.returnTo || '/home';
      res.redirect(redirectURL)
  }

  module.exports.logout = (req,res)=>{
    req.logout();
    req.flash('success' , 'logout successfully! come back soon')
    res.redirect('/home')
}