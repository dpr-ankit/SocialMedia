const mongoose = require("mongoose");
const uuid = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: String,
        default: Date.now()
    },
    updated: Date
})

userSchema.virtual("password").set(function(password){
    this._password = password;
    this.salt = uuid.v1();
    this.hashed_password = this.encryptPassword(password);
})
.get(function(){
    return this._password;
})

userSchema.methods = {

    authenticateUser : function(mypassword) {
        return this.encryptPassword(mypassword) === this.hashed_password;
    },

    encryptPassword : function(password) {
        if(!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);