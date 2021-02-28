'use strict';
const {Post}   = require('../models');

module.exports = class PostRepository {

    constructor() {}

    async createPost(object){
        
        const {title, content, userId, categoryId} = object;
        const post = await Post.create({ title, content, userId, categoryId});
        
        return post;
    }

    async remove(postId) {
        
        const post = await Post.findOne({where:{id: postId}});
        await post.destroy();

        return post;
    }

    async findAll() {

        const posts = await Post.findAll();
        return posts;
    }
 
    async findById(postId) {
        
        const post =  Post.findOne({where:{id: postId}});
        return post;
    }

    async findByTitle(data) {

        const post =  Post.findOne({where:{title: data}});
        return post;
    }


}