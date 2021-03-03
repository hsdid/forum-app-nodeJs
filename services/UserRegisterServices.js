const bcrypt               = require('bcryptjs');
const {registerValidation} = require('../validation/authValidation');

module.exports = (dependecies) => {

    const userRepository = dependecies.UserRepository;

    const registerServices = async (req,res,next) => {

        //Validate data
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    const { userName, email, password } = req.body;

    //Check if user with same email or username exists
    const emailExist = await userRepository.findByEmail(email);
    if(emailExist) return res.status(400).send('Email already exists');

    const userNameExist = await userRepository.findByUserName(userName);
    if(userNameExist) return res.status(400).send('User name already exists');

    //Hash password
   
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
   
    try {
        const role = 'user';
        const user = await userRepository.createUser({ userName, email ,role, password: hashPassword});
        res.send(user);

    } catch (err){
        res.status(400).send(err);
    }

    }

    return registerServices;

}