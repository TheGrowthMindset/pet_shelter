const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, "name is required!"],
        minlength: [3, "name must be at least three characters long!"]
    },
    type: {
        type: String,
        required: [true, "type is required"],
        minlength: [3, "type must be at least 3 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
        minlength: [3, "Description must be at least 3 characters"]
    },
    skill1: {
        type: String,
    }, 
    skill2: {
        type: String,
    },
    skill3: {
        type: String,
    },

}, {timestamps:true});

const Pet = mongoose.model( "Pet", PetSchema )

module.exports = Pet;
