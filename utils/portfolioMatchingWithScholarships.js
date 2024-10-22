const portfolioMatchingWithScholarships = (portfolio, scholarship) => {
    let percentage = 0;
    let totalWeight = 100; // Total weight of all criteria is 100%

    // Define the weights for each criterion based on its importance
    const weights = {
        fieldOfStudy: 30,  // Field of study has a weight of 30%
        courseType: 15,    // Course type has a weight of 15%
        modeOfStudy: 10,   // Mode of study has a weight of 10%
        isWinter: 5,       // Whether it's a winter semester has a weight of 5%
        isFree: 5,         // Whether the scholarship is free has a weight of 5%
        isFullTime: 10,    // Whether it's full-time has a weight of 10%
        gpa: 15,           // GPA has a weight of 15%
        language: 10       // Language of the program has a weight of 10%
    };

    // Return 0% if either the portfolio or scholarship is missing
    if (!portfolio || !scholarship) {
        return percentage;
    }

    // Calculate the matching percentage based on the defined weights
    if (portfolio.fieldOfStudyId.toString() === scholarship.fieldOfStudyId.toString()) {
        percentage += weights.fieldOfStudy;
    }

    if (portfolio.courseTypeId.toString() === scholarship.courseTypeId.toString()) {
        percentage += weights.courseType;
    }

    if (portfolio.modeOfStudyId.toString() === scholarship.modeOfStudyId.toString()) {
        percentage += weights.modeOfStudy;
    }

    if (portfolio.isWinter === scholarship.isWinter) {
        percentage += weights.isWinter;
    }

    if (portfolio.isFree === scholarship.isFree) {
        percentage += weights.isFree;
    }

    if (portfolio.isFullTime === scholarship.isFullTime) {
        percentage += weights.isFullTime;
    }

    if (portfolio.gpa >= scholarship.gpa) {
        percentage += weights.gpa;
    }

    if (portfolio.languageId.toString() === scholarship.languageId.toString()) {
        percentage += weights.language;
    }

    return percentage;
};

module.exports = portfolioMatchingWithScholarships;
