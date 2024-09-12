const Scholarship = require('../models/scholarship');
const FieldOfStudy = require('../models/fieldOfStudy');
const CourseType = require('../models/courseType');
const University = require('../models/university');
const Language = require('../models/language');

exports.createScholarship = async (req, res) => {
   

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

        if (!fieldOfStudy) return res.status(404).json({ message: 'Field of study not found' });
        if (!courseType) return res.status(404).json({ message: 'Course type not found' });
        if (!university) return res.status(404).json({ message: 'University not found' });
        if (!language) return res.status(404).json({ message: 'Language not found' });

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
        res.status(500).send({ message: 'Server error', error });
    }
};
exports.editScholarship = async (req, res) => {
   

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
        if (!scholarship) return res.status(404).json({ message: 'Scholarship not found' });

        if (fieldOfStudyId) {
            const fieldOfStudy = await FieldOfStudy.findById(fieldOfStudyId);
            if (!fieldOfStudy) return res.status(404).json({ message: 'Field of study not found' });
        }

        if (courseTypeId) {
            const courseType = await CourseType.findById(courseTypeId);
            if (!courseType) return res.status(404).json({ message: 'Course type not found' });
        }

        if (universityId) {
            const university = await University.findById(universityId);
            if (!university) return res.status(404).json({ message: 'University not found' });
        }

        if (languageId) {
            const language = await Language.findById(languageId);
            if (!language) return res.status(404).json({ message: 'Language not found' });
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
        res.status(500).send({ message: 'Server error', error });
    }
};

