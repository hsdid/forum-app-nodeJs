module.exports = (commentRepository) => {

    async function Execute(commentId, content, userId) {
        const comment = await commentRepository.findById(commentId);

        if (!comment) 
            return 'Something went wrong';

        if (userId != comment.authorId) 
            return 'Cant edit comment';

        try {
            await commentRepository.edit(commentId, content);
            
            return "comment edited";
        } catch (err) {
            
            return err;
        }
    }

    return {
        Execute
    }
    
}