module.exports = (postRepository) => {

    async function Execute () {

        const posts = await postRepository.findAll();
        if (!posts) return 'Something went wrong';

        return posts;
    }

    return {
        Execute
    }
}