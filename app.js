const express       = require('express');
const app           = express();
const { castArray } = require('lodash'      );
const dotenv        = require('dotenv'      );
const models        = require('./models'    );
//const dependecies   = require('../social_forum/repository');
const PostRepository = require('./repository/PostRepository');

//const {sequelize, User, Category, Post} = require('./models');
//Import Routes 
const authRoute                         = require('./routes/auth');
const postRoute                         = require('./routes/post');


app.use(express.json());

//Route prefix
app.use('/api/user', authRoute);
app.use('/api/post', postRoute(models));

dotenv.config();


app.listen({ port: 5000 }, async () => {
    console.log('Server running');
    //await sequelize.sync({ force: true });
    await models.sequelize.authenticate();

})
    
