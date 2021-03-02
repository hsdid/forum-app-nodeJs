const { response } = require("express");
const AddComment   = require("../use-cases/comment/AddComment");
const GetAll       = require("../use-cases/comment/GetAll");
const Remove       = require("../use-cases/comment/Remove");

module.exports = (dependecies) => {

    const userRepository = dependecies.UserRepository;
    const postRepository = dependecies.PostRepository;
    const commentRepository = dependecies.CommentRepository;

    const addNewComment = async (req,res,next) => {
        

        const {postId, content} = req.body;
        const userId = req.user.id;

        const AddCommentCommand = AddComment(postRepository, userRepository, commentRepository);
        AddCommentCommand.Execute(content, postId, userId).then((response) => {
            res.send(response);

        }, (err) => {
            next(err);
        });
    }

    const getAllCommentsFromPost = async (req,res,next) => {

        const postId = req.params.postId;

        const GetAllCommentsFromPost = GetAll(postRepository);
        GetAllCommentsFromPost.Execute(postId).then((response) => {
            res.send(response);
        }, (err) => {
            next(err);
        })
    }

    const removeComment = async (req,res,next) => {

        const commentId = req.params.commentId;
        


        const RemoveComment = Remove(commentRepository);
        RemoveComment.Execute(commentId).then((response) => {
            res.send(response);
        }, (err) => {
            next(err);
        })

    }
    

    return {
            addNewComment,
            getAllCommentsFromPost,
            removeComment
            }
};
