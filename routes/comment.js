const router            = require('express').Router();
const verify            = require('./verifyToken');
const commentController    = require('../controllers/commentController');   


const commentRoute = (dependecies) => {

    const controller = commentController(dependecies);

    router.route('/comment')
        .post(verify , controller.addNewComment);
    
    

    return router
}





module.exports = commentRoute;