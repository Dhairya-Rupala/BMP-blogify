const mongoose = require("mongoose");

const TagsSchema = new mongoose.Schema({
    tags: [{
        type:String
    }]
})

module.exports = mongoose.model("Tags", TagsSchema);