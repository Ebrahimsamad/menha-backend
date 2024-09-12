const University = require ("../models/university.js");

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

        res.status(201).json({
            message: 'University created successfully',
            data: savedUniversity
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating university',
            error: error.message
        });
    }

};

const editUniversity = async (eq , res) => {
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

        res.status(200).json({
            message: 'University updated successfully!',
            data: updatedUniversity
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating university',
            error: error.message
        }); 
    }
}

module.exports = { createUniversity };
module.exports = {editUniversity};


