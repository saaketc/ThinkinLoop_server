const router = require('express').Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

const { User, validate } = require('../models/users');

router.post('/', async (req, res) => {
    try {
        // let user = new User(_.pick(req.body, ['email', 'password', 'profile.firstName', 'profile.lastName', 'profile.profession', 'profile.workplace' ]));
        // const { error } = validate(req.body);
        // if (error)
        //     return res.status(400).send(error.details[0].message);
        
        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(400).send('User already exists! Login in instead');
        
        user = new User(_.pick(req.body, ['email', 'password', 'firstName', 'lastName']));
        // password hashing
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        
        await user.save();
         
        const token = user.generateToken();
        res.header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")

            // to whitelist this header in browser and to get that at client end
            .status(201).send(user);
       
    }
    catch (e) {
        res.status(500).send(e.message);
        console.log(e);
    }
   
})

module.exports = router;