const db = require("../models");
let createSpeialty = async (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (
            !data.name ||
            !data.imageBase64 ||
            !data.descriptionHTML ||
            !data.descriptionMarkdown
         ) {
            resolve({
               errCode: -1,
               errMessage: "Missing required fields",
            });
         } else {
            await db.Specialty.create({
               name: data.name,
               image: data.imageBase64,
               descriptionHTML: data.descriptionHTML,
               descriptionMarkdown: data.descriptionMarkdown,
            });
            resolve({
               errCode: 0,
               message: "Create new specialty successfully",
            });
         }
      } catch (e) {
         reject(e);
      }
   });
};
let getAllSpecialty = () => {
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.Specialty.findAll({});
         if (data && data.length > 0) {
            data.map((item) => {
               item.image = new Buffer(item.image, "base64").toString("binary");
               return item;
            });
         }
         resolve({
            errMessage: "Get all specialty successfully",
            errCode: 0,
            data: data,
         });
      } catch (e) {
         reject(e);
      }
   });
};
let getDetailSpecialtyById = (inputId, location) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!inputId || !location) {
            resolve({
               errCode: -1,
               errMessage: "Missing required fields",
            });
         } else {
            let data = await db.Specialty.findOne({
               where: { id: inputId },
               attributes: ["descriptionHTML", "descriptionMarkdown"],
            });

            if (data) {
               let doctorSpecialty = [];
               if (location === "ALL") {
                  doctorSpecialty = await db.Doctor_Infor.findAll({
                     where: { specialtyId: inputId },
                     attributes: ["doctorId", "provinceId"],
                  });
               } else {
                  doctorSpecialty = await db.Doctor_Infor.findAll({
                     where: { specialtyId: inputId, provinceId: location },
                     attributes: ["doctorId", "provinceId"],
                  });
               }
               data.doctorSpecialty = doctorSpecialty;
            } else data = {};

            resolve({
               errCode: 0,
               errMessage: "Get detail specialty successfully",
               data: data,
            });
         }
      } catch (e) {
         reject(e);
      }
   });
};
module.exports = {
   createSpeialty: createSpeialty,
   getAllSpecialty: getAllSpecialty,
   getDetailSpecialtyById: getDetailSpecialtyById,
};
