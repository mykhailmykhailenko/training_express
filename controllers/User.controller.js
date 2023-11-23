const User = require('../models/User')

module.exports.createUser = async (req, res, next) => {
    try {
        const {body} = req;
        const createUser = await new User(body);
        const result = await createUser.save();
        res.status(201).send(result);
    } catch (error) {
        next(error)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        next(error)
    }
}

module.exports.getOneUser = async (req, res, next) => {
    try {
        const {params: {userId}, userInstance} = req;
        res.send(userInstance)
    } catch (error) {
        next(error)
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const {params: {userId}, body, userInstance} = req;
        const updatedUser = await userInstance.update(body);
        res.status(202).send(updatedUser);
    } catch (error) {
        next(error)
    }
   
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const {params: {userId}, userInstance} = req;
        const result = await userInstance.delete();
        res.status(200).send('User deleted');
    } catch (error) {
        next(error)
    }  
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const {params: {userId}, body, userInstance} = req;
        if (userInstance.email === body.email) {
            if (userInstance.password === body.password) {
                res.status(202).send('Authorized succesfully');
            } else {
                res.status(401).send('Password incorrect');
            }
        } else {
            res.status(403).send('Incorrect data');
        }
    } catch (error) {
        next(error)
    }
}
