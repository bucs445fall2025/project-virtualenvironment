const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter username"
        ],
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: [true, "Email already in use"],
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
    },


},
{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);