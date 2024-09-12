const { Schema, model } = require("mongoose");

const languageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: [String],  
        required: true
    }
}, {
    timestamps: true
});

const Language = model("Language", languageSchema);

module.exports = Language;
 