const router            = require('express').Router();
const verify            = require('./verifyToken');
const commentController    = require('../controllers/commentController');   


const commentRoute = (dependecies) => {

    const controller = commentController(dependecies);

    router.route('/comment')
        .post(verify , controller.addNewComment);
    
    router.route('/:postId/comments')
        .get(verify, controller.getAllCommentsFromPost);
    
    router.route('/comment/delete/:commentId')
        .delete(verify ,controller.removeComment);
    
    router.route('/comment/edit/:commentId')
        .put(verify, controller.editComment);

    return router
}



module.exports = commentRoute;