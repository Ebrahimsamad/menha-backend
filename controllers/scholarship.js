const Scholarship = require('../models/scholarship');
const FieldOfStudy = require('../models/fieldOfStudy');
const CourseType = require('../models/courseType');
const University = require('../models/university');
const Language = require('../models/langauge');
const CustomError = require("../utils/customError");

exports.createScholarship = async (req, res,next) => {
   

    const {
        title,
        description,
        fieldOfStudyId,
        courseTypeId,
        duration,
        modeOfStudyId,
        country,
        isWinter,
        isFree,
        isFullTime,
        gpa,
        universityId,
        languageId
    } = req.body;

    try {
        const fieldOfStudy = await FieldOfStudy.findById(fieldOfStudyId);
        const courseType = await CourseType.findById(courseTypeId);
        const university = await University.findById(universityId);
        const language = await Language.findById(languageId);

        if (!fieldOfStudy) return next(new CustomError("Field of study not found.", 404));
        if (!courseType) return  next(new CustomError("Course type not found.", 404))
        if (!university) return next(new CustomError("University not found.", 404))
        if (!language) return next(new CustomError("Language not found.", 404))

        const scholarship = new Scholarship({
            title,
            description,
            fieldOfStudyId,
            courseTypeId,
            duration,
            modeOfStudyId,
            country,
            isWinter,
            isFree,
            isFullTime,
            gpa,
            universityId,
            languageId
        });

        await scholarship.save();
        res.status(201).send({ message: 'Scholarship created successfully', scholarship });
    } catch (error) {
        next(new CustomError("Internal server error.", 500));
    }
};
exports.editScholarship = async (req, res,next) => {
   

    const { id } = req.params;

    const {
        title,
        description,
        fieldOfStudyId,
        courseTypeId,
        duration,
        modeOfStudyId,
        country,
        isWinter,
        isFree,
        isFullTime,
        gpa,
        universityId,
        languageId
    } = req.body;

    try {
        const scholarship = await Scholarship.findById(id);
        if (!scholarship) return next(new CustomError("Scholarship not found", 404))

        if (fieldOfStudyId) {
            const fieldOfStudy = await FieldOfStudy.findById(fieldOfStudyId);
            if (!fieldOfStudy) next(new CustomError("Field of study not found", 404))
        }

        if (courseTypeId) {
            const courseType = await CourseType.findById(courseTypeId);
            if (!courseType) return next(new CustomError("Course type not found", 404))
        }

        if (universityId) {
            const university = await University.findById(universityId);
            if (!university) return next(new CustomError("University not found", 404))
        }

        if (languageId) {
            const language = await Language.findById(languageId);
            if (!language) return next(new CustomError("Language not found", 404))
        }

        scholarship.title = title || scholarship.title;
        scholarship.description = description || scholarship.description;
        scholarship.fieldOfStudyId = fieldOfStudyId || scholarship.fieldOfStudyId;
        scholarship.courseTypeId = courseTypeId || scholarship.courseTypeId;
        scholarship.duration = duration || scholarship.duration;
        scholarship.modeOfStudyId = modeOfStudyId || scholarship.modeOfStudyId;
        scholarship.country = country || scholarship.country;
        scholarship.isWinter = isWinter !== undefined ? isWinter : scholarship.isWinter;
        scholarship.isFree = isFree !== undefined ? isFree : scholarship.isFree;
        scholarship.isFullTime = isFullTime !== undefined ? isFullTime : scholarship.isFullTime;
        scholarship.gpa = gpa || scholarship.gpa;
        scholarship.universityId = universityId || scholarship.universityId;
        scholarship.languageId = languageId || scholarship.languageId;

        await scholarship.save();
        res.status(200).send({ message: 'Scholarship updated successfully', scholarship });
    } catch (error) {
        next(new CustomError("Internal server error.", 500));
    }
};



exports.deleteScholarship = async (req, res) => {
    const { id } = req.params; 

    try {
        const scholarship = await Scholarship.findById(id);

        if (!scholarship) {
            return next(new CustomError("Scholarship not found", 404))
        }

        await scholarship.remove(); 
        res.status(200).json({ message: 'Scholarship deleted successfully' });
    } catch (error) {
        next(new CustomError("Internal server error.", 500));
    }
};


exports.getScholarshipById = async (req, res) => {
    const { id } = req.params; 

    try {
        const scholarship = await Scholarship.findById(id)
            .populate('fieldOfStudyId', 'name') 
            .populate('courseTypeId', 'name')   
            .populate('universityId', 'name')   
            .populate('languageId', 'name');    

        if (!scholarship) {
            return next(new CustomError("Scholarship not found", 404))
        }

        res.status(200).json({ scholarship });
    } catch (error) {
        next(new CustomError("Internal server error.", 500));
    }
};

