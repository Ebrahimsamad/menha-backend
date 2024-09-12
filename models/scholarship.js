const { model, Schema } = require("mongoose");



const scholarshipSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fieldOfStudyId: {
        type: Schema.Types.ObjectId,
        ref: 'FieldOfStudy', 
        required: true
    },
    courseTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'CourseType', 
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    modeOfStudyId: {
        type: Schema.Types.ObjectId,
        ref: 'ModeOfStudy', 
        required: true
    },
    country: {
        type: String,
        required: true
    },
    isWinter: {
        type: Boolean,
        default: false
    },
    isFree: {
        type: Boolean,
        default: false
    },
    isFullTime: {
        type: Boolean,
        default: false
    },
    gpa: {
        type: Number,
        required: true
    },
    universityId: {
        type: Schema.Types.ObjectId,
        ref: 'University', 
        required: true
    },
    languageId: {
        type: Schema.Types.ObjectId,
        ref: 'Language', 
        required: true
    },
}, {
    timestamps: true
});

const Scholarship = model('Scholarship', scholarshipSchema);

module.exports = Scholarship;
