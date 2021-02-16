'use strict';
const {Category}   = require('../models');

module.exports = class CategoryRepository {

    //  constructor() {}


    async remove(categoryId) {
        
        const category = await Category.findOne({where:{id: categoryId}});
        await Category.destroy();

        return category;
    }

    async findAll() {

        const categories = await Category.findAll();
        return categories;
    }
 
    async findById(categoryId) {
        
        const category =  Category.findOne({where:{id: categoryId}});
        return category;
    }

    async findByName(data) {

        const category =  Category.findOne({where:{name: data}});
        return category;
    }

   
}