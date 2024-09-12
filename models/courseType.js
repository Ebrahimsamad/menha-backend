const { model, Schema } = require("mongoose");

const courseTypeSchema = new Schema({
    courseType: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const CourseType = model('CourseType', courseTypeSchema);

module.exports = CourseType;
