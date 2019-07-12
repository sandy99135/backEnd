const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let User = new Schema({

    _id: {
    
        type: Number,
        required: true,
        // type: Schema.ObjectId,
        // auto: true
        // index: false,
        // required: true,
        // auto: true
    },
    nom:{
        type: String
    },
    
    email:{
    
        type: String
    },
    password:{
    
        type: String
    }
    });
    module.exports = mongoose.model('User', User)