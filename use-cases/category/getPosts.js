module.exports = (categoryRepository) => {

    async function Execute(categoryId) {


        const category = await categoryRepository.findById(categoryId);
        if (!category) return 'Something went wrong';


        try {    

            return category.getPosts();
            
        } catch (err) {
           
            return err;
        }

    }
    return {
        Execute
    };
    
}