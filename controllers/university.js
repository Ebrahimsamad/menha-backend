const University = require ("../models/university.js");
const CustomError = require("../utils/customError.js");

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

  }

module.exports = { createUniversity };
module.exports = {editUniversity};


