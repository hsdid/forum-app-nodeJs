const express       = require('express');
const app           = express();
const { castArray } = require('lodash' );
const dotenv        = require('dotenv' );

const {sequelize, User, Category, Post} = require('./models');
//Import Routes 
const authRoute                         = require('./routes/auth');


app.use(express.json());
//Route prefix
app.use('/api/user', authRoute);

dotenv.config();


app.listen({ port: 5000 }, async () => {
    console.log('Server running');
    //await sequelize.sync({ force: true });
    await sequelize.authenticate();

})
    
