module.exports = (commentRepository) => {

    async function Execute(commentId) {
        const comment = await commentRepository.findById(commentId);
        
        if (!comment) return 'Something went wrong';

        try {
            const comment = await commentRepository.remove(commentId);
            return "article removed";
        } catch (err) {
            
            return err;
        }
    }

    return {
        Execute
    }
    
}