module.exports = (postRepository, categoryRepository) => {

    async function Execute(userId, postId, title, content, categoryId) {


        const post = await postRepository.findById(postId);
        if (!post) return 'Something went wrong';
        
    
        const category = await categoryRepository.findById(categoryId);
        if (!category) return 'Something went wrong';

         // Owner permission 
        if (userId != post.userId) {
            return 'Cant edit post';
        } 

        try {    

            await postRepository.editPost({postId, title, content, categoryId});
            return "post updatet succesfully";
            
        } catch (err) {
           
            return err;
        }

    }
    return {
        Execute
    };
    
}