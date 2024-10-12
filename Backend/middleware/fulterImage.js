const multer = require("multer");
const path = require("path");
const multerImage = multer({
  storage: multer.diskStorage({
    destination: "uploads",
    filename: function (req, file, cb) {
      //* console.log(path.extname(file.originalname));
      cb(
        null,
        file.fieldname +
          "-" +
          `${file.originalname.split(".")[0]}` +
          "-" +
          Date.now() +
          `${path.extname(file.originalname)}`
      );
    },
  }),
}).single("image"); //? input field name as schema field


module.exports = multerImage;
