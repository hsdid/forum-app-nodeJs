module.exports = (postRepository, userRepository, categoryRepository) => {

    async function Execute(title, content, categoryId, userId) {

        const post = await postRepository.findByTitle(title);
        if(post) return 'Title exist';


        const user = await userRepository.findById(userId);
        if (!user) return 'Something went wrong';

        const category = await categoryRepository.findById(categoryId);
        if (!category) return 'Something went wrong';


        try {    
            const post = await postRepository.createPost({ title, content, userId: user.id, categoryId:category.id});
            return 'post added successfully';
            
        } catch (err) {
           
            return err;
        }

    }
    return {
        Execute
    };
    
}