const { model, Schema } = require("mongoose");

const fieldOfStudySchema = new Schema({
    fieldOfStudy: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const FieldOfStudy = model('FieldOfStudy', fieldOfStudySchema);

module.exports = FieldOfStudy;
