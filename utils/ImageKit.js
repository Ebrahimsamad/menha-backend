var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: "https://ik.imagekit.io/2crfufcjy",
});
module.exports = imagekit  