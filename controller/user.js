const User = require("../models/user");
const _ = require("lodash");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(!user || err) {
            return res.status(401).json({
                error: "User Not Found!!"
            })
        }
        req.profile = user;
        next();
    })
}
exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && (req.profile._id === req.auth._id);
    if(!authorized) {
        res.status(403).json({
            error: "The user is not authorized to perform this action!"
        })
    }
    next();
}
exports.getUsers = (req, res) => {
    const user = User.find()
    .then(user=> {
        res.json({user});
    })
    .catch(err => console.log(err)); 
}
exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}
exports.updateUser = (req, res) => {
    let user = req.profile;
    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.save(err => {
        if(err) {
            return res.status(400).json({
                error: "You are not authorized!"
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({ user });
    })
}
exports.deleteUser = (req, res) => {
    let user = req.profile;
    user.remove((err, user) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({ message: "User has been deleted successfully!"});
    })
}