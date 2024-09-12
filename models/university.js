const { model, Schema } = require("mongoose");

const universitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    faculityName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    pageUrl: {
        type: String
    }
}, {
    timestamps: true
});

const University = model('University', universitySchema);

module.exports = University;
