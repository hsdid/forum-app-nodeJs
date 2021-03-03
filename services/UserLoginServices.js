const jwt    = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'    );
const {loginValidation} = require("../validation/authValidation");


module.exports = (dependecies) => {


    const userRepository = dependecies.UserRepository;

    const loginService = async (req,res,next) => {

    //Validate data
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const { userName, password } = req.body;

    const user = await userRepository.findByUserName(userName);
    if(!user) return res.status(400).send('Username or password is wrong');

    const validPass = await bcrypt.compare(password, user.password);
    if(!validPass) return res.status(400).send('Username or password is wrong');
    
    //Create token
    const token = jwt.sign({id: user.id}, process.env.SECRET_KEY);
    res.header('auth-token', token).send(token);

    }

    return loginService;
}