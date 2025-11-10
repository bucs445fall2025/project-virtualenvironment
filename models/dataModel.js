const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    project_name: {
        type: String,
        required: [true, "Please enter project_name"
        ],
    },
    data: {
        resolution: {
            type: [Number],
        },
        layers: {
            type: [[[Number]]],
        },
        layer_data: {
            type: [[Number]]
        }

    }


},
{
    timestamps: true,
});






module.exports = mongoose.model("Project_Data", dataSchema);