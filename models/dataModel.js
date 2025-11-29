const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    user_email: {
        type: String,
        required: [true, "Must be logged in"]
    },
    project_name: {
        type: String,
        required: [true, "Please enter project_name"
        ],
    },
    last_modified: {
        type: Date,
        default: Date.now,
    },

    data: {
        resolution: {
            type: Array,
        },
        layers: {
            type: Array,
        },
        layer_data: {
            type: Array,
        }

    }


},
{
    timestamps: true,
});






module.exports = mongoose.model("Project_Data", dataSchema);