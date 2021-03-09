module.exports = (postRepository) => {

    async function Execute(userId, postId) {

        const post  = await postRepository.findById(postId);
        if (!post) return 'Something went wrong';
        
        // Owner permission
        if (userId != post.userId) {
            return 'Cant delete post';
        } 
    
        try {
            const deletedPost = await postRepository.remove(post.id)
            return deletedPost;
        } catch (err) {
            return err;
            
        }
    }

    return {
        Execute
    }
}