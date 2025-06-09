// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Déterminer le chemin absolu vers le dossier uploads
// const uploadDir = path.resolve("/server/uploads");

// // S'assurer que le dossier existe
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, {recursive: true});
// }

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename(req, file, cb) {
//     cb(null, `avatar-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     return cb(new Error("Seules les images JPG, JPEG et PNG sont autorisées"));
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter(req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// // Export correct de l'instance multer
// export default upload;
