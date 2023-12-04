const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

// console.log("cloudinary", cloudinary);
console.log("cloud_name", process.env.CLOUD_NAME);
console.log("api_key", process.env.API_KEY);
console.log("api_secret", process.env.SECRET_KEY);

// const cloudinaryUploadImg = async (fileToUploads) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(fileToUploads, (result) => {
//       resolve(
//         {
//           url: result.secure_url,
//           asset_id: result.asset_id,
//           public_id: result.public_id,
//         },
//         {
//           resource_type: "auto",
//         }
//       );
//     });
//   });
// };
// const cloudinaryDeleteImg = async (fileToDelete) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.destroy(fileToDelete, (result) => {
//       resolve(
//         {
//           url: result.secure_url,
//           asset_id: result.asset_id,
//           public_id: result.public_id,
//         },
//         {
//           resource_type: "auto",
//         }
//       );
//     });
//   });
// };

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(fileToUploads, (result, error) => {
      console.log("error", error);
      console.log("result", result);

      if (error) {
        reject(error);
      } else {
        resolve({
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
          resource_type: "auto",
        });
      }
    });
  });
};

const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(fileToDelete, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
          resource_type: "auto",
        });
      }
    });
  });
};

// const cloudinaryUploadImg = async (fileToUploads, folder) => {
//   return new Promise((resolve, reject) => {
//     console.log("run");

//     console.log("fileToUploads", fileToUploads);
//     console.log("folder", folder);

//     cloudinary.uploader.upload(
//       fileToUploads,
//       {
//         folder: folder,
//         resource_type: "auto",
//       },
//       (error, result) => {
//         console.log("error", error);
//         console.log("result", result);
//         if (error) {
//           reject(error);
//         } else {
//           resolve({
//             url: result.secure_url,
//             asset_id: result.asset_id,
//             public_id: result.public_id,
//             resource_type: "auto",
//           });
//         }
//       }
//     );
//   });
// };

// const cloudinaryDeleteImg = async (fileToDelete, folder) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.destroy(
//       fileToDelete,
//       {
//         folder: folder,
//         resource_type: "auto",
//       },
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve({
//             url: result.secure_url,
//             asset_id: result.asset_id,
//             public_id: result.public_id,
//             resource_type: "auto",
//           });
//         }
//       }
//     );
//   });
// };

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
