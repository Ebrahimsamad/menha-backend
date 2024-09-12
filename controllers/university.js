const University = require ("../models/university.js");
const CustomError = require("../utils/customError.js");

const getAllUniversity = async (req, res) =>{
    try {
        const universities = await University.find();
        res.status(200).send(universities);
    } catch (error) {
        next(new CustomError('Error fetching universities', 500 ));
    }
};

const getUniversityById = async (req , res)=>{
    const id =req.params;
    try {
        const university = University.findById(id);
        res.status(200).send(university);
    } catch (error) {
        next(new CustomError('University not found' , 404));
    }
};

const createUniversity = async (req , res)=>{
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



const editUniversity = async (req , res) => {
    try {
        const universityId = req.params.id;
        const {name , address , image , faculityName , email , phone , pageUrl } = req.body;

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
        );

        res.status(200).send({
            message: 'University updated successfully!',
            data: updatedUniversity
        });
    } catch (error) {
      next(new CustomError('Error updating university' , 500));
};

  };

  
  const deleteUniversity = async (req , res)=>{
    const id = req.params;
    try {
        const university = await University.findById(id);
        await scholarship.deleteMany({universityId: id});
        await University.findByIdAndDelete(id);

        res.status(200).send(
             'University and associated scholarships deleted successfully'
            
        );
    } catch (error) {
        next(new CustomError('Error deleting university' , 500))
    }
  };

module.exports = { 
    createUniversity,
    editUniversity,
    getAllUniversity,
    getUniversityById,
    deleteUniversity
      

};



