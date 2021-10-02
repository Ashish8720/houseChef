const recipe= require("../models/houseChef_Schema");
const comment = require("../models/comment_Schema");

module.exports.renderCommentForm = async(req,res , next)=>{
    const {id} =  await recipe.findById(req.params.id)
    
    res.render("comment/new" , {id})


}

module.exports.makeComment = async(req,res , next)=>{
    const Recipe = await recipe.findById(req.params.id)
   
    const Comment =  new comment(req.body.comment);
    Comment.name = req.user._id

     Recipe.comments.push(Comment)
     await Comment.save();
     await Recipe.save();
     req.flash('success' ,'succesfully created the comment')
     res.redirect(`/home/${Recipe._id}` )
    
  }

  module.exports.deleteComment = async(req,res,next)=>{
    const {id , commentId } = req.params;
         await recipe.findByIdAndUpdate(id , {$pull : {comments : commentId}}) 
              await comment.findByIdAndDelete(commentId)
              req.flash('success' , 'successfully deleted the comment')
         res.redirect(`/home/${id}`)
}