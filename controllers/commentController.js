const AddComment = require("../use-cases/comment/AddComment");

module.exports = (dependecies) => {

    const userRepository = dependecies.UserRepository;
    const postRepository = dependecies.PostRepository;
    const commentRepository = dependecies.CommentRepository;

    const addNewComment = async (req,res,next) => {
        
       
    //    //Validate data
    //     const {error} = postValidation(req.body);
    //     if (error) return res.status(400).send(error.details[0].message); 

        const {postId, content} = req.body;
        const userId = req.user.id;

        

        const AddCommentCommand = AddComment(postRepository, userRepository, commentRepository);
        AddCommentCommand.Execute(content, postId, userId).then((response) => {
            res.send(response);

        }, (err) => {
            next(err);
        });
    }

    return {
            addNewComment,
           
            }
};
