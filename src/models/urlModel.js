
const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    LongUrl: {
        type: String,
        require: true
    },

    ShortUrl: {
        type: String,
        require: true
    },
    urlCode: {
        type: String,
        require: true,
        lowercase: true,
        unique: true
    }

})

module.exports = mongoose.model('ShorterUrl', urlSchema)