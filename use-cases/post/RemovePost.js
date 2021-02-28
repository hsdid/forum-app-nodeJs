module.exports = (postRepository) => {

    async function Execute(postId) {

        const post  = await postRepository.findById(postId);
        if (!post) return res.status(400).send('Something went wrong');

        try {
            const deletedPost = await postRepository.remove(post.id)
            res.status(200).send(deletedPost);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    return {
        Execute
    }
}