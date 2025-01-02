import specialtyService from "../services/specialtyService.js";
let createSpeialty = async (req, res) => {
   try {
      let infor = await specialtyService.createSpeialty(req.body);
      return res.status(200).json(infor);
   } catch (e) {
      console.log(e);
      return res.status(200).json({
         errCode: -1,
         errMessage: "Error from server",
      });
   }
};
let getAllSpecialty = async (req, res) => {
   try {
      let infor = await specialtyService.getAllSpecialty();
      return res.status(200).json(infor);
   } catch (e) {
      console.log(e);
      return res.status(200).json({
         errCode: -1,
         errMessage: "Error from server",
      });
   }
};
let getDetailSpecialtyById = async (req, res) => {
   try {
      let infor = await specialtyService.getDetailSpecialtyById(
         req.query.id,
         req.query.location
      );
      return res.status(200).json(infor);
   } catch (e) {
      console.log(e);
      return res.status(200).json({
         errCode: -1,
         errMessage: "Error from server",
      });
   }
};
module.exports = {
   createSpeialty: createSpeialty,
   getAllSpecialty: getAllSpecialty,
   getDetailSpecialtyById: getDetailSpecialtyById,
};
