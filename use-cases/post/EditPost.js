module.exports = (postRepository, categoryRepository) => {

    async function Execute(postId, title, content, categoryId) {

        const post = postRepository.findById(postId);
        if (!post) return 'Something went wrong';
        

        const category = await categoryRepository.findById(categoryId);
        if (!category) return 'Something went wrong';


        try {    

            const post = await postRepository.editPost({postId, title, content, categoryId});
            return 'post updated successfully';
            
        } catch (err) {
           
            return err;
        }

    }
    return {
        Execute
    };
    
}