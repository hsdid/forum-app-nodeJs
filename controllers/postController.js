const { verify }         = require('jsonwebtoken');
const { postValidation } = require('../validation/postValidation');
const PostRepository     = require('../repository/PostRepository');
const UserRepository     = require('../repository/UserRepository');
const CategoryRepository = require('../repository/CategoryRepository');


module.exports = (dependecies) => {

    postRepository     = new PostRepository();
    userRepository     = new UserRepository();
    categoryRepository = new CategoryRepository();

    const addNewPost = async (req,res,next) => {
        
       
       //Validate data
        const {error} = postValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message); 

        const { title, content, categoryId } = req.body;
        const userId = req.user.id;

        //Check if post with same title exists
        const emailTitle = await postRepository.findByTitle(title);
        if(emailTitle) return res.status(400).send('Same title already exists');
        
        const user     = await userRepository.findById(userId);
        if (!user) return res.status(400).send('Something went wrong');

        const category = await categoryRepository.findById(categoryId);
        if (!category) return res.status(400).send('Something went wrong');

        try {
            
            const post = await postRepository.createPost({ title, content, userId:user.id, categoryId:category.id});
            res.status(200).send(post);
            
        } catch (err) {
            res.status(400).send(err);
        }
    }


    const removePost = async (req,res) => {

        const postId = req.params.postId;

        const post  = await postRepository.findById(postId);
        if (!post) return res.status(400).send('Something went wrong');

        try {
            const deletedPost = await postRepository.remove(post.id)
            res.status(200).send(deletedPost);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    const getPostById = async (req,res) => {
        const postId = req.params.postId;

        const post  = await postRepository.findById(postId);
        if (!post) return res.status(400).send('Something went wrong');
        
        res.status(200).send(post);
    }

    const getAllPost = async (req,res) => {

        const posts = await postRepository.findAll();
        if (!posts) return res.status(400).send('Something went wrong');

        res.status(200).send(posts); 
    }

    return {
            addNewPost,
            removePost,
            getPostById,
            getAllPost
            }
};

