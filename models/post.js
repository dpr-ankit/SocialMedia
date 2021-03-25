const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type : String,
        required : false
    },
    body: {
        type : String,
        required : false
    }
});

module.exports = mongoose.model("Post", postSchema);