const University = require ("../models/university.js");
const CustomError = require("../utils/customError.js");
const Scholarship = require("../models/scholarship.js");


const getAllUniversity = async (req, res , next) =>{
    try {
        const universities = await University.find();
        res.status(200).send(universities);
    } catch (error) {
        next(new CustomError('Error fetching universities', 500 ));
    }
};

const getUniversityById = async (req , res , next)=>{
    const id =req.params.id;
    try {
        const university = await University.findById(id);
        res.status(200).send(university);
    } catch (error) {
        next(new CustomError('Error fetching university' , 500));
    }
};

const createUniversity = async (req , res , next)=>{
    try {
        const {name , address , image , faculityName , email , phone , pageUrl } = req.body;

        const university = new University({
            name,
            address,
            image,
            faculityName,
            email,
            phone,
            pageUrl
        });

        const savedUniversity = await university.save();

        res.status(201).send({
            message: 'University created successfully',
            data: savedUniversity
        });
    } catch (error) {
        next(new CustomError('Error creating university' , 500))
        };
    };



    const editUniversity = async (req, res, next) => {
        try {
            console.log('Request Body:', JSON.stringify(req.body, null, 2));
            const universityId = req.params.id;
    
            const { name, address, image, faculityName, email, phone, pageUrl } = req.body;
            const updatedUniversity = await University.findByIdAndUpdate(
                universityId,
                {
                    name,
                    address,
                    image,
                    faculityName,
                    email,
                    phone,
                    pageUrl
                },
                { new: true } // This option returns the updated document
            );
            
            res.status(200).send({
                message: 'University updated successfully!',
                data: updatedUniversity
            });
        } catch (error) {
            next(new CustomError('Error updating university', 500));
        }
    };
    

  
    const deleteUniversity = async (req, res, next) => {
        const universityId = req.params.id;
    
        try {
            // Find the university to be deleted
            const university = await University.findById(universityId);
    
            if (!university) {
                return res.status(404).send('University not found');
            }
    
            // Check for associated scholarships
            const associatedScholarships = await Scholarship.find({ universityId });
    
            // If there are associated scholarships, delete them
            if (associatedScholarships.length > 0) {
                await Scholarship.deleteMany({ universityId });
            }
    
            // Delete the university
            await University.findByIdAndDelete(universityId);
    
            // Send success response
            res.status(200).send({
                message: associatedScholarships.length > 0
                    ? 'University and associated scholarships deleted successfully'
                    : 'University deleted successfully, no associated scholarships found',
                data: university
            });
        } catch (error) {
            
            next(new CustomError('Error deleting university', 500));
        }
    };
    

module.exports = { 
    createUniversity,
    editUniversity,
    getAllUniversity,
    getUniversityById,
    deleteUniversity
      

};



