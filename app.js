const express       = require('express');
const app           = express();
const dotenv        = require('dotenv'      );
const models        = require('./models'    );
const dependecies   = require('./dependecies/repository');


//Import Routes 
const authRoute     = require('./routes/auth'   );
const postRoute     = require('./routes/post'   );
const commnetRoute  = require('./routes/comment');
const categoryRoute = require('./routes/category');

app.use(express.json());

//Route prefix
app.use('/api/user', authRoute(dependecies)   );
app.use('/api/post', postRoute(dependecies)   );
app.use('/api/post', commnetRoute(dependecies));
app.use('/api/category', categoryRoute(dependecies));
dotenv.config();


app.listen({ port: 5000 }, async () => {
    console.log('Server running');
    //await sequelize.sync({ force: true });
    await models.sequelize.authenticate();
})
    
