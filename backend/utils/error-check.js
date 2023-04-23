const { User } = require('../db/models');

const spotCheck = (spot, next) => {
    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }
    return next()
}

// const authorizationCheck = (req, res, next) => {
//     if (req.user.id !== check) {
//         const err = new Error("Forbidden")
//         err.status = 403
//         return next(err)
//     }
//     return next()
// }


module.exports = { spotCheck }
