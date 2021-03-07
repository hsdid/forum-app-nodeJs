const router             = require('express').Router();
const verify             = require('./verifyToken');
const categoryController = require('../controllers/categoryController');


const categoryRoute = (dependecies) => {

    const controller = categoryController(dependecies);

    router.route('/:categoryId')
        .get(controller.getCategoryPosts);
        
    
    return router
}


module.exports = categoryRoute;