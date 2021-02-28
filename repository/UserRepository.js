'use strict';
const {User}   = require('../models');

module.exports =  class UserRepository {

    constructor() {}

    async createUser(object){
        
        const {userName, email, role ,password} = object;
        const user = await User.create({userName, email, role, password});
        
        return user;
    }

    async remove(userId) {
        
        const user = await User.findOne({where:{id: userId}});
        await user.destroy();

        return user;
    }

    async findAll() {

        const users = await User.findAll();
        return users;
    }
 
    async findById(userId) {
        
        const user =  User.findOne({where:{id: userId}});
        return user;
    }

    async findByUserName(data) {

        const user =  User.findOne({where:{userName: data}});
        return user;
    }

    async findByEmail(data) {

        const user =  User.findOne({where:{email: data}});
        return user;
    }


}