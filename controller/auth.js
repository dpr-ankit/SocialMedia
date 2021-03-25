require("dotenv").config();
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = async(req, res) => {
    const UserExists = await User.findOne({ email: req.body.email});
    if(UserExists)
        return res.status(403).json({
            error: "Email is already taken!"
        });
        const user = await new User(req.body);
        await user.save();
        res.status(200).json({message: user});
}
exports.signin = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.json({
                error: "The user does not exists! Please Signup."
            })
        }
        if(!user.authenticateUser(password)) {
            return res.status(401).json({error: "User and Password do not match!"});
        }
        const token = jwt.sign({ _id: user._id},process.env.JWT_SECRET);
        res.cookie("t", token, {expire: new Date() + 99999});
        const {_id, name, email} = user;
        return res.json({token, user: {_id, name, email}});
    })
}
exports.signout = (req, res) => {
    res.clearCookie("t");
    res.status(200).json({message: "Signed Out!!"});
}
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty : "auth"
})