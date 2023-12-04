const fs = require("fs");
const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const uploadImages = asyncHandler(async (req, res) => {
  try {
    console.log("top run");

    const uploader = (path) => cloudinaryUploadImg(path);
    const urls = [];
    const files = req.files;
    console.log("after cloudinary upload declare run");
    console.log(files);
    let i = 1;
    for (const file of files) {
      const { path } = file;
      console.log("proceed to upload", i);
      i++;

      const newpath = await uploader(path);
      console.log(newpath);
      if (fs.existsSync(path)) {
        urls.push(newpath);
        fs.unlinkSync(path);
      } else {
        console.error(`File not found: ${path}`);
      }

      // fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (error) {
    console.log("error catched", error);
    throw new Error(error);
  }
});
// const deleteImages = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deleted = cloudinaryDeleteImg(id, "images");
//     res.json({ message: "Deleted" });
//   } catch (error) {
//     throw new Error(error);
//   }
// });
const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await cloudinaryDeleteImg(id, "images");
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("Error in deleteImages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
