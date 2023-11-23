const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const foundedUser = await User.findOne(Number(userId));
        if (foundedUser) {
            req.userInstance = foundedUser;
        } else {
            res.status(404);
        }
        next();
    } catch (error) {
        next(error)
    }
}