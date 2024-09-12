const Language = require("../models/langauge");

const checkLanguageExists = async (req, res, next) => {
    const { name } = req.body;
    try {
        const existingLanguage = await Language.findOne({ name });
        if (existingLanguage) {
            return res.status(400).json({ message: "Language already exists" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}; 

module.exports = checkLanguageExists;
