'use strict';
const {Comment}   = require('../models');

module.exports = class CommentRepository {

    constructor() {}


    async createComment(object){
        const {authorId, postId, content } = object;
        const comment = await Comment.create({authorId, postId, content});
        
        return comment;
    }

    async remove(commentId) {
       
        await Comment.destroy({where: {id: commentId}});

        return true;
    }

    async edit(commentId, content) {
        console.log(content)
        const comment = await Comment.update({
            content: content}, 
            {where: {id: commentId}})

        return comment;
    }

    async findAll() {
        const comments = await Comment.findAll();

        return comments;
    }
 
    async findById(commentId) {
        const comment =  Comment.findOne({where:{id: commentId}});

        return comment;
    }

    async findByName(data) {
        const comment =  Comment.findOne({where:{name: data}});
        
        return comment;
    }

   
}