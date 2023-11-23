const {USER_SCHEMA} = require('../schemas/userSchema')

module.exports.validateUser = async (req, res, next) => {
    const {body} = req;
    try {
        const result = await USER_SCHEMA.validate(body);
        next();
    } catch (error) {
        next(error)
    }
}