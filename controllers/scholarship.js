const Scholarship = require("../models/scholarship");
const FieldOfStudy = require("../models/fieldOfStudy");
const CourseType = require("../models/courseType");
const University = require("../models/university");
const Language = require("../models/langauge");
const CustomError = require("../utils/customError");
const portfolioMatchingWithScholarships = require("../utils/portfolioMatchingWithScholarships");
const MatchingPercentage = require("../models/portfolioMatchingWithScholarships");
const transporter = require("../utils/nodemialer");

const sendEmail = async (userEmail, scholarship, scholarshipPercentage) => {
  templet1 = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .email-container {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .header {
          text-align: center;
          padding: 20px;
          background-color: #002b4c;
          border-radius: 10px 10px 0 0;
          color: #ffffff;
        }
        .header img {
          max-width: 150px;
          margin-bottom: 10px;
        }
        .header h1 {
          font-size: 24px;
          margin: 0;
        }
        .content {
          padding: 20px;
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 0 0 10px 10px;
        }
        .content p {
          color: #8a690f;
        }
        .content strong {
          color: #002b4c;
        }
        .content input {
          width: 75%;
          text-align: center;
          padding: 10px;
          border: 1px solid #002b4c;
          border-radius: 5px;
          margin-bottom: 20px;
          background-color: #f4f4f4;
          color: #333;
          font-size: 16px;
          cursor: not-allowed;
        }
        .content a {
          width: 50%;
          display: block;
          background-color: #b92a3b;
          color: #ffffff;
          text-decoration: none;
          padding: 10px 15px;
          border-radius: 15px;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
          margin-top: 15px;
          margin-bottom: 20px;
        }
        .content a:hover {
          background-color: #003366;
        }
        .content .match-info {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          font-size: 16px;
        }
        .content .match-info span {
          margin-right: 5px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <img
            src="https://ik.imagekit.io/2crfufcjy/static/logo.png?updatedAt=1726792325081"
            alt="Logo"
          />
          <h1>New Scholarship Recommendation!</h1>
        </div>
        <div class="content">
          <h3>We found a scholarship that matches your portfolio:</h3>
          <p>${scholarship.title}</p>
  
          <div class="match-info">
            <span>with a match percentage of</span>
            <strong style="font-size: xx-large;">${scholarshipPercentage}%</strong>
          </div>
  
          <a
            href="https://menha.vercel.app/scolarshipdetails/${scholarship._Id}/overview"
            >View Scholarship Details</a
          >
        </div>
      </div>
    </body>
  </html>
  
        `;
  templet2 = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .email-container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
              }
              .header {
                text-align: center;
                padding: 20px;
                background-color: #002b4c;
                border-radius: 10px 10px 0 0;
                color: #ffffff;
              }
              .header img {
                max-width: 150px;
                margin-bottom: 10px;
              }
              .header h1 {
                font-size: 24px;
                margin: 0;
              }
              .content {
                padding: 20px;
                background-color: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 0 0 10px 10px;
              }
              .content p {
                color: #8a690f;
              }
              .content strong {
                color: #002b4c;
              }
              .content input {
                width: 75%;
                text-align: center;
                padding: 10px;
                border: 1px solid #002b4c;
                border-radius: 5px;
                margin-bottom: 20px;
                background-color: #f4f4f4;
                color: #333;
                font-size: 16px;
                cursor: not-allowed;
              }
              .content a {
                width: 50%;
                display: block;
                background-color: #b92a3b;
                color: #ffffff;
                text-decoration: none;
                padding: 10px 15px;
                border-radius: 15px;
                font-size: 16px;
                text-align: center;
                cursor: pointer;
                margin-top: 15px;
                margin-bottom: 20px;
              }
              .content a:hover {
                background-color: #003366;
              }
              .content .match-info {
                display: flex;
                align-items: center;
                margin-bottom: 30px;
                font-size: 16px;
              }
              .content .match-info span {
                margin-right: 5px;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <img
                  src="https://ik.imagekit.io/2crfufcjy/static/logo.png?updatedAt=1726792325081"
                  alt="Logo"
                />
                <h1>New Scholarship Notification</h1>
              </div>
              <div class="content">
                <h3>Unfortunately, this scholarship doesn't closely match your portfolio:</h3>
                <p>${scholarship.title}</p>
        
                <div class="match-info">
                  <span>It has a match percentage of</span>
                  <strong style="font-size: xx-large;">${scholarshipPercentage}%</strong>
                </div>
        
                <a
                  href="https://menha.vercel.app/scolarshipdetails/${scholarship._Id}/overview"
                  >View Scholarship Details</a
                >
              </div>
            </div>
          </body>
        </html>
        
              `;
  let mailOptions;
  if (scholarshipPercentage > 50) {
    mailOptions = {
      from: `Men7a <${process.env.NODEMAILER_EMAIL}>`,
      to: userEmail,
      subject: "Matching percentage with scholarship",
      html: templet1,
    };
  } else {
    mailOptions = {
      from: `Men7a <${process.env.NODEMAILER_EMAIL}>`,
      to: userEmail,
      subject: "Matching percentage with scholarship",
      html: templet2,
    };
  }

  await transporter.sendMail(mailOptions);
};
const addMatchingPercentage = async (
  portfolioId,
  userId,
  scholarshipId,
  percentage
) => {
  try {
    const matchingData = await MatchingPercentage.findOneAndUpdate(
      { portfolioId, userId },
      {
        $push: {
          matchingPercentage: {
            scholarshipId,
            percentage,
          },
        },
      },
      { new: true }
    );

    return matchingData;
  } catch (error) {
    console.error("Error adding matching percentage:", error);
    throw error;
  }
};

exports.createScholarship = async (req, res, next) => {
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
    languageId,
  } = req.body;

  try {
    const [fieldOfStudy, courseType, university, language] = await Promise.all([
      FieldOfStudy.findById(fieldOfStudyId),
      CourseType.findById(courseTypeId),
      University.findById(universityId),
      Language.findById(languageId),
    ]);

    if (!fieldOfStudy)
      return next(new CustomError("Field of study not found.", 404));
    if (!courseType)
      return next(new CustomError("Course type not found.", 404));
    if (!university) return next(new CustomError("University not found.", 404));
    if (!language) return next(new CustomError("Language not found.", 404));

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
      languageId,
    });
    await scholarship.save();

    const portfolioPercentage = await MatchingPercentage.find()
      .populate("portfolioId")
      .populate("userId");

    if (!portfolioPercentage.length) {
      return res.status(201).send({
        message:
          "Scholarship created successfully. No portfolio matching found.",
        scholarship,
      });
    }

    const matchingPromises = portfolioPercentage.map(async (portfolio) => {
      const scholarshipPercentage = portfolioMatchingWithScholarships(
        portfolio.portfolioId,
        scholarship
      );

      await addMatchingPercentage(
        portfolio.portfolioId._id,
        portfolio.userId._id,
        scholarship._id,
        scholarshipPercentage
      );
      if (portfolio.userId.selectedPlan != "1 month") {
        await sendEmail(
          portfolio.userId.email,
          scholarship,
          scholarshipPercentage
        );
      }
    });

    await Promise.all(matchingPromises);

    res
      .status(201)
      .send({ message: "Scholarship created successfully", scholarship });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.editScholarship = async (req, res, next) => {
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
    languageId,
  } = req.body;

  try {
    const scholarship = await Scholarship.findById(id);
    if (!scholarship)
      return next(new CustomError("Scholarship not found", 404));

    if (fieldOfStudyId) {
      const fieldOfStudy = await FieldOfStudy.findById(fieldOfStudyId);
      if (!fieldOfStudy)
        return next(new CustomError("Field of study not found", 404));
    }

    if (courseTypeId) {
      const courseType = await CourseType.findById(courseTypeId);
      if (!courseType)
        return next(new CustomError("Course type not found", 404));
    }

    if (universityId) {
      const university = await University.findById(universityId);
      if (!university)
        return next(new CustomError("University not found", 404));
    }

    if (languageId) {
      const language = await Language.findById(languageId);
      if (!language) return next(new CustomError("Language not found", 404));
    }

    scholarship.title = title || scholarship.title;
    scholarship.description = description || scholarship.description;
    scholarship.fieldOfStudyId = fieldOfStudyId || scholarship.fieldOfStudyId;
    scholarship.courseTypeId = courseTypeId || scholarship.courseTypeId;
    scholarship.duration = duration || scholarship.duration;
    scholarship.modeOfStudyId = modeOfStudyId || scholarship.modeOfStudyId;
    scholarship.country = country || scholarship.country;
    scholarship.isWinter =
      isWinter !== undefined ? isWinter : scholarship.isWinter;
    scholarship.isFree = isFree !== undefined ? isFree : scholarship.isFree;
    scholarship.isFullTime =
      isFullTime !== undefined ? isFullTime : scholarship.isFullTime;
    scholarship.gpa = gpa || scholarship.gpa;
    scholarship.universityId = universityId || scholarship.universityId;
    scholarship.languageId = languageId || scholarship.languageId;

    await scholarship.save();

    const portfolioPercentage = await MatchingPercentage.find()
      .populate("portfolioId")
      .populate("userId");

    if (!portfolioPercentage.length) {
      return res.status(200).send({
        message:
          "Scholarship updated successfully. No portfolio matching found.",
        scholarship,
      });
    }

    const matchingPromises = portfolioPercentage.map(async (portfolio) => {
      const scholarshipPercentage = portfolioMatchingWithScholarships(
        portfolio.portfolioId,
        scholarship
      );

      await MatchingPercentage.findOneAndUpdate(
        {
          portfolioId: portfolio.portfolioId._id,
          userId: portfolio.userId._id,
        },
        {
          $set: {
            "matchingPercentage.$[elem].percentage": scholarshipPercentage,
          },
        },
        { arrayFilters: [{ "elem.scholarshipId": scholarship._id }], new: true }
      );

      if (portfolio.userId.selectedPlan !== "1 month") {
        await sendEmail(
          portfolio.userId.email,
          scholarship,
          scholarshipPercentage
        );
      }
    });

    await Promise.all(matchingPromises);

    res.status(200).send({
      message:
        "Scholarship updated successfully with matching percentages updated.",
      scholarship,
    });
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};

exports.deleteScholarship = async (req, res, next) => {
  const { id } = req.params;

  try {
    const scholarship = await Scholarship.findByIdAndDelete(id);

    if (!scholarship) {
      return next(new CustomError("Scholarship not found", 404));
    }

    await MatchingPercentage.updateMany(
      { "matchingPercentage.scholarshipId": scholarship._id },
      { $pull: { matchingPercentage: { scholarshipId: scholarship._id } } }
    );

    res
      .status(200)
      .json({
        message: "Scholarship and associated percentages deleted successfully",
      });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.getScholarshipById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const scholarship = await Scholarship.findById(id)
      .populate("fieldOfStudyId")
      .populate("courseTypeId")
      .populate("universityId")
      .populate("languageId")
      .populate("modeOfStudyId");
    if (!scholarship) {
      return next(new CustomError("Scholarship not found", 404));
    }

    res.status(200).json({ scholarship });
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};

exports.getAllScholarships = async (req, res, next) => {
  try {
    const {
      page = 1,
      size = 10,
      fieldOfStudyId,
      courseTypeId,
      modeOfStudyId,
      isWinter,
      isFree,
      isFullTime,
      universityId,
      languageId,
    } = req.query;

    const filter = {};

    if (fieldOfStudyId) filter.fieldOfStudyId = fieldOfStudyId;
    if (courseTypeId) filter.courseTypeId = courseTypeId;
    if (modeOfStudyId) filter.modeOfStudyId = modeOfStudyId;
    if (isWinter !== undefined) filter.isWinter = isWinter === "true";
    if (isFree !== undefined) filter.isFree = isFree === "true";
    if (isFullTime !== undefined) filter.isFullTime = isFullTime === "true";
    if (universityId) filter.universityId = universityId;
    if (languageId) filter.languageId = languageId;

    const limit = parseInt(size);
    const currentPage = parseInt(page);
    const skip = (currentPage - 1) * limit;

    const scholarships = await Scholarship.find(filter)
      .populate("fieldOfStudyId")
      .populate("courseTypeId")
      .populate("modeOfStudyId")
      .populate("universityId")
      .populate("languageId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Scholarship.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      scholarships,
      pagination: {
        totalItems: total,
        totalPages: totalPages,
        currentPage: currentPage,
        pageSize: limit,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    });
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};
exports.getAllScholarshipsWithPercentage = async (req, res, next) => {
  try {
    const {
      page = 1,
      size = 10,
      fieldOfStudyId,
      courseTypeId,
      modeOfStudyId,
      isWinter,
      isFree,
      isFullTime,
      universityId,
      languageId,
    } = req.query;

    const filter = {};

    if (fieldOfStudyId) filter.fieldOfStudyId = fieldOfStudyId;
    if (courseTypeId) filter.courseTypeId = courseTypeId;
    if (modeOfStudyId) filter.modeOfStudyId = modeOfStudyId;
    if (isWinter !== undefined) filter.isWinter = isWinter === "true";
    if (isFree !== undefined) filter.isFree = isFree === "true";
    if (isFullTime !== undefined) filter.isFullTime = isFullTime === "true";
    if (universityId) filter.universityId = universityId;
    if (languageId) filter.languageId = languageId;

    const limit = parseInt(size);
    const currentPage = parseInt(page);
    const skip = (currentPage - 1) * limit;

    const scholarships = await Scholarship.find(filter)
      .populate("fieldOfStudyId")
      .populate("courseTypeId")
      .populate("modeOfStudyId")
      .populate("universityId")
      .populate("languageId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Scholarship.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    const user = req.user;
    const currentDate = new Date();
    const userBuydate = new Date(user.expBuyPortfolio);
    const matchingPercentageUser = await MatchingPercentage.findOne({
      userId: user.id,
    });
    if (userBuydate < currentDate || !matchingPercentageUser) {
      return res.status(200).json({
        scholarships,
        pagination: {
          totalItems: total,
          totalPages: totalPages,
          currentPage: currentPage,
          pageSize: limit,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
        },
      });
    } else {
      const scholarshipsWithPercentage = scholarships.map((scholarship) => {
        const percentage = matchingPercentageUser.matchingPercentage.find(
          (match) =>
            match.scholarshipId.toString() === scholarship._id.toString()
        ).percentage;

        return {
          percentage,
          ...scholarship.toObject()
        };
      });
      res.status(200).json({
        scholarships: scholarshipsWithPercentage,
        pagination: {
          totalItems: total,
          totalPages: totalPages,
          currentPage: currentPage,
          pageSize: limit,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
        },
      });
    }
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};
