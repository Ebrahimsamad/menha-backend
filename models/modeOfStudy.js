const { model, Schema } = require("mongoose");

const modeOfStudySchema = new Schema({
    modeOfStudy: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const ModeOfStudy = model('ModeOfStudy', modeOfStudySchema);

module.exports = ModeOfStudy;
