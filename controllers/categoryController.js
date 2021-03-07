
const GetPosts = require('../use-cases/category/getPosts');

module.exports = (dependecies) => {

    const categoryRepository = dependecies.CategoryRepository

    const getCategoryPosts = async (req,res,next) => {
        
        const categoryId = req.params.categoryId;
        
        const GetPostsCommand = GetPosts(categoryRepository);
        GetPostsCommand.Execute(categoryId).then((response) => {
            res.send(response);

        }, (err) => {
            next(err);
        });
    }

    

    return {
        getCategoryPosts
            }
};