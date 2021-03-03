const router           = require('express').Router();
const registerServices = require('../services/UserRegisterServices');
const loginService     = require('../services/UserLoginServices');




const authRoute = (dependecies) => {

    const register = registerServices(dependecies);
    const login    = loginService(dependecies);

    router.route('/register')
        .post(register);

    router.route('/login')
        .post(login);

    return router
}

module.exports = authRoute;


