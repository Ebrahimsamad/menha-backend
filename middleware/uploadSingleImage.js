const imagekit = require("../utils/ImageKit");
const sharp = require("sharp");
const CustomError = require("../utils/customError");

const uploadImage = async (fileBuffer, fileName) => {
  const optimizedImageBuffer = await sharp(fileBuffer)
    .jpeg({ quality: 70 })
    .toBuffer();

  const uploadResponse = await imagekit.upload({
    file: optimizedImageBuffer,
    fileName: `${fileName}-${Date.now()}.jpeg`,
    folder: "menha",
  });

  return uploadResponse.url;
};

const singleImageUpload = async (req, res, next) => {
  
  if (!req.files || (!req.files["image"] && !req.files["militaryStatusImage"] && !req.files["IDImage"] && !req.files["graduationImage"])) {
    return next();
  }

  try {
    if (req.files["image"] && req.files["image"].length > 0) {
      const imageBuffer = req.files["image"][0].buffer;
      req.body.image = await uploadImage(imageBuffer, "image");
    }

    if (req.files["militaryStatusImage"] && req.files["militaryStatusImage"].length > 0) {
      const militaryStatusImageBuffer = req.files["militaryStatusImage"][0].buffer;
      req.body.militaryStatusImage = await uploadImage(militaryStatusImageBuffer, "militaryStatusImage");
    }

    if (req.files["IDImage"] && req.files["IDImage"].length > 0) {
      const IDImageBuffer = req.files["IDImage"][0].buffer;
      req.body.IDImage = await uploadImage(IDImageBuffer, "IDImage");
    }

    if (req.files["graduationImage"] && req.files["graduationImage"].length > 0) {
      const graduationImageBuffer = req.files["graduationImage"][0].buffer;
      req.body.graduationImage = await uploadImage(graduationImageBuffer, "graduationImage");
    }

    next();
  } catch (err) {
    console.log(err);
    return next(new CustomError("Image upload failed", 500));
  }
};

module.exports = singleImageUpload;
