const PostRepository     = require('../repository/PostRepository');
const UserRepository     = require('../repository/UserRepository');
const CategoryRepository = require('../repository/CategoryRepository');
const CommentRepository  = require('../repository/CommentRepository');


module.exports = (() => {
    return {
        PostRepository:     new PostRepository,
        UserRepository:     new UserRepository,
        CategoryRepository: new CategoryRepository,
        CommentRepository:  new CommentRepository

     };
})();