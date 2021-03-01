const router            = require('express').Router();
const verify            = require('./verifyToken');
const postController    = require('../controllers/postController');   


const postRoute = (dependecies) => {

    const controller = postController(dependecies);

    router.route('/')
        .get(controller.getAllPost)
        .post(verify , controller.addNewPost);
    
    router.route('/:postId')
        .get(verify, controller.getPostById);
    
    // router.route('/:postId/comment')
    //     .get(verify, )

    router.route('/delete/:postId')
        .delete(verify ,controller.removePost);

    return router
}





module.exports = postRoute;

