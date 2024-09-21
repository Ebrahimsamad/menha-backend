const User = require("../models/user");
const Scholarship = require("../models/scholarship");
const CustomError = require("../utils/customError");

exports.toggleSavedScholarship = async (req, res,next) => {
    try {
      const { id } = req.user; 
      const { scholarshipId } = req.body;
  
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const scholarship = await Scholarship.findById(scholarshipId);
      if(!scholarship){
        return res.status(404).json({ message: "scholarship not found" });
      }
  
      const isSaved = user.savedScholarshipIds.includes(scholarshipId);
  
      if (isSaved) {
        user.savedScholarshipIds = user.savedScholarshipIds.filter(id => id.toString() !== scholarshipId);
        await user.save();
        return res.status(200).json({ message: "Scholarship removed from saved list", savedScholarshipIds: user.savedScholarshipIds });
      } else {
        user.savedScholarshipIds.push(scholarshipId);
        await user.save();
        return res.status(200).json({ message: "Scholarship added to saved list", savedScholarshipIds: user.savedScholarshipIds });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  exports.getSavedScholarships = async (req, res) => {
    try {
      const { id } = req.user; 
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10; 
      const skip = (page - 1) * limit;
  
      const user = await User.findById(id)
        .populate({
          path: "savedScholarshipIds",
          options: {
            limit,
            skip,
          },
          populate: [
            { path: "fieldOfStudyId" },
            { path: "courseTypeId" },
            { path: "modeOfStudyId" },
            { path: "universityId" },
            { path: "languageId" }
          ]
        });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const total = await User.findById(id).select("savedScholarshipIds").lean();
      const totalScholarships = total.savedScholarshipIds.length;
  
      const totalPages = Math.ceil(totalScholarships / limit);
  
      const validScholarships = user.savedScholarshipIds;
  
      res.status(200).json({
        pagination: {
          totalItems: totalScholarships,
          totalPages,
          currentPage: page,
          pageSize: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
        scholarships: validScholarships,
      });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  
  