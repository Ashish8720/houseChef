const recipe= require("../models/houseChef_Schema");
const comment = require("../models/comment_Schema");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'you must logged in first')
       return res.redirect('/login')
    }
    next();
}
module.exports.isOwned = async(req,res,next)=>{
    const {id} = req.params;
    const AccountId = await recipe.findById(id)
    if(!AccountId.publisher.equals(req.user._id)){
        req.flash('error' , 'you are not authorized to make changes')
        return res.redirect(`/home/${id}`)
    }
    next();
}

module.exports.isOwnedComment = async(req,res,next)=>{
    const{id , commentId} = req.params;

    const CommentAccountId =  await comment.findById(commentId)
    if(!CommentAccountId.name.equals(req.user._id)){
      req.flash('error','you are not authorized to make a change')
      return res.redirect(`/home/${id}`)
    }
    next();
}