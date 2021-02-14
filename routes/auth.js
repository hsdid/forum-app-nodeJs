const router                                 = require('express').Router();
const bcrypt                                 = require('bcryptjs'                    );
const {sequelize, User}                      = require('../models'                   );
const {registerValidation, loginValidation } = require('../validation/authValidation');
const jwt                                    = require('jsonwebtoken'                ); 



router.post('/register', async(req,res) => {
    
    //Validate data
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    const { userName, email, password } = req.body;

    //Check if user with same email or username exists
    const emailExist = await User.findOne({ where: {email}});
    if(emailExist) return res.status(400).send('Email already exists');

    const userNameExist = await User.findOne({ where: {userName}});
    if(userNameExist) return res.status(400).send('User name already exists');

    //Hash password
   
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
   
    try {
        const role = 'user';
        const user = await User.create({ userName, email ,role, password: hashPassword});
        res.send(user);

    } catch (err){
        res.status(400).send(err);
    }

});


router.post('/login', async(req,res) => {
    
    //Validate data
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    const { userName, password } = req.body;


    const user = await User.findOne({ where: {userName}});
    if(!user) return res.status(400).send('Username or password is wrong');

    const validPass = await bcrypt.compare(password, user.password);
    if(!validPass) return res.status(400).send('Username or password is wrong');
    
    //Create token
    const token = jwt.sign({id: user.id}, process.env.SECRET_KEY);
    res.header('auth-token', token);

    res.send('logged succes')


});





module.exports = router;

