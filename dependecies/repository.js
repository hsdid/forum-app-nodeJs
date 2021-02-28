const PostRepository = require('../repository/PostRepository');
const UserRepository = require('../repository/UserRepository');
const CategoryRepository = require('../repository/CategoryRepository');

module.exports = (() => {
    return {
        PostRepository: new PostRepository,
        UserRepository: new UserRepository,
        CategoryRepository: new CategoryRepository
     };
})();