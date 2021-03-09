const { verify }         = require('jsonwebtoken');
const { postValidation } = require('../validation/postValidation');

//use-cases
const AddPost     = require('../use-cases/post/AddPost'    );
const RemovePost  = require('../use-cases/post/RemovePost' );
const GetAllPosts = require('../use-cases/post/GetAllPosts');
const GetPost     = require('../use-cases/post/GetPost'    );
const Edit        = require('../use-cases/post/EditPost');
//const postOwner    = require('../permission/postOwner');

module.exports = (dependecies) => {

    const userRepository = dependecies.UserRepository;
    const postRepository = dependecies.PostRepository;
    const categoryRepository = dependecies.CategoryRepository;

    const addNewPost = async (req,res,next) => {
        
       
       //Validate data
        const {error} = postValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message); 

        const { title, content, categoryId } = req.body;
        const userId = req.user.id;

        const AddPostCommand = AddPost(postRepository, userRepository, categoryRepository);
        AddPostCommand.Execute(title, content, categoryId, userId).then((response) => {
            res.send(response);

        }, (err) => {
            next(err);
        });
    };

    const editPost = async (req,res,next) => {
        
       
        //Validate data
         const {error} = postValidation(req.body);
         if (error) return res.status(400).send(error.details[0].message); 
        

         const {title, content, categoryId } = req.body;
         const postId = req.params.postId;
         const userId = req.user.id;


        
         const EditCommand = Edit(postRepository, categoryRepository);
         EditCommand.Execute(userId, postId, title, content, categoryId).then((response) => {
             res.send(response);
 
         }, (err) => {
             res.send(err);
         });
     };


    const removePost = async (req,res) => {

        const postId = req.params.postId;
        const userId = req.user.id;
        
        const RemovePostCommand = RemovePost(postRepository);
        RemovePostCommand.Execute(userId, postId).then((response) => {
            res.send(response);
        }, (err) => {
            res.send(err);
        });
    };


    const getPostById = async (req,res) => {
        const postId = req.params.postId;
        
        const GetPostCommand = GetPost(postRepository);
        GetPostCommand.Execute(postId).then((response) => {
            res.send(response);
        }, (err) => {
            res.send(err);
        });
       
    };

    const getAllPost = async (req,res) => {

        const GetAllPostsCommand = GetAllPosts(postRepository);
        GetAllPostsCommand.Execute().then((response ) => {
            res.send(response);
        }, (err) => {
            
            res.send(err);
        })
    };

    return {
            addNewPost,
            removePost,
            getPostById,
            getAllPost,
            editPost
            }
};

