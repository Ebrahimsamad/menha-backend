const Language = require("../models/langauge");
const CustomError = require("../utils/customError"); 

const createLanguage = async (req, res, next) => {
    try {
        const { name, course } = req.body;

       
        const existingLanguage = await Language.findOne({ name });
        if (existingLanguage) {
            return next(new CustomError("Language already exists.", 409));
        }

        const newLanguage = new Language({ name, course });
        await newLanguage.save();
        res.status(201).json({ message: "Language created successfully", newLanguage });
    } catch (error) {
        next(new CustomError("Internal server error.", 500));
    }
};

const getAllLanguages = async (req, res, next) => {
    try {
        const languages = await Language.find({});
        res.status(200).json(languages);
    } catch (error) {
        next(new CustomError("Error fetching languages.", 500));
    }
};

const deleteLanguageById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedLanguage = await Language.findByIdAndDelete(id);

        if (!deletedLanguage) {
            return next(new CustomError("Language not found.", 404));
        }

        res.status(200).json({ message: "Language deleted successfully", deletedLanguage });
    } catch (error) {
        next(new CustomError("Internal server error.", 500));
    }
};

module.exports = {
    createLanguage,
    getAllLanguages,
    deleteLanguageById
};
