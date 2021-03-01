module.exports = (postRepository, userRepository, commentRepository) => {

    async function Execute(content, postId, authorId) {

        const post = await postRepository.findById(postId);
        if(!post) return 'Something went wrong';


        const user = await userRepository.findById(authorId);
        if (!user) return 'Something went wrong';

       

        try {    
            const comment = await commentRepository.createComment({authorId, postId, content});
            return 'comment added successfully';
            
        } catch (err) {
           
            return err;
        }

    }
    return {
        Execute
    };
    
}